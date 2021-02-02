import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Collapse } from '@material-ui/core';
import {
  getFavoriteArticles,
  setFavoriteArticle,
  removeArticle,
} from '../../store/localStorage';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    flex: '1 0 30%',
    border: '1px solid black',
    margin: '1%',
    alignItems: 'stretch',
  },
  title: {
    textAlign: 'center',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export function CardArticle({ article }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const { authors, type, title, description, urls } = article;
  const [favoriteArticles, setFavoriteArticles] = useState(
    getFavoriteArticles() ? getFavoriteArticles() : []
  );

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleFavoriteArticle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isFavorite()) {
      setFavoriteArticle(article);
      setFavoriteArticles((prev) => [...prev, article]);
    } else {
      removeArticle(article);
      setFavoriteArticles((prev) =>
        prev.filter((item) => item.id !== article.id)
      );
    }
  };

  const isFavorite = () => {
    if (favoriteArticles && favoriteArticles.length > 0) {
      return favoriteArticles.some((item) => item.id === article.id);
    }
  };

  return (
    <Card className={classes.root}>
      <CardActions>
        <IconButton
          aria-label='add to favorites'
          onClick={(e) => handleFavoriteArticle(e)}
        >
          <FavoriteIcon style={{ fill: isFavorite() && 'red' }} />
        </IconButton>
      </CardActions>

      <CardContent>
        {title && (
          <Typography
            className={classes.title}
            color='textSecondary'
            gutterBottom
          >
            {title}
          </Typography>
        )}
      </CardContent>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          {type && <Typography>{`Tipo: ${type}`}</Typography>}
          {authors &&
            authors.length > 0 &&
            authors.map((author) => <Typography>{author}</Typography>)}
          {description && (
            <Typography>{`Descrição: ${description}`}</Typography>
          )}
          {urls &&
            urls.length > 0 &&
            urls.map((url) => <Link href={url}>{url}</Link>)}
        </CardContent>
      </Collapse>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
