export const getIdFromURL = (url: string): string => {
  return url.match(/\/(\d+)\//)![1];
};

export const getPokemonImgSrc = (url: string | null): string => {
  if (url) {
    const id = getIdFromURL(url);
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }

  return '';
};
