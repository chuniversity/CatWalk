import React from 'react';
import SearchBar from "material-ui-search-bar";

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

//props needed?
const Questions_Answers = () => {
  return (
    <div>
      <h2>Questions and Answers</h2>
      <SearchBar
        placeholder='Search questions and answers...'
        onChange={(newValue) => 'this.setState({ value: newValue })'}
        onRequestSearch={() => 'doSomethingWith(this.state.value)'}
      />
    </div>
  )
};

//if using props, make sure to leave prop requirements below as a helpful tip

export default Questions_Answers;