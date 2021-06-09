import React from 'react';
import StyleSelector from './StyleSelector.jsx';
import { Grid, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => {
  root: {
    flexgrow: 1
  }
})

const ProductAppeal = ({ product, styles, currentStyle }) => {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1} justify='center'>
        <Grid item xs={11}>
          <Typography variant='subtitle2'>Ratings</Typography>
        </Grid>
        <Grid item xs={11}>
          <Typography variant='h6'>{product.category}</Typography>
          <Typography variant='h3'>{product.name}</Typography>
        </Grid>
        <Grid item xs={11}>
          <Typography variant='subtitle1'>{`$ ${currentStyle.sale_price ? currentStyle.sale_price : currentStyle.original_price}`}</Typography>
        </Grid>
        <Grid item xs={11}>
          <Typography varitant='h6'>Style > {currentStyle.name}</Typography>
          <Grid container spacing={2}>
            {styles.map((item, index) => {
              return <StyleSelector style={item} key={index}/>
            })}
          </Grid>
        </Grid>
        <Grid item xs={11}>
          <Grid container spacing={1} justify='center'>
            <Grid item xs={12}>
              <Typography variant='subtitle2'>Select Size</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant='subtitle2'>Quantity Selector</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant='subtitle2'>Add to Cart Button</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
};

export default ProductAppeal;