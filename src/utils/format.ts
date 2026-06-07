export const formatReference = (book: string, chapter: number, verse?: number) =>
  verse ? `${book} ${chapter}:${verse}` : `${book} ${chapter}`;

export const formatPercent = (value: number) => `${Math.round(value)}%`;

export const shortNumber = (value: number) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }

  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`;
  }

  return String(value);
};
