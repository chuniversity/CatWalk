import React from 'react';
import RelatedView from './RelatedView.jsx';
import Outfit from './Outfit.jsx';

export default class App extends React.Component {
  constructor (props) {
<<<<<<< HEAD
=======
    // console.log(props.productId)
>>>>>>> 36e1b7739ef5bf5954635929bc60d17bb8f307e7
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
