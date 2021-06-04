import React from 'react';
import Square from './square.jsx'

export default class Board extends Component {
  renderSquare (i) {
    return <Square value={this.props.squares[i]}
    onClick={() => this.props.onClick(i)}
  }
  render() {
    return (
      <div>
        <div class="border-row">

        </div>
      </div>
    )
  }
}