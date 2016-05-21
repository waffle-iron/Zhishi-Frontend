import React from 'react';
import QuestionActions from '../../actions/QuestionActions';
import webAPI from '../../utils/webAPI'

class DeleteButton extends React.Component {
  constructor(props) {
    super(props)
  }

  deleteQuestion() {
    webAPI.processRequest(`/questions/${this.props.id}`, 'DELETE', '',  QuestionActions.deleteQuestion);
  }

  render() {
    return (
      <a href="#" className="item modalShow" onClick={this.deleteQuestion.bind(this)}>delete</a>
    )
  }
}

export default DeleteButton;
