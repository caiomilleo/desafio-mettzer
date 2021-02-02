import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CardArticle } from '../../components/CardArticle/CardArticle';
import { getArticles } from '../../services/api';

function Articles() {
  const [articles, setArticles] = useState([]);

  const useStyles = makeStyles(() => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexFlow: 'row wrap',
    },
  }));

  const classes = useStyles();

  useEffect(() => {
    search();
  }, []);

  const search = async () => {
    try {
      const { data } = await getArticles(1);
      if (data && data.length > 0) {
        let articlesMap = data.map((item) =>
          transformToArticleData(item._source)
        );
        setArticles(articlesMap);
      }
    } catch (error) {}
  };

  const transformToArticleData = (data) => {
    return {
      id: data.id,
      authors: data.authors,
      type: 'Artigo',
      title: data.title,
      description: data.description,
      urls: data.urls,
    };
  };

  return (
    <div className={classes.root}>
      {articles &&
        articles.length > 0 &&
        articles.map((article, index) => (
          <CardArticle {...article} key={article.id + index} />
        ))}
    </div>
  );
}

export default Articles;
