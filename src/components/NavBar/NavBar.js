import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

export default function NavBar() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Button color='inherit' onClick={() => history.push('/favoritos')}>
            Favoritos
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
