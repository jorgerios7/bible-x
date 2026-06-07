export const nowIso = () => new Date().toISOString();

export const getDaySeed = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();

  return Math.floor(diff / 86400000);
};
