import React from 'react';
import RelatedProduct from './RelatedProduct.jsx';
import axios from 'axios';
//import Carousel from 'react-material-ui-carousel';
import Carousel from 'react-elastic-carousel';
import access from '../../../../../config.js';

{/* <RelatedView
addToOutfit={this.props.addToOutfit}
currentItem={this.state.selected}
changeCurrentProduct={this.props.changeCurrentProduct}
defaultStyle={this.state.defProductStyle}
related={this.state.relatedArray} /> */}

const RelatedView = (props) => {
  return (
    <Carousel
    itemPadding={[2, 2]}
    itemsToShow={3}
    pagination={false}
    >
      {props.related.map((product, i) => {
        return (
          <RelatedProduct
          addToOutfit={props.addToOutfit}
          changeCurrentProduct={props.changeCurrentProduct}
          item={product}
          key={i}
          selected={props.currentItem}
          selectedStyle={props.defaultStyle}/>
        )
        })
      }
    </Carousel>
  )
}

export default RelatedView;