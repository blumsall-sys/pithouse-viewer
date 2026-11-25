// Shared, same-origin handoff. Storage is optional (private browsing may deny it).
export const travelKey = 'pithouse-ladder-trip';
export const fishingKey = 'pithouse-fishing-trip';

export function readSession(storage, key) {
  try { return JSON.parse(storage.getItem(key) || 'null'); } catch { return null; }
}
export function saveSession(storage, key, value) {
  try { storage.setItem(key, JSON.stringify(value)); return true; } catch { return false; }
}
export function progress(value = {}) {
  return {
    inventory: Array.isArray(value.inventory) ? value.inventory.filter(item => item && typeof item.id === 'string') : [],
    elderMet: Boolean(value.elderMet), voice: Boolean(value.voice)
  };
}
export function fishingTrip(currentURL, value) {
  const returnURL = new URL('./', currentURL);
  // Preserve local/offline engine selection, but return inside rather than on the roof.
  if (new URL(currentURL).searchParams.has('localEngine')) returnURL.searchParams.set('localEngine', '');
  return { ...progress(value), returnURL: returnURL.href };
}
export function pithouseReturnURL(currentURL, trip) {
  const fallback = new URL('../mobile-playtest/experience/', currentURL);
  try {
    const saved = new URL(trip?.returnURL);
    if (saved.origin === fallback.origin && saved.pathname === fallback.pathname) return saved;
  } catch {}
  return fallback;
}
