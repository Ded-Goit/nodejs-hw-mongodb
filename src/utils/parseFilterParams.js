export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  let parsedType;
  if (typeof type === 'string' && type.trim() !== '') {
    parsedType = type.trim();
  }

  let parsedIsFavourite;
  if (typeof isFavourite === 'string') {
    if (isFavourite.toLowerCase() === 'true') parsedIsFavourite = true;
    if (isFavourite.toLowerCase() === 'false') parsedIsFavourite = false;
  }

  return {
    contactType: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
