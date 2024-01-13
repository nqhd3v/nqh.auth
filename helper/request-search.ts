export const requestSearch = (url: string): URLSearchParams => {
  const { searchParams } = new URL(url);
  return searchParams;
};
