import {narration} from '../../shared/experience.js';
import { fishingKey, travelKey, readSession, saveSession, progress, pithouseReturnURL } from '../../mobile-playtest/experience/journey.js';

export function returnToPithouse() {
  const trip = readSession(sessionStorage, fishingKey);
  saveSession(sessionStorage, travelKey, { ...progress(trip || {}), voice:narration.enabled, outside: false, fromFishing: true });
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  location.assign(pithouseReturnURL(location.href, trip));
}
