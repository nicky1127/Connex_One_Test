import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Box } from '@material-ui/core';
import client from '../Client';
import Loader from './Loader';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
    flex: '1 1 auto'
  },
  box: {
    height: '100%',
    overflow: 'scroll'
  }
}));

const Left = () => {
  const classes = useStyles();
  const [loading, SetLoading] = useState(false);
  const [metrics, setMetrics] = useState('');

  const getProm = async () => {
    SetLoading(true);
    try {
      const data = await client._get('/metrics');
      setMetrics(data);
    } catch (err) {
      console.error('Error getting prometheus metrics: ', err);
    }
    SetLoading(false);
  };

  useEffect(() => {
    getProm();
    setInterval(() => getProm(), 30000);
  }, []);

  const renderBox = () => <Box className={classes.box}>{metrics}</Box>;

  const content = loading ? <Loader /> : renderBox();

  return (
    <Paper className={classes.root} elevation={5}>
      {content}
    </Paper>
  );
};

export default Left;
