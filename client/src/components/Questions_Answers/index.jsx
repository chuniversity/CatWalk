import React from 'react';
import axios from 'axios';
import access from '../../../../config.js';
import QuestionForm from './QuestionForm.jsx';
import QuestionsList from './QuestionsList.jsx';
import { Typography, Container } from '@material-ui/core';

export default class Questions_Answers extends React.Component {
  isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      answers: [],
      questionId: 0,
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
      <Container >
        <br></br>
        <Typography variant="h5">Questions and Answers</Typography>
        <QuestionsList questions={questions} productName={this.props.productName}/>
        {/* Need to pass in current product name to question form as props to be used within the modal form pop up for adding a  question */}
        <br></br>
        <QuestionForm productId={this.props.productId} productName={this.props.productName}/>
        <br></br>
      </Container>
    )
  }
}
