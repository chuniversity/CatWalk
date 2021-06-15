import React from 'react';
import RelatedView from './RelatedView.jsx';

export default class App extends React.Component {
  constructor (props) {
    console.log(props.productId)
    super(props)
    this.state = {
      currentItem: 27189
    }
  }
  render () {
    return (
    <div>
      <RelatedView currentItem={this.props.productId}/>
    </div>
    )
  }
}
