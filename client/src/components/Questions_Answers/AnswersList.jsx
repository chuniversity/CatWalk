import React from 'react';
import { Zoom } from '@material-ui/core';

export default class AnswersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 2
    }
    this.moreAnswers = this.moreAnswers.bind(this);
  }
  

  moreAnswers () {
    this.setState({
      quantity: this.state.quantity + 2
    })
  }
  
  render() {
    const {question} = this.props;
    return (<>
      {Object.entries(question.answers).map((answer, j) => {
        if (j < this.state.quantity) {
          return (
          <ul key={answer[0]}>
            <span>
              {`A: ${answer[1].body}`}
            </span>
            <br></br>
            <span style={{'fontStyle': 'italic'}}>
              {`by ${answer[1].answerer_name}, ${new Date(answer[1].date).toDateString()}  |  Helpful?  Yes (${answer[1].helpfulness})  |  Report`}
            </span>
            <br></br>
            <span>
              {answer[1].photos.map((photo, k) => {
                return <img
                src={photo}
                key={`img_${k}`}
                style={{
                  'border': '1px solid #ddd',
                  'borderRadius': '4px',
                  'padding': '5px',
                  'height': '200px'
                }}
                />
              })}
            </span>
          </ul>
          )
        } else if (j === this.state.quantity + 1) {
          return (<button key={`loadAnswers_${j}`} onClick={this.moreAnswers}>Load more answers</button>)
        }
      })}
    </>)
  }
}