import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    height: '8%',
    width: '100%',
    padding: '10px',
    display: 'flex'
  },
  title: {
    flex: '1 1 auto'
  },
  info: {
    flexBasis: '20%'
  }
}));

const Header = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h1 className={classes.title}>Connex One - Full Stack Technical Test</h1>
      <div className={classes.info}>
        <h3>Applicant : Nicky Lai</h3>
        <h3>Date: 30/07/2020</h3>
      </div>
    </div>
  );
};

export default Header;
