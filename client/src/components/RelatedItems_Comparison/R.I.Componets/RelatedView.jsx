import React from 'react';
import RelatedProduct from './RelatedProduct.jsx';
import axios from 'axios';
import Carousel from 'react-material-ui-carousel';
import access from '../../../../../config.js';



class RelatedView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedArray: [],
      selected: {}
    }
  console.log('Relvated View check:', this.props.changeCurrentProduct)
  }

  componentDidMount () {
///////Realted Array //////////
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/products/${this.props.currentItem}/related`,
    {
      headers: {
        'Authorization': access.token
      }
    }).then((results) => {
        this.setState({
          relatedArray: results.data
        })
    }).catch ((err) => {
        console.error("error in GET request:", err);
    })
/////// PRODUCT REQUEST ///////////
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/products/${this.props.currentItem}`,
    {
      headers: {
        'Authorization': access.token
      }
    }).then((results) => {
        this.setState({
          selected: results.data
        })
    }).catch ((err) => {
        console.error("error in GET request:", err);
    })

  }

  render() {
    return (
      <Carousel
      animation={"slide"}
      interval={4000}
      >
        {this.state.relatedArray.map((product, i) => {
          return (
            <RelatedProduct changeCurrentProduct={this.props.changeCurrentProduct} item={product} key={i} selected={this.state.selected}/>
          )
          })
        }
      </Carousel>
    )
  }
}

export default RelatedView;