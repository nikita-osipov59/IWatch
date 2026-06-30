export const normalizeUrl = (url?: string | null): string => {
  if (!url) return '';
  if (url.startsWith('//')) return `https:${url}`;
  return url;
};
