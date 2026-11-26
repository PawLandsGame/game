// A new key prevents the previous migration experiment's stored legacy choice
// from silently selecting the old renderer on the plain address.
const SESSION_KEY = 'broth:world-presentation-choice-v2';

/** WebGPU is the default; the old world is available only by explicit choice. */
export function resolveWorldRenderer(search: string, storage: Pick<Storage, 'getItem' | 'setItem'>): 'webgpu' | 'legacy' {
  const requested = new URLSearchParams(search).get('worldRenderer');
  if (requested === 'webgpu' || requested === 'legacy') {
    try { storage.setItem(SESSION_KEY, requested); } catch { /* Session storage can be unavailable. */ }
    return requested;
  }
  try { return storage.getItem(SESSION_KEY) === 'legacy' ? 'legacy' : 'webgpu'; }
  catch { return 'webgpu'; }
}

/** The PawLands game uses the 2D renderer. WebGPU remains in the engine labs. */
export function isWebGpuWorldEnabled(): boolean {
  return false;
}
