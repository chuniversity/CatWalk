import React from 'react';
import SearchBar from "material-ui-search-bar";
// import axios from 'axios';

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

//GET '/qa/questions' below assumes this.state has 'questions' property wiith an empty array waiting to be populated
axios.get('/qa/questions')
  .then(questions => {
    this.setState({
      questions: questions.results
    })
  })
  .catch(err => console.error(err))

***********/


let questions = [{
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



//props needed?
const Questions_Answers = () => {
  // const {questions} = this.state || props;
  
  return (
    <div>
      <h2>Questions and Answers</h2>
      <SearchBar
        placeholder='Search questions and answers...'
        onChange={(newValue) => 'this.setState({ value: newValue })'}
        onRequestSearch={() => 'doSomethingWith(this.state.value)'}
      />
      <div id="questions">
        {/*
        List of questions/answers:
        Needs to show first/top question that will prioritize the top/first question shown in the following order
          1. question/answer with highest relevancy based on search term
          2. Then sorted by most helpful
          3. Bonus idea would be drop down filter for sorting criteria based on relevancy, newest, or most helpful
        Question "Q: ..." Helpful? Yes (25) | Add Answer
        Answer Segments "A: ..."
          Answer tag at time of answering: "by user1234, January 1, 2019 | Helpful? Yes (2) | Report"
          Potential photos: "as you can see in these photos: [photos previously uploaded displayed here]"
          Button for "load more answers"
        */}
        {questions.map((question) => (
          /* each question will have following structure:
          {
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
          }*/
          <ul key={question.question_id}>
            <span style={{'fontWeight': 'bold'}}>
              {`Q: ${question.question_body}`}
            </span>
            <br></br>
            <span style={{'fontStyle': 'italic'}}>
              {`Helpful?  Yes (${question.question_helpfulness})  |  Add Answer`}
            </span>
            
            <span>
              {
              Object.entries(question.answers).map((answer) => (
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
                    {`**photos** ${answer[1].photos}`}
                  </span>
                </ul>
              ))
              }
            </span>
            
          </ul>
        ))}
      </div>
    </div>
  )
};

//if using props, make sure to leave prop requirements below as a helpful tip

export default Questions_Answers;