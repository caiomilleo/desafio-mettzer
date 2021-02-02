import { useEffect, useState } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import { CardArticle } from '../../components/CardArticle/CardArticle';
import { getArticles } from '../../services/api';

function Articles() {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexFlow: 'row wrap',
    },
  }));

  const classes = useStyles();

  useEffect(() => {
    search(page);
  }, []);

  const search = async (page) => {
    try {
      const { data } = await getArticles(page);
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

  const handlePagination = (page) => {
    setPage(page);
    search(page);
  };

  return (
    <div className={classes.root}>
      {articles &&
        articles.length > 0 &&
        articles.map((article, index) => (
          <CardArticle {...article} key={article.id + index} />
        ))}
      <div>
        <Pagination
          count={10}
          page={page}
          onChange={(event, val) => handlePagination(val)}
        />
      </div>
    </div>
  );
}

export default Articles;
