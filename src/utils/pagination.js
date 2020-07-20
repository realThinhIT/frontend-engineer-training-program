export const calculateOffset = (page, perPage) => {
  const pageNumber = page ? parseInt(page, 10) - 1 : 0;

  return parseInt(pageNumber * perPage, 10);
};
