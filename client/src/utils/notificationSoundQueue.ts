export type NotificationSoundType = 'level_up' | 'achievement' | 'mission_complete';

const SFX_SOUND = '/sounds/progress_unlocked.mp3';
const SFX_DEBOUNCE_MS = 500;
let lastSfxPlayedAt = 0;
let currentAudio: HTMLAudioElement | null = null;

export function playNotificationSfxOnly(): void {
  const now = Date.now();
  if (now - lastSfxPlayedAt < SFX_DEBOUNCE_MS || isNotificationSoundPlaying()) return;
  lastSfxPlayedAt = now;

  const audio = new Audio(SFX_SOUND);
  audio.volume = 0.5;
  currentAudio = audio;
  const release = () => {
    if (currentAudio === audio) currentAudio = null;
  };

  audio.addEventListener('ended', release, { once: true });
  audio.addEventListener('error', release, { once: true });
  void audio.play().catch(release);
}

/** All progression events share the same nonverbal sound. */
export function queueNotificationSound(_type: NotificationSoundType): void {
  playNotificationSfxOnly();
}

export function isNotificationSoundPlaying(): boolean {
  return currentAudio !== null && !currentAudio.paused;
}

export function stopNotificationSound(): void {
  currentAudio?.pause();
  currentAudio = null;
}

export function clearNotificationSoundQueue(): void {
  stopNotificationSound();
}
