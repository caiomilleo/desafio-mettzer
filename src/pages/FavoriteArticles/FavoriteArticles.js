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
  let currentArticles;
  let pageNumbers = [];
  if (getFavoriteArticles() && getFavoriteArticles().length) {
    const indexOfLastFavorite = page * articlePerPage;
    const indexOfFirstFavorite = indexOfLastFavorite - articlePerPage;
    currentArticles = getFavoriteArticles().slice(
      indexOfFirstFavorite,
      indexOfLastFavorite
    );

    for (
      let i = 1;
      i <= Math.ceil(getFavoriteArticles().length / articlePerPage);
      i++
    ) {
      pageNumbers.push(i);
    }
  }

  return (
    <div className={classes.root}>
      {getFavoriteArticles() &&
        getFavoriteArticles().length > 0 &&
        currentArticles.map((article, index) => (
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
