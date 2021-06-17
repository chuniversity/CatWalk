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
      currentProductId: 27189,
      outfit: [27189,  27190]
    }
  }

  changeCurrentProduct (newId) {
    this.setState( {
      currentProductId: newId
    }
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
          <Product_Overview productId={this.state.currentProductId} />
        </div>
        <div id="Ratings and Reviews">
          <Ratings_Reviews productId={this.state.currentProductId} />
        </div>
        <div id="Questions and Answers">
          <Questions_Answers productId={this.state.currentProductId} />
        </div>
        <div id="Related Items and Comparison">
          <RelatedItems_Comparison
            productId={this.state.currentProductId}
            changeCurrentProduct={this.changeCurrentProduct.bind(this)}
            outfit={this.state.outfit}
          />
        </div>
      </>
    )
  }
}
