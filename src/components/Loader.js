import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, CircularProgress, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    paddingTop: '30px'
  },
  spinner: {
    marginRight: theme.spacing(3)
  }
}));

const Loader = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <CircularProgress className={classes.spinner} color="primary" />
      <Typography component="span">Loading</Typography>
    </Box>
  );
};

export default Loader;
