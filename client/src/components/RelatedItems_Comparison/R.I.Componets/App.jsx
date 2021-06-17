import React from 'react';
import RelatedView from './RelatedView.jsx';
import Outfit from './Outfit.jsx';

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
    console.log('App check:', this.props.changeCurrentProduct)
  }

  render () {
    return (
    <div>
      <div>
        <RelatedView currentItem={this.props.productId} changeCurrentProduct={this.props.changeCurrentProduct}/>
      </div>
      <div>
        <Outfit/>
      </div>
    </div>

    )
  }
}
