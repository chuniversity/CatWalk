import React from 'react';
import axios from 'axios';
import access from '../../../../config.js';
import AnswersList from './AnswersList.jsx';
import AnswerForm from './AnswerForm.jsx';
import { Button } from '@material-ui/core';

export default class QuestionsList extends React.Component {
  isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      quantity: 4,
      filtered: [],
      voted: false,
      reported: false,
    }
    this.moreQuestions = this.moreQuestions.bind(this);
    this.collapseQuestions = this.collapseQuestions.bind(this);
    this.hideAllQuestions = this.hideAllQuestions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.voteHelpful = this.voteHelpful.bind(this);
    this.reportQuestion = this.reportQuestion.bind(this);
  }

  moreQuestions () {
    if(this.state.quantity + 1 === this.props.questions.length) {
      this.setState({
        quantity: this.state.quantity + 1
      })
    } else if (this.state.quantity + 2 > this.props.questions.length) {
      return;
    } else {
      this.setState({
        quantity: this.state.quantity + 2
      })
    }
  }
  
  collapseQuestions() {
    if (this.state.quantity > 4) {
      this.setState({
        quantity: this.state.quantity - 2
      })
    }
  }
  
  hideAllQuestions() {
    this.setState({
      quantity: 0
    })
  }

  
  //appending the questions list rendered to screen based on searchbar input
  //once the input term reaches 3 characters of length it will filter down questions to only include questions with search term
  //if the input drops below 3 characters then the questions list will return back to normal
  handleChange(e) {
    let currentQuestions = this.props.questions;
    let filteredQuestions = [];
    if (e.currentTarget.value.length > 2) {
      //if the user collapses all questions (hides question list) but then tries to search through questions
      //this if-conditional will reset the question quantity back to default first so questions will display automatically when searching
      if (this.state.quantity === 0) {
        this.setState({
          quantity: 4
        })
      }
      filteredQuestions = currentQuestions.filter(question => {
        const lcQuestion = question.question_body.toLowerCase();
        const SearchTerm = e.currentTarget.value.toLowerCase();
        return lcQuestion.includes(SearchTerm);
      })
      this.setState({
        filtered: filteredQuestions
      })
    } else {
      this.setState({
        filtered: currentQuestions
      })
    }
  }
  
  voteHelpful(e) {
    if(!this.state.voted && this.isMounted) {
      // send put request to increase helpfulness for a specific answer
      let questionId = e.currentTarget.value;
      let config = {
        method: 'put',
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/qa/questions/${questionId}/helpful`,
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
  
  reportQuestion(e) {
    if(!this.state.reported && this.isMounted) {
      let questionId = e.target.value;
      // send put request to report a specific answer
      let config = {
        method: 'put',
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/qa/questions/${questionId}/report`,
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
    if (this.isMounted) {
      this.setState({
        filtered: this.props.questions
      });
    }
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  //deprecated method - consider refactoring during optimization phase
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      filtered: nextProps.questions
    });
  }

  render() {
    const {questions} = this.props;
    return (<div id="questionsList">
      <input style={{'width': '300px'}} type="text" placeholder={`Have a question? Search (${questions.length}) questions asked...`} onChange={this.handleChange}/>
      {this.state.filtered.sort((a, b) => a.question_helpfulness < b.question_helpfulness).map((question, i) => {
        //after filtering questions by search term (optionally) and then by helpfulness ratings
        //render only questions that will stay under the current quantity cap that can only be increased when a user clicks "show more"
        if (i < this.state.quantity) {
          return (
          <ul key={`question_${question.question_id}`}>
            <span style={{'fontWeight': 'bold', 'fontSize': '16'}}>
              {`Q: ${question.question_body}`}
            </span>
            <br></br>
            <span>
              <Button onClick={this.voteHelpful} value={question.question_id} size="small" color="primary">Helpful? Yes ({question.question_helpfulness})</Button>
              <Button onClick={this.reportQuestion} value={question.question_id} size="small" color="secondary">Report</Button>
              <AnswerForm questionBody={question.question_body}/>
            </span>
            <AnswersList question={question}/>
          </ul>
          )
        }
        if (i === this.state.quantity) {
          //render a button to show more questions once the limit is reached for quantity of questions to show in list
          return (<div key={`questionListEndButtons_${question.question_id}`}>
          <Button onClick={this.moreQuestions} variant="outlined" size="small">Show more answered questions</Button>
          <Button onClick={this.collapseQuestions} variant="outlined" size="small">Show less questions</Button>
          <Button onClick={this.hideAllQuestions} variant="outlined" size="small">Hide all questions</Button>
          </div>)
        }
      })}
    </div>)
  }
}
