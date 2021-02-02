import { useEffect, useState } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import { CardArticle } from '../../components/CardArticle/CardArticle';
import { getArticles } from '../../services/api';
import { Grid, TextField, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce';

function Articles() {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexFlow: 'row wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      width: '25ch',
    },
    loading: {
      marginTop: theme.spacing(5),
    },
  }));

  const classes = useStyles();

  const [searchValue, setSearchValue] = useState('');
  const debouncedSearch = useDebounce(searchValue, 1000);

  useEffect(() => {
    if (debouncedSearch) {
      search(page);
    }
    // eslint-disable-next-line
  }, [debouncedSearch, page]);

  const search = async (page) => {
    try {
      setLoading(true);
      setError(false);
      const { data } = await getArticles(debouncedSearch, page);
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
      <Grid container item direction='row' justify='center'>
        <TextField
          label='Buscar artigos...'
          defaultValue={searchValue}
          className={classes.textField}
          onChange={(e) => setSearchValue(e.target.value)}
          variant='outlined'
        />
      </Grid>
      {loading && <CircularProgress className={classes.loading} />}
      {error && errorApi()}

      {articles &&
        articles.length > 0 &&
        !loading &&
        articles.map((article, index) => (
          <Grid
            container
            item
            direction='row'
            justify='center'
            xs={12}
            sm={3}
            key={`${article.id}${index}`}
          >
            <CardArticle article={article} />
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
