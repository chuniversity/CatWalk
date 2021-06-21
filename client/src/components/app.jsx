import React from 'react';
import Product_Overview from './Product_Overview/index.jsx';
import Ratings_Reviews from './Ratings_Reviews/index.jsx';
import Questions_Answers from './Questions_Answers/index.jsx';
import RelatedItems_Comparison from './RelatedItems_Comparison/index.jsx';
import axios from 'axios';
import access from '../../../config.js';

import { CssBaseline, AppBar, Typography } from '@material-ui/core';

export default class App extends React.Component {
  constructor () {
    super()
    this.state = {
      outfit: [],
      currentProduct: { id: 27189 },
      showProduct: {}
    }
  }

  componentDidMount () {
   this.changeShownProduct();
  }

  changeShownProduct () {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/products/${this.state.currentProduct.id}`, {
      headers: {
        'Authorization': access.token
      }
    }).then(data => {
      const newProduct = data.data;
      this.setState(
        this.state.showProduct = newProduct
      );
      console.log(this.state.showProduct);
    }).catch (err => {
      console.error(err);
    })
  }

  changeCurrentProduct (newId) {
    const newProductId = { id: newId };
    this.setState(
      this.state.currentProduct = newProductId
    )
    this.changeShownProduct();
  }

  addToOutfit (productId) {
    let temp = this.state.outfit;
    temp.push(productId)
    this.setState(
      this.state.outfit = temp
    )
  }

  removeFromOutfit (productId) {
    let temp = this.state.outfit;
    let i = temp.indexOf(productId);
    console.log('temp:', temp)
    temp.splice(i, 1);
    this.setState(
      this.state.outfit = temp
      )
      console.log('slice:', this.state.outfit)
  }

  render () {
    return (
      <>
        <CssBaseline />
        <AppBar position="relative" >
          <Typography variant="h5" >Project Catwalk</Typography>
        </AppBar>
        <div id="Product Overview">
          <Product_Overview productId={this.state.currentProduct.id} showProduct={this.state.showProduct}/>
        </div>
        <div id="Ratings and Reviews">
          <Ratings_Reviews productId={this.state.currentProduct.id} />
        </div>
        <div id="Questions and Answers">
          <Questions_Answers productId={this.state.currentProduct.id} productName={this.state.showProduct.name}/>
        </div>
        <div id="Related Items and Comparison">
          <RelatedItems_Comparison
            productId={this.state.currentProduct.id}
            removeFromOutfit={this.removeFromOutfit.bind(this)}
            addToOutfit={this.addToOutfit.bind(this)}
            changeCurrentProduct={this.changeCurrentProduct.bind(this)}
            outfit={this.state.outfit}
          />
        </div>
      </>
    )
  }
}
