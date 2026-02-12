export const formatTitle = (slug: string) => {
  const decoded = decodeURIComponent(slug);
  return decoded.charAt(0).toUpperCase() + decoded.slice(1).toLowerCase();
};
