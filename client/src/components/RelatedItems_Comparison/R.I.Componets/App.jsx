import React from 'react';
import axios from 'axios';
import RelatedView from './RelatedView.jsx';
import OutfitView from './OutfitView.jsx';
import { Typography } from '@material-ui/core';
import access from '../../../../../config.js';

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      defProductStyle: {},
      relatedArray: [],
      selected: {}
    }
  }

  componentDidMount () {
    ////////STYLES REQUEST//////////
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/products/${this.props.productId}/styles`,
    {
      headers: {
        'Authorization': access.token
      }
    }).then((results) => {
      this.setState({
        defProductStyle: results.data.results[0]
      })
    }).catch(err  => {
      console.error('Error @ Styles Request:', err)
    });
    ///////Realted Array //////////
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/products/${this.props.productId}/related`,
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
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/products/${this.props.productId}`,
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
  changeOnProductId () {
  if (this.props.productId !== this.state.selected.id && this.state.selected.id !== undefined) {
    ////////STYLES
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/products/${this.props.productId}/styles`,
    {
      headers: {
        'Authorization': access.token
      }
    }).then((results) => {
      this.setState({
        defProductStyle: results.data.results[0]
      })
    }).catch(err  => {
      console.error('Error @ Styles Request:', err)
    });
    ///////Realted Array //////////
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/products/${this.props.productId}/related`,
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
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/products/${this.props.productId}`,
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
}

  render () {
    this.changeOnProductId()
    return (
    <div>
      <div>
        <RelatedView
          addToOutfit={this.props.addToOutfit}
          currentItem={this.state.selected}
          changeCurrentProduct={this.props.changeCurrentProduct}
          defaultStyle={this.state.defProductStyle}
          related={this.state.relatedArray} />
      </div>
      <div>
        <OutfitView
          removeFromOutfit={this.props.removeFromOutfit}
          outfit={this.props.outfit}
          changeCurrentProduct={this.props.changeCurrentProduct}
        />
      </div>
    </div>

    )
  }
}
