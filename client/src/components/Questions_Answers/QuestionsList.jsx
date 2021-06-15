import React from 'react';
import AnswersList from './AnswersList.jsx';
import AnswerForm from './AnswerForm.jsx';

export default class QuestionsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 4
    }
    this.moreQuestions = this.moreQuestions.bind(this);
  }

  moreQuestions () {
    this.setState({
      quantity: this.state.quantity + 2
    })
  }
  
  render() {
    const {questions} = this.props;
    return (<>
        {questions.sort((a, b) => a.question_helpfulness < b.question_helpfulness).map((question, i) => {
          if (i < this.state.quantity) {
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
          } else if (i === this.state.quantity + 1) {
            return (<button key={`loadQuestions_${question.question_id}`} onClick={this.moreQuestions}>Load more answered questions</button>)
          }
        })}
    </>)
  }
}
