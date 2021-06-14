import React from 'react';
import axios from 'axios';
import access from '../../../../config.js';
import QuestionForm from './QuestionForm.jsx';
import QuestionsList from './QuestionsList.jsx';

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

/********************  search bar section
// import SearchBar from "material-ui-search-bar";
<SearchBar
    value={this.state.value}
    onChange={(newValue) => this.setState({ value: newValue })}
    onRequestSearch={() => doSomethingWith(this.state.value)}
  />
  SearchBar Properties
Name	Type	Default	Description
cancelOnEscape	bool		Whether to clear search on escape
classes*	object		Override or extend the styles applied to the component.
className	string	''	Custom top-level class
closeIcon	node	<ClearIcon style={{ color: grey[500] }} />	Override the close icon.
disabled	bool	false	Disables text field.
onCancelSearch	func		Fired when the search is cancelled.
onChange	func		Fired when the text value changes.
onRequestSearch	func		Fired when the search icon is clicked.
placeholder	string	'Search'	Sets placeholder text for the embedded text field.
searchIcon	node	<SearchIcon style={{ color: grey[500] }} />	Override the search icon.
style	object	null	Override the inline-styles of the root element.
value	string	''	The value of the text field.
**********************/

/************
GET /qa/questions Retrieves a list of questions for a particular product.
This list does not include any reported questions.
{
  "product_id": "5",
  "results": [{
        "question_id": 37,
        "question_body": "Why is this product cheaper here than other sites?",
        "question_date": "2018-10-18T00:00:00.000Z",
        "asker_name": "williamsmith",
        "question_helpfulness": 4,
        "reported": false,
        "answers": {
          68: {
            "id": 68,
            "body": "We are selling it here without any markup from the middleman!",
            "date": "2018-08-18T00:00:00.000Z",
            "answerer_name": "Seller",
            "helpfulness": 4,
            "photos": []
            // ...
          }
        }
      },
      {
        "question_id": 38,
        "question_body": "How long does it last?",
        "question_date": "2019-06-28T00:00:00.000Z",
        "asker_name": "funnygirl",
        "question_helpfulness": 2,
        "reported": false,
        "answers": {
          70: {
            "id": 70,
            "body": "Some of the seams started splitting the first time I wore it!",
            "date": "2019-11-28T00:00:00.000Z",
            "answerer_name": "sillyguy",
            "helpfulness": 6,
            "photos": [],
          },
          78: {
            "id": 78,
            "body": "9 lives",
            "date": "2019-11-12T00:00:00.000Z",
            "answerer_name": "iluvdogz",
            "helpfulness": 31,
            "photos": [],
          }
        }
      },
      // ...
  ]
}
*******/

/* question list backup - to delete later
  <div id="questions">
            {questions.map((question, i) => {
              if (i < 4) {
                return (
                <ul key={question.question_id}>
                  <span style={{'fontWeight': 'bold'}}>
                    {`Q: ${question.question_body}`}
                  </span>
                  <br></br>
                  <span style={{'fontStyle': 'italic'}}>
                    {`Helpful?  Yes (${question.question_helpfulness})  |  `}<AnswerForm/>
                  </span>
                  <AnswersList question={question}/>
                </ul>
                )
              }
            })}
            {(questions.length > 4) ? <button onClick={console.log('click - load more questions\n TODO: when button is pressed, display more questions from list of questions for product')}>Load more answered questions</button> : null}
          </div>
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
            questions: questions.data.results,
            displayAnswers: !this.state.displayAnswers
          })
        }
      })
      .catch(err => console.error(err))
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
  
        {/* <SearchBar
          placeholder='Search questions and answers...'
          onChange={(newValue) => 'this.setState({ value: newValue })'}
          onRequestSearch={() => 'doSomethingWith(this.state.value)'}
        /> */}
        <QuestionsList questions={questions}/>
        <QuestionForm />
      </>
    )
  }
}

