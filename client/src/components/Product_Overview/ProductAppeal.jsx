import React from 'react';
import StyleSelector from './StyleSelector.jsx';
import SelectSize from './SelectSize.jsx';
import SelectQuantity from './SelectQuantity.jsx';
import Ratings from './Rating.jsx';
import { Grid, Typography, Paper, Box, Fab, Checkbox } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import { makeStyles } from '@material-ui/core/styles';
import { FacebookShareButton, PinterestShareButton, TwitterShareButton, FacebookIcon } from "react-share";

const useStyles = makeStyles((theme) => ({
  root: {
    flexgrow: 1
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  shareMediaIcon: {
    round: true,
    size: 48
  }
}));

const ProductAppeal = ({ product, styles, currentStyle, changeStyle, changeSize, currentSize, allSizes, currentQuantity, changeQuantity, arrQty }) => {

  const classes = useStyles();

  const disableFunc = () => {
    const notSizes = ['', 'Select Size'];
    const notQty = [0, 'Select Qty'];
    if (notSizes.includes(currentSize.size) || notQty.includes(currentQuantity.quantity)) {
      return true;
    }
    return false;
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1} justify='center'>
        <Grid item xs={11}>
          <Ratings ratingAverage={3.25}/>
        </Grid>
        <Grid item xs={11}>
          <Typography variant='h5'>{product.category}</Typography>
          <Typography variant='h3'>{product.name}</Typography>
        </Grid>
        <Grid item xs={11}>
          <Typography variant='h6'>{`$ ${currentStyle.sale_price ? currentStyle.sale_price : currentStyle.original_price}`}</Typography>
        </Grid>
        <Grid item xs={11}>
          <Typography variant='h6' fontWeight='200'><Box fontWeight='700' display='inline'>Style > </Box> {currentStyle.name}</Typography>
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
        <Grid item xs={6}>
          <Fab disabled={disableFunc()} variant='extended'>
            <Grid container spacing={0} justify='center'>
              <Grid item xs={10}>
                <Typography variant='subtitle2'>Add to Cart</Typography>
              </Grid>
              <Grid item xs={2}>
                <AddIcon ></AddIcon>
              </Grid>
            </Grid>
          </Fab>
        </Grid>
        <Grid item xs={3}>
          <Checkbox
              icon={<FavoriteBorderRoundedIcon fontSize='large'/>}
              checkedIcon={<FavoriteRoundedIcon fontSize='large' color="secondary"/>}
              // onClick={}
            />
        </Grid>
        <Grid item xs={11}>
          <Grid container spacing={4}>
            <Grid item xs={4}>
              <FacebookShareButton url='wwww.facebook.com'>
                <FacebookIcon round={true} size={48} />
              </FacebookShareButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
};

export default ProductAppeal;