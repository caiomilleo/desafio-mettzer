import { useEffect, useState } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import { CardArticle } from '../../components/CardArticle/CardArticle';
import { getArticles } from '../../services/api';
import { Grid, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';

function Articles() {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const useStyles = makeStyles(() => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexFlow: 'row wrap',
    },
  }));

  const classes = useStyles();

  useEffect(() => {
    search(page);
    // eslint-disable-next-line
  }, [page]);

  const search = async (page) => {
    try {
      setLoading(true);
      setError(false);
      const { data } = await getArticles(page);
      if (data && data.length > 0) {
        setLoading(false);
        let articlesMap = data.map((item) =>
          transformToArticleData(item._source)
        );
        setArticles(articlesMap);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
    }
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

  const errorApi = () => {
    return (
      <Typography>
        Ocorreu um erro,
        <Link href='#' onClick={() => search(page)}>
          tentar novamente
        </Link>
      </Typography>
    );
  };

  return (
    <div className={classes.root}>
      {loading && <CircularProgress />}
      {error && errorApi()}
      {articles &&
        articles.length > 0 &&
        !loading &&
        articles.map((article, index) => (
          <Grid container item direction='row' justify='center' xs={12} sm={3}>
            <CardArticle article={article} key={article.id + index} />
          </Grid>
        ))}
      {articles && articles.length > 0 && !loading && (
        <Grid container direction='row' justify='center' alignItems='center'>
          <Pagination
            count={10}
            page={page}
            onChange={(event, val) => handlePagination(val)}
          />
        </Grid>
      )}
    </div>
  );
}

export default Articles;
