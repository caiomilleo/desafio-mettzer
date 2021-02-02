export const getFavoriteArticles = () =>
  JSON.parse(localStorage.getItem('favoriteArticles'));

export const setFavoriteArticle = (article) => {
  return localStorage.setItem(
    'favoriteArticles',
    JSON.stringify(
      getFavoriteArticles() ? [...getFavoriteArticles(), article] : [article]
    )
  );
};

export const removeArticle = (article) => {
  return localStorage.setItem(
    'favoriteArticles',
    JSON.stringify(
      getFavoriteArticles().filter((item) => item.id !== article.id)
    )
  );
};
