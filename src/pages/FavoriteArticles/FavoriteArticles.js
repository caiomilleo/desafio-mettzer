import { useState } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import { CardArticle } from '../../components/CardArticle/CardArticle';
import { getFavoriteArticles } from '../../store/localStorage';
import { Grid } from '@material-ui/core';

function FavoriteArticles() {
  const [page, setPage] = useState(1);
  const [articlePerPage] = useState(8);

  const useStyles = makeStyles(() => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexFlow: 'row wrap',
    },
  }));

  const classes = useStyles();

  // Get current posts
  const indexOfLastFavorite = page * articlePerPage;
  const indexOfFirstFavorite = indexOfLastFavorite - articlePerPage;
  const currentPosts = getFavoriteArticles().slice(
    indexOfFirstFavorite,
    indexOfLastFavorite
  );

  const pageNumbers = [];

  for (
    let i = 1;
    i <= Math.ceil(getFavoriteArticles().length / articlePerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <div className={classes.root}>
      {getFavoriteArticles() &&
        getFavoriteArticles().length > 0 &&
        currentPosts.map((article, index) => (
          <CardArticle article={article} key={article.id + index} />
        ))}
      {getFavoriteArticles() && getFavoriteArticles().length > 0 && (
        <Grid container direction='row' justify='center' alignItems='center'>
          <Pagination
            count={pageNumbers.length}
            page={page}
            onChange={(event, val) => setPage(val)}
          />
        </Grid>
      )}
    </div>
  );
}

export default FavoriteArticles;
