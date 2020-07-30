import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { AccessTime } from '@material-ui/icons';
import client from '../Client';
import Loader from './Loader';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
    flex: '1 1 auto'
  }
}));
let timer;

const Left = () => {
  const classes = useStyles();
  const [loading, SetLoading] = useState(false);
  const [time, setTime] = useState(Math.floor(Date.now() / 1000));
  const [diffTime, setDiffTime] = useState('00:00:00');

  const getTime = async () => {
    SetLoading(true);
    try {
      const data = await client._get('/time');
      const epoch = data.data.properties.epoch.epochSeconds;
      setTime(epoch);
    } catch (err) {
      console.error('Error getting time: ', err);
    }

    setDiffTime('00:00:00');
    SetLoading(false);
  };
  // eslint-disable-next-line
  const getDiffTime = () => {
    const currentSeconds = Math.floor(Date.now() / 1000);
    const difference = currentSeconds - time;
    const diffSeconds = difference < 10 ? `00:00:0${difference}` : `00:00:${difference}`;
    setDiffTime(diffSeconds);
  };

  useEffect(() => {
    getTime();
    setInterval(() => getTime(), 30000);
  }, []);

  useEffect(() => {
    if (timer) clearInterval(timer);
    timer = setInterval(() => getDiffTime(), 1000);
  }, [time, getDiffTime]);

  const renderList = () => (
    <List>
      <ListItem>
        <ListItemIcon>
          <AccessTime />
        </ListItemIcon>
        <ListItemText primary="Time Retrieved(Epoch): " />
        <ListItemText primary={time} />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <AccessTime />
        </ListItemIcon>
        <ListItemText primary="Time Difference(sec): " />
        <ListItemText primary={diffTime} />
      </ListItem>
    </List>
  );

  const content = loading ? <Loader /> : renderList();

  return (
    <Paper className={classes.root} elevation={5}>
      {content}
    </Paper>
  );
};

export default Left;
