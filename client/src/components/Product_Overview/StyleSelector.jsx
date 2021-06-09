import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  }
}));

const StyleSelector = ({ style }) => {
  const classes = useStyles();
  return (
    <Grid item xs={3}>
      <Avatar alt={style.name} src={style.photos[0].thumbnail_url} className={classes.large} />
    </Grid>
  )
};

export default StyleSelector;