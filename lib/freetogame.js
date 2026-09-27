const BASE_URL = process.env.FREETOGAME_API_BASE || "https://www.freetogame.com/api";

/**
 * Server-only helper for the FreeToGame API. No key required, but we still
 * keep this on the server (via app/api routes and server components) so
 * caching and error handling stay centralized.
 */
export async function freeToGameFetch(path, searchParams = {}) {
  const url = new URL(`${BASE_URL}${path}`);
  Object.entries(searchParams).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, v);
  });

  const res = await fetch(url.toString(), {
    // Free game listings change slowly — cache for an hour.
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`FreeToGame request failed: ${res.status} ${res.statusText}`);
  }

  return res.json();
}
