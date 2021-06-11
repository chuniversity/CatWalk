import React from 'react';
import { Typography, Grid, Paper, AppBar } from '@material-ui/core';
import axios from 'axios';
import access from '../../../../config.js';
import ProductAppeal from './ProductAppeal.jsx';

class Overview extends React.Component {
  constructor (props) {
    super(props
);
    this.state = {
      product: {},
      styles: [],
      currentStyle: {},
      currentSize: {
        size: ' '
      },
      allSizes: [],
      currentQuantity: {
        quantity: 0
      },
      arrQty: []
    }
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
      console.log('Product:  ', this.state.product);
      console.log('Styles:  ', this.state.styles);
      console.log('currentStyle:  ', this.state.currentStyle);
    }).catch(err => {
      console.error(err);
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
      console.log('current size  ', this.state.currentSize);
      console.log('current size  ', currentSkus[key].size);
      if (this.state.currentSize.size === currentSkus[key].size) {
        qty = currentSkus[key].quantity;
      }
    }
    console.log('Number quntity:  ', qty);
    for (let i = 0; i < qty; i++) {
      newArrQty.push(i + 1);
    }
    this.setState(
      this.state.arrQty = newArrQty
    );
    console.log('Array qunatity:  ', this.state.arrQty);
  }

  changeQuantity (selectedQuantity) {
    const newCurrentQuantity = {};
    newCurrentQuantity.quantity = selectedQuantity;
    this.setState(
      this.state.currentQuantity = newCurrentQuantity
    )
  }

  render () {
    return (
      <div>
        <Typography variant="body1">Product Overview</Typography>
        <Grid container spacing={1} justify='center'>
          <Grid item xs={7}>
            <Paper >
              <Typography variant='subtitle1' >Gallery</Typography>
            </Paper>
          </Grid>
          <Grid item xs={5}>
          <Paper >
              <ProductAppeal product={this.state.product} styles={this.state.styles} currentStyle={this.state.currentStyle} changeStyle={this.changeStyle.bind(this)} changeSize={this.changeSize.bind(this)} currentSize={this.state.currentSize} allSizes={this.state.allSizes} currentQuantity={this.state.currentQuantity} changeQuantity={this.changeQuantity.bind(this)} arrQty={this.state.arrQty}/>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <Typography variant='subtitle1'>Description and Features</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <Typography variant='subtitle1'>Media</Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
};

export default Overview;