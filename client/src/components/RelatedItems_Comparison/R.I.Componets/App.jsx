import React from 'react';
import RelatedView from './RelatedView.jsx';

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentItem: 27189
    }
  }
  render () {
    return (
    <div>
      <RelatedView currentItem={this.state.currentItem}/>
    </div>
    )
  }
}
