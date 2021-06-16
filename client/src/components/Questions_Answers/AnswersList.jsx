import React from 'react';
import axios from 'axios';
import access from '../../../../config.js';

export default class AnswersList extends React.Component {
  isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      quantity: 2,
      voted: false,
      reported: false
    }
    this.moreAnswers = this.moreAnswers.bind(this);
    this.voteHelpful = this.voteHelpful.bind(this);
    this.reportAnswer = this.reportAnswer.bind(this);
  }

  moreAnswers () {
    this.setState({
      quantity: this.state.quantity + 2
    })
  }

  voteHelpful(e) {
    if(!this.state.voted && this.isMounted) {
      let answerId = e.target.value;
      let config = {
        method: 'put',
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/qa/answers/${answerId}/helpful`,
        headers: {
          'Content-Type': 'application/json',
          'authorization': access.token
        }
      };
      axios(config)
        .then(() => {
          if (this.isMounted) {
            this.setState({
              voted: true
            })
          }
        })
        .catch(err => console.error(err))
    }
  }

  reportAnswer(e) {
    if(!this.state.reported && this.isMounted) {
      let answerId = e.target.value;
      let config = {
        method: 'put',
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/qa/answers/${answerId}/report`,
        headers: {
          'Content-Type': 'application/json',
          'authorization': access.token
        }
      };
      axios(config)
        .then(() => {
          if (this.isMounted) {
            this.setState({
              reported: true
            })
          }
        })
        .catch(err => console.error(err))
    }
  }

  componentDidMount() {
    this.isMounted = true;
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  render() {
    const {question} = this.props;
    return (<>
      {Object.entries(question.answers).map((answerTuple, j) => {
        let answerId = answerTuple[0];
        let answer = answerTuple[1];
        if (j < this.state.quantity) {
          return (
          <ul key={answerId}>
            <span>
              {`A: ${answer.body}`}
            </span>
            <br></br>
            <span style={{'fontStyle': 'italic'}}>
              {`by ${answer.answerer_name}, ${(new Date(answer.date).toDateString()).slice(3)}  `}
              <button onClick={this.voteHelpful} value={answerId}>Helpful? Yes ({answer.helpfulness})</button>
              <button onClick={this.reportAnswer} value={answerId}>Report</button>
            </span>
            <br></br>
            <span>
              {answer.photos.map((photo, k) => {
                return <img
                src={photo}
                key={`img_${k}`}
                style={{
                  'border': '1px solid #ddd',
                  'borderRadius': '4px',
                  'padding': '5px',
                  'height': '165px'
                }}
                />
              })}
            <br></br>
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