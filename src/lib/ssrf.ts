import { lookup } from "dns/promises";
import net from "net";

/**
 * Defensa anti-SSRF para fetches de URLs proporcionadas por el usuario
 * (p.ej. la previsualización OG al publicar un enlace).
 *
 * Rechaza cualquier destino que no sea claramente público:
 *  - protocolos distintos de http/https
 *  - hostnames de loopback/localhost
 *  - IPs privadas, de loopback, link-local o reservadas (IPv4 e IPv6)
 * Resuelve el hostname por DNS y valida TODAS las IPs resueltas, de modo que
 * un dominio que apunte a una IP interna (o un ataque de DNS rebinding en el
 * primer salto) también queda bloqueado.
 */

function isPrivateIPv4(ip: string): boolean {
  const p = ip.split(".").map(Number);
  if (p.length !== 4 || p.some((n) => Number.isNaN(n) || n < 0 || n > 255)) return true; // malformada → bloquear
  const [a, b] = p;
  return (
    a === 0 ||                             // 0.0.0.0/8
    a === 10 ||                            // 10.0.0.0/8
    a === 127 ||                           // loopback
    (a === 169 && b === 254) ||            // link-local (incl. 169.254.169.254 metadata)
    (a === 172 && b >= 16 && b <= 31) ||   // 172.16.0.0/12
    (a === 192 && b === 168) ||            // 192.168.0.0/16
    (a === 100 && b >= 64 && b <= 127) ||  // CGNAT 100.64.0.0/10
    a >= 224                               // multicast/reservado 224.0.0.0/4 y superior
  );
}

function isPrivateIPv6(ip: string): boolean {
  const lower = ip.toLowerCase();
  if (lower === "::1" || lower === "::") return true;        // loopback / unspecified
  if (lower.startsWith("fe80")) return true;                 // link-local
  if (lower.startsWith("fc") || lower.startsWith("fd")) return true; // ULA fc00::/7
  // IPv4 mapeada (::ffff:a.b.c.d) → validar la parte IPv4
  const mapped = lower.match(/::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  if (mapped) return isPrivateIPv4(mapped[1]);
  return false;
}

function isBlockedIp(ip: string): boolean {
  const version = net.isIP(ip);
  if (version === 4) return isPrivateIPv4(ip);
  if (version === 6) return isPrivateIPv6(ip);
  return true; // no es una IP válida → bloquear
}

/**
 * Valida que `rawUrl` sea una URL http/https pública y segura de fetchear.
 * Lanza Error con motivo si no lo es; devuelve la URL normalizada si es válida.
 */
export async function assertPublicUrl(rawUrl: string): Promise<URL> {
  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    throw new Error("URL inválida");
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("Protocolo no permitido");
  }

  const host = url.hostname.replace(/^\[|\]$/g, ""); // quitar corchetes de IPv6 literal

  // Bloquear nombres obvios de loopback antes incluso de resolver DNS.
  if (host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local") || host.endsWith(".internal")) {
    throw new Error("Host no permitido");
  }

  // Si el host ya es una IP literal, validarla directamente.
  if (net.isIP(host)) {
    if (isBlockedIp(host)) throw new Error("IP no permitida");
    return url;
  }

  // Resolver DNS y exigir que TODAS las IPs sean públicas.
  let addresses: { address: string }[];
  try {
    addresses = await lookup(host, { all: true });
  } catch {
    throw new Error("No se pudo resolver el host");
  }
  if (addresses.length === 0) throw new Error("Host sin resolución DNS");
  for (const { address } of addresses) {
    if (isBlockedIp(address)) throw new Error("El host resuelve a una IP interna");
  }

  return url;
}

/**
 * fetch seguro contra SSRF: valida la URL inicial y CADA redirect antes de
 * seguirlo (un destino público puede redirigir a una IP interna). Devuelve la
 * respuesta final ya validada.
 */
export async function safeFetch(
  rawUrl: string,
  init: RequestInit & { timeoutMs?: number } = {},
  maxRedirects = 4
): Promise<Response> {
  const { timeoutMs = 5000, ...rest } = init;
  let current = rawUrl;

  for (let i = 0; i <= maxRedirects; i++) {
    await assertPublicUrl(current); // valida host/IP en cada salto

    const res = await fetch(current, {
      ...rest,
      redirect: "manual",
      signal: AbortSignal.timeout(timeoutMs),
    });

    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get("location");
      if (!location) return res;
      current = new URL(location, current).toString(); // resuelve relativos
      continue;
    }
    return res;
  }
  throw new Error("Demasiadas redirecciones");
}
