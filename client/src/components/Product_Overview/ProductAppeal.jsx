import React from 'react';
import StyleSelector from './StyleSelector.jsx';
import SelectSize from './SelectSize.jsx';
import SelectQuantity from './SelectQuantity.jsx';
import { Grid, Typography, Paper, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => {
  root: {
    flexgrow: 1
  }
})

const ProductAppeal = ({ product, styles, currentStyle, changeStyle, changeSize, currentSize, allSizes, currentQuantity, changeQuantity, arrQty }) => {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1} justify='center'>
        <Grid item xs={11}>
          <Typography variant='subtitle1'>Ratings</Typography>
        </Grid>
        <Grid item xs={11}>
          <Typography variant='h5'>{product.category}</Typography>
          <Typography variant='h3'>{product.name}</Typography>
        </Grid>
        <Grid item xs={11}>
          <Typography variant='h6'>{`$ ${currentStyle.sale_price ? currentStyle.sale_price : currentStyle.original_price}`}</Typography>
        </Grid>
        <Grid item xs={11}>
          <Typography component='h5'><Box fontWeight='fontWeightMedium' display='inline'>Style > </Box> {currentStyle.name}</Typography>
          <Grid container spacing={2}>
            {styles.map((item, index) => {
              return <StyleSelector style={item} key={index} changeStyle={changeStyle} currentStyleId={currentStyle.style_id}/>
            })}
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <SelectSize changeSize={changeSize} currentSize={currentSize} allSizes={allSizes}/>
        </Grid>
        <Grid item xs={5}>
          <SelectQuantity currentQuantity={currentQuantity} changeQuantity={changeQuantity} arrQty={arrQty}/>
        </Grid>
        <Grid item xs={11}>
          <Typography variant='subtitle2'>Add to Cart Button</Typography>
        </Grid>
      </Grid>
    </div>
  )
};

export default ProductAppeal;