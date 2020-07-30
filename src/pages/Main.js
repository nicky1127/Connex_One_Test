import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../components/Header';
import Left from '../components/Left';
import Right from '../components/Right';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100vh'
  },
  main: {
    display: 'flex',
    height: '92%'
  }
}));

const Main = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.main}>
        <Left />
        <Right />
      </div>
    </div>
  );
};

export default Main;
