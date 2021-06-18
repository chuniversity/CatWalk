import React from 'react';
import axios from 'axios';
import access from '../../../../config.js';
import { Button } from '@material-ui/core';

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
      let answerId = e.currentTarget.value;
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
      let answerId = e.currentTarget.value;
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
    return (<div key={`answerList_${question.question_id}`}>
      {Object.entries(question.answers).map((answerTuple, j) => {
        //.sort((a, b) => a[1].helpfulness < b[1].helpfulness)
        let answerId = answerTuple[0];
        let answer = answerTuple[1];
        if (j < this.state.quantity) {
          return (
          <ul key={`answer_${answerId}`}>
            <span style={{'fontSize': '15', 'fontWeight': 'bold'}}>
              {`A: ${answer.body}`}
            </span>
            <br></br>
            <span style={{'fontStyle': 'italic'}}>
              {`by ${answer.answerer_name}, ${(new Date(answer.date).toDateString()).slice(3)}  `}
              <Button onClick={this.voteHelpful} value={answerId} size="small" color="primary">Helpful? Yes ({answer.helpfulness})</Button>
              <Button onClick={this.reportAnswer} value={answerId} size="small" color="secondary">Report</Button>
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
        } else if (j === this.state.quantity) {
          return (<Button key={`loadAnswers_${answerId}_${j}`} onClick={this.moreAnswers} variant="outlined" style={{'border': '1px'}}>Show more answers</Button>)
        }
      })}
    </div>)
  }
}