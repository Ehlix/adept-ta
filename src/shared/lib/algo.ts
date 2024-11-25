export const randomToken = (): string => {
  try {
    const data = globalThis.crypto.getRandomValues(new Uint8Array(9));
    return Array.from(data)
      .map((byte) => byte.toString(36).padStart(2, '0'))
      .join('')
      .slice(0, 12);
  } catch (_) {
    return Math.random().toString(36).slice(2, 12);
  }
};
