import React from 'react';
import axios from 'axios';
import access from '../../../../config.js';
import QuestionForm from './QuestionForm.jsx';
// import QuestionsList from './QuestionsList.jsx';

/*
Title - Questions & Answers
Search bar - searches through questions and answers for string input matches
Question container/component section
  Needs to show first/top question that will prioritize the top/first question shown in the following order
    1. question/answer with highest relevancy based on search term
    2. Then sorted by most helpful
    3. Bonus idea would be drop down filter for sorting criteria based on relevancy, newest, or most helpful
  Question "Q: ..." Helpful? Yes (25) | Add Answer
  Answer Segments "A: ..."
    Answer tag at time of answering: "by user1234, January 1, 2019 | Helpful? Yes (2) | Report"
    Potential photos: "as you can see in these photos: [photos previously uploaded displayed here]"
    Button for "load more answers"
Button for "more answered questions"
Button for "Add a question +"
*/

export default class Questions_Answers extends React.Component {
  isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      answers: [],
      questionId: 0
    }
    this.getQuestions = this.getQuestions.bind(this);
  }

  getQuestions() {
    axios
      .get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/qa/questions/?product_id=${this.props.productId}`, {
        headers: {
          'Authorization': access.token
        }
      })
      .then(questions => {
        if (this.isMounted) {
          this.setState({
            questions: questions.data.results
          })
        }
      })
  }

  componentDidMount() {
    this.isMounted = true;
    this.getQuestions()
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  render() {
    const {questions, answers} = this.state;
    return (
      <>
        <h2>Questions and Answers</h2>
        {/* <QuestionsList questions={questions} /> */}
        <QuestionForm />
      </>
    )
  }
}

