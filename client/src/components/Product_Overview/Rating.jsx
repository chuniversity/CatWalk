import React from 'react';
import { Box, Typography, Grid } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
    justify: 'center'
  },
});

const Ratings = ({ ratingAverage }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={0} >
      <Grid item xs={4} className={classes.root}>
          <Rating
            name="hover-feedback"
            value={ratingAverage}
            precision={0.25}
            readOnly
            display='inLine'
          />
      </Grid>
      <Grid item xs={6}>
        <a href='#Ratings and Reviews'>
          <Typography variant='subtitle1'>
            Read all reviews
          </Typography>
        </a>
      </Grid>
    </Grid>
  )
};

export default Ratings;