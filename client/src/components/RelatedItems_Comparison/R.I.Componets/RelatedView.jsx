import React from 'react';
import RelatedProduct from './RelatedProduct.jsx';
import axios from 'axios';
import Carousel from 'react-material-ui-carousel';
import access from '../../../../../config.js';


//the selected item will be passed down from the main page via the reduz store

class RelatedView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedArray: []
    }
  }

  componentDidMount () {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/products/${this.props.currentItem}/related`,
    {
      headers: {
        'Authorization': access.token
      }
    })
      .then((results) => {
        this.setState({
          relatedArray: results.data
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
            <RelatedProduct item={product} key={i}/>
            )
          })
        }
      </Carousel>
    )
  }
}

export default RelatedView;