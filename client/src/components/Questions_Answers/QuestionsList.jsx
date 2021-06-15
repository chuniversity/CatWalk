import React from 'react';
import axios from 'axios';
import access from '../../../../config.js';
import AnswersList from './AnswersList.jsx';
import AnswerForm from './AnswerForm.jsx';

export default class QuestionsList extends React.Component {
  isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      quantity: 4,
      filtered: []
    }
    this.moreQuestions = this.moreQuestions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.voteHelpful = this.voteHelpful.bind(this);
    this.reportQuestion = this.reportQuestion.bind(this);
  }

  moreQuestions () {
    this.setState({
      quantity: this.state.quantity + 2
    })
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
  
  //appending the questions list rendered to screen based on searchbar input
  //once the input term reaches 3 characters of length it will filter down questions to only include questions with search term
  //if the input drops below 3 characters then the questions list will return back to normal
  handleChange(e) {
    let currentQuestions = this.props.questions;
    let filteredQuestions = [];
    if (e.target.value.length > 2) {
      filteredQuestions = currentQuestions.filter(question => {
        const lcQuestion = question.question_body.toLowerCase();
        const SearchTerm = e.target.value.toLowerCase();
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
      let questionId = e.target.value;
      // send put request to increase helpfulness for a specific answer
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
      console.log('helpful vote sent!');
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
  
  render() {
    const {questions} = this.props;
    return (<>
      <input
        type="text"
        placeholder="Search questions..."
        onChange={this.handleChange}
      />
      {this.state.filtered.sort((a, b) => a.question_helpfulness < b.question_helpfulness).map((question, i) => {
        //after filtering questions by search term (optionally) and then by helpfulness ratings
        //render only questions that will stay under the current quantity cap that can only be increased when a user clicks "show more"
        if (i < this.state.quantity) {
          return (
          <ul key={question.question_id}>
            <span style={{'fontWeight': 'bold'}}>
              {`Q: ${question.question_body}`}
            </span>
            <br></br>
            <span style={{'fontStyle': 'italic'}}>
              <button onClick={this.voteHelpful} value={question.question_id}>{`Helpful? Yes (${question.question_helpfulness})`}</button><button onClick={this.reportQuestion} value={question.question_id}>Report</button><AnswerForm/>
            </span>
            <AnswersList question={question}/>
          </ul>
          )
        } else if (i === this.state.quantity) {
          //render a button to show more questions once the limit is reached for quantity of questions to show in list
          return (<button key={`loadQuestions_${question.question_id}`} onClick={this.moreQuestions}>Load more answered questions</button>)
        }
      })}
    </>)
  }
}
