import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 345,
    flex: '1 0 30%',
    textAlign: 'center',
    border: '1px solid black',
    margin: '1%',
    alignItems: 'stretch',
    cursor: 'pointer',
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
}));

export function CardArticle({ authors, type, title, description, urls }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color='textSecondary'
          gutterBottom
        >
          Word of the Day
        </Typography>
        <Typography variant='h5' component='h2'></Typography>
        <Typography className={classes.pos} color='textSecondary'>
          adjective
        </Typography>
        <Typography variant='body2' component='p'>
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label='add to favorites'>
          <FavoriteIcon style={{ fill: 'red' }} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
