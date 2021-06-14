import React from 'react';
import Product_Overview from './Product_Overview/index.jsx';
import Ratings_Reviews from './Ratings_Reviews/index.jsx';
import Questions_Answers from './Questions_Answers/index.jsx';
import RelatedItems_Comparison from './RelatedItems_Comparison/index.jsx';

import { CssBaseline, AppBar, Typography } from '@material-ui/core';

export default class App extends React.Component {
  constructor () {
    super()
    this.state = {}
  }
  render () {
    return (
      <>
        <CssBaseline />
        <AppBar position="relative" >
          <Typography variant="h5" >Project Catwalk</Typography>
        </AppBar>
        <div id="Product Overview">
          <Product_Overview />
        </div>
        <div id="Ratings and Reviews">
          <Ratings_Reviews />
        </div>
        <div id="Questions and Answers">
          <Questions_Answers />
        </div>
        <div id="Related Items and Comparison">
          <RelatedItems_Comparison />
        </div>
      </>
    )
  }
}
