import React from 'react';
import Product_Overview from './Product_Overview/index.jsx';
import Ratings_Reviews from './Ratings_Reviews/index.jsx';
import Questions_Answers from './Questions_Answers/index.jsx';
import RelatedItems_Comparison from './RelatedItems_Comparison/index.jsx';

import { CssBaseline, AppBar, Typography } from '@material-ui/core';

export default class App extends React.Component {
  constructor () {
    super()
    this.state = {
      outfit: [27189,  27190],
      currentProduct: { id: 27189 },
    }
  }

  changeCurrentProduct (newId) {
    const newProductId = { id: newId };
    this.setState(
      this.state.currentProduct = newProductId
    )
  }

  render () {
    return (
      <>
        <CssBaseline />
        <AppBar position="relative" >
          <Typography variant="h5" >Project Catwalk</Typography>
        </AppBar>
        <div id="Product Overview">
          <Product_Overview productId={this.state.currentProduct.id} />
        </div>
        <div id="Ratings and Reviews">
          <Ratings_Reviews productId={this.state.currentProduct.id} />
        </div>
        <div id="Questions and Answers">
          <Questions_Answers productId={this.state.currentProduct.id} />
        </div>
        <div id="Related Items and Comparison">
          <RelatedItems_Comparison
            productId={this.state.currentProduct.id}
            changeCurrentProduct={this.changeCurrentProduct.bind(this)}
            outfit={this.state.outfit}
          />
        </div>
      </>
    )
  }
}
