/* Still to do:
modal/form submission handling -> (gather user inputs upon submission and pass into an axios POST request, then refresh list after POST finishes)
refresh "helpfulness Yes (2)" button when clicked/voted on a question or answer that the user found helpful
remove question or answer when its reported (refresh questions list)
fix the "show less questions" and "hide questions" coding logic so they don't dissapear when questions list rendered reach max limit of questions available
max height of questions and answer list (maybe make list scrollable and set a max height of entire component)
sorting answers rendered under each question by the answer's helpfulness 
*/
import React from 'react';
import axios from 'axios';
import access from '../../../../config.js';
import QuestionForm from './QuestionForm.jsx';
import QuestionsList from './QuestionsList.jsx';

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
        },
        params: {
          'count': 10000
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
        <QuestionsList questions={questions} />
        {/* Need to pass in current product name to question form as props to be used within the modal form pop up for adding a  question */}
        <QuestionForm productId={this.props.productId}/>
      </>
    )
  }
}
