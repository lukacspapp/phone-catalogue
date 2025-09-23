export const parseStringFilter = (value?: string): string | undefined => {
  return value && value.trim() !== '' ? value : undefined;
};

export const parseNumberFilter = (value?: string): number | undefined => {
  if (!value || value.trim() === '') return undefined;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? undefined : parsed;
};

export const parseIntWithDefault = (value: string | undefined, defaultValue: number): number => {
  if (!value) return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
};

export const validatePageLimit = (limit: number, maxLimit: number): number => {
  return Math.min(Math.max(1, limit), maxLimit);
};
