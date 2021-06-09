import React from 'react';
import {Grid, Typography, Paper} from '@material-ui/core';

const ProductAppeal = ({product, styles, currentStyle}) => {
  return (
    <>
    <Grid container spacing={1} justify='center'>
      <Grid item xs={12}>
        <Typography variant='subtitle2'>Ratings</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='subtitle1'>{product.category}</Typography>
        <Typography variant='h3'>{product.name}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='subtitle2'>{currentStyle.sale_price? currentStyle.sale_price:currentStyle.original_price}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Paper>
          <Typography variant='subtitle2'>StyleSelector</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={1} justify='center'>
          <Grid item xs={12}>
            <Paper>
              <Typography variant='subtitle2'>Select Size</Typography>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper>
              <Typography variant='subtitle2'>Quantity Selector</Typography>
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Paper>
              <Typography variant='subtitle2'>Add to Cart Button</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    </>
  )
};

export default ProductAppeal;