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
import { FacebookShareButton, PinterestShareButton, TwitterShareButton, FacebookIcon, PinterestIcon, TwitterIcon } from "react-share";

const useStyles = makeStyles((theme) => ({
  root: {
    flexgrow: 1
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  }
}));

const ProductAppeal = ({ product, styles, currentStyle, changeStyle, changeSize, currentSize, allSizes, currentQuantity, changeQuantity, arrQty, galleryIndex, ratingAverage }) => {

  const classes = useStyles();

  const shareUrl = 'https://github.com/thefozzies/FEC';
  const shareTitle = `I am loving the ${product.name} from {the company name}`;
  let mediaImg = currentStyle.photos === undefined ? 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80':currentStyle.photos[galleryIndex].url ;

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
          <Ratings ratingAverage={ratingAverage}/>
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
          <Grid container spacing={1} alignItems='center' justify='center'>
            <Grid item xs={3}>
              <FacebookShareButton url={shareUrl} quote={shareTitle} >
                <FacebookIcon round={true} size={48} />
              </FacebookShareButton>
            </Grid>
            <Grid item xs={3}>
              <PinterestShareButton url={shareUrl} media={mediaImg} description={shareTitle} >
                <PinterestIcon round={true} size={48} />
              </PinterestShareButton>
            </Grid>
            <Grid item xs={3}>
              <TwitterShareButton url={shareUrl} title={shareTitle} >
                <TwitterIcon round={true} size={48} />
              </TwitterShareButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
};

export default ProductAppeal;