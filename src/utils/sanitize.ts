export const sanitizeText = (value: string) =>
  value
    .replace(/[<>]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

export const normalizeText = (value: string) =>
  sanitizeText(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

export const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
