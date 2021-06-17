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
      // send put request to increase helpfulness for a specific answer
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
      // send put request to report a specific answer
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
      {Object.entries(question.answers).map((answer, j) => {
        if (j < this.state.quantity) {
          return (
          <ul key={answer[0]}>
            <span>
              {`A: ${answer[1].body}`}
            </span>
            <br></br>
            <span style={{'fontStyle': 'italic'}}>
              {`by ${answer[1].answerer_name}, ${(new Date(answer[1].date).toDateString()).slice(3)}  `}<button onClick={this.voteHelpful} value={answer[0]}>{`Helpful? Yes (${answer[1].helpfulness})`}</button><button onClick={this.reportAnswer} value={answer[0]}>Report</button>
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
            <br></br>
          </ul>
          )
        } else if (j === this.state.quantity + 1) {
          return (<button key={`loadAnswers_${j}`} onClick={this.moreAnswers}>Load more answers</button>)
        }
      })}
    </>)
  }
}