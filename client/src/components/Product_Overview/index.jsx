import React from 'react';
import { Typography, Grid, Paper, AppBar, Divider, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import axios from 'axios';
import access from '../../../../config.js';
import ProductAppeal from './ProductAppeal.jsx';
import Gallery from './Gallery.jsx';




class Overview extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      product: {},
      styles: [],
      currentStyle: {},
      currentSize: {
        size: ''
      },
      allSizes: [],
      currentQuantity: {
        quantity: 0
      },
      arrQty: [],
      gallery: {
        index: 0
      },
      rating: {
        average: 0
      }
    };
    this.classes = makeStyles((theme) => ({
      root: {
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        '& hr': {
          margin: theme.spacing(0, 0.5),
        },
      },
    }));
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount () {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/products/${this.props.productId}`, {
        headers: {
          'Authorization': access.token
        }
    }).then(data => {
      const newProduct = data.data;
      this.setState(
        this.state.product = newProduct
      );
      return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/products/${this.props.productId}/styles`, {
        headers: {
          'Authorization': access.token
        }
      })
    }).then( data => {
      const newStyles = data.data.results;
      let newCurrentStyle = {};
      this.setState(
        this.state.styles = newStyles
      );
      newStyles.map(item => {
        if (item['default?']) {
          newCurrentStyle = item;
        }
      });
      this.setState(
        this.state.currentStyle = newCurrentStyle
      );
      let newAllSizes = [];
      const currentSkus = this.state.currentStyle.skus;
      for (let key in currentSkus) {
        newAllSizes.push(currentSkus[key].size);
      }
      this.setState(
        this.state.allSizes = newAllSizes
      )
    }).catch(err => {
      console.error(err);
    });
    /**********************************
     *        Star Reviews
     **********************************/
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/reviews/meta?product_id=${this.props.productId}`,
    {
      headers: {
        'Authorization': access.token
      }
    }).then((results) => {
      let ratings = results.data.ratings;
      var responseTotal = 0;
      let scoreTotal = 0;
      for (let key in ratings) {
        let temp = ratings[key];
        responseTotal = responseTotal + Number(temp);
        scoreTotal += key * temp;
      }
      let result = scoreTotal / responseTotal;
      const newRating = { average: result};
      this.setState(
        this.state.rating = newRating
      )})
      .catch((err) =>{
          console.error("error @ review get:" , err);
    });
  }

  changeStyle (newStyleId) {
    let newCurrentStyle = {};
    this.state.styles.map(item => {
      if (item.style_id === newStyleId) {
        newCurrentStyle = item;
      }
    });
    this.setState(
      this.state.currentStyle = newCurrentStyle
    );
    let newAllSizes = [];
    const currentSkus = this.state.currentStyle.skus;
    for (let key in currentSkus) {
      newAllSizes.push(currentSkus[key].size);
    }
    this.setState(
      this.state.allSizes = newAllSizes
    );
    this.changeSize('Select Size');
    this.changeQuantity('Select Qty');
    this.changeGalleryIndex(0);
  }

  changeSize (selectedSize) {
    const newCurrentSize = {};
    newCurrentSize.size = selectedSize;
    this.setState(
      this.state.currentSize = newCurrentSize
    )
    let newArrQty = [];
    let qty = 0;
    const currentSkus = this.state.currentStyle.skus;
    for (let key in currentSkus) {
      if (this.state.currentSize.size === currentSkus[key].size) {
        qty = currentSkus[key].quantity;
      }
    }
    for (let i = 0; i < qty; i++) {
      newArrQty.push(i + 1);
    }
    this.setState(
      this.state.arrQty = newArrQty
    );
    const newCurrentQuantity = {
      quantity: 0
    };
    this.setState(
      this.state.currentQuantity = newCurrentQuantity
    )
  }

  changeQuantity (selectedQuantity) {
    const newCurrentQuantity = {};
    newCurrentQuantity.quantity = selectedQuantity;
    this.setState(
      this.state.currentQuantity = newCurrentQuantity
    )
  }

  changeOnProductId () {
    if (this.props.productId !== this.state.product.id && this.state.product.id !== undefined) {
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/products/${this.props.productId}`, {
        headers: {
          'Authorization': access.token
        }
      }).then(data => {
        const newProduct = data.data;
        this.setState(
          this.state.product = newProduct
        );
        return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/products/${this.props.productId}/styles`, {
          headers: {
            'Authorization': access.token
          }
        })
      }).then( data => {
        const newStyles = data.data.results;
        let newCurrentStyle = {};
        this.setState(
          this.state.styles = newStyles
        );
        newStyles.map(item => {
          if (item['default?']) {
            newCurrentStyle = item;
          }
        });
        this.setState(
          this.state.currentStyle = newCurrentStyle
        );
        let newAllSizes = [];
        const currentSkus = this.state.currentStyle.skus;
        for (let key in currentSkus) {
          newAllSizes.push(currentSkus[key].size);
        }
        this.setState(
          this.state.allSizes = newAllSizes
        )
      }).catch(err => {
        console.error(err);
      });
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/reviews/meta?product_id=${this.props.productId}`,
      {
        headers: {
          'Authorization': access.token
        }
      }).then((results) => {
        let ratings = results.data.ratings;
        var responseTotal = 0;
        let scoreTotal = 0;
        for (let key in ratings) {
          let temp = ratings[key];
          responseTotal = responseTotal + Number(temp);
          scoreTotal += key * temp;
        }
        let result = scoreTotal / responseTotal;
        const newRating = { average: result};
        this.setState(
          this.state.rating = newRating
        )})
        .catch((err) =>{
            console.error("error @ review get:" , err);
      });
    }
  }

  changeGalleryIndex (id) {
    const newGallery = {
      index: id
    }
    this.setState(
      this.state.gallery = newGallery
    )
  }

  addToCart(num) {
    this.props.addToCart(num);
    this.changeSize('Select Size');
    this.changeQuantity('Select Qty');
  }

  render () {
    this.changeOnProductId();
    return (
      <div>
        <Grid container spacing={1} justify='center'>
          <Grid item xs={7}>
              <Gallery photos={this.state.currentStyle.photos} galleryIndex={this.state.gallery.index} changeGalleryIndex={this.changeGalleryIndex.bind(this)}/>
          </Grid>
          <Grid item xs={5} >
            <ProductAppeal product={this.state.product} styles={this.state.styles} currentStyle={this.state.currentStyle} changeStyle={this.changeStyle.bind(this)} changeSize={this.changeSize.bind(this)} currentSize={this.state.currentSize} allSizes={this.state.allSizes} currentQuantity={this.state.currentQuantity} changeQuantity={this.changeQuantity.bind(this)} arrQty={this.state.arrQty} galleryIndex={this.state.gallery.index} ratingAverage={this.state.rating.average} addToCart={this.addToCart}/>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={10} alignItems='center' justify='center' className={this.classes.root}>
              <Grid item xs={6} >
                <Typography variant='h6'>{this.state.product.slogan}</Typography>
                <Typography align='justify' variant='body1'>{this.state.product.description}</Typography>
              </Grid>
              <Divider orientation='vertical' flexItem/>
              <Grid item xs={4} >
                {this.state.product.features === undefined ? <></> : this.state.product.features.map((item, index) => {
                   return <Typography key={index} variant='subtitle1'>
                  <CheckIcon display='inline'/>
                  <Box fontWeight='fontWeightMedium' display='inline'>{item.feature}: </Box>
                  {item.value}
                  </Typography>
                })}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
};

export default Overview;