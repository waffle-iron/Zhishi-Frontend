'use strict';
// jest.autoMockOff();
jest.unmock('object-assign');
jest.unmock('../../../stores/AnswerStore');
jest.unmock('../../../stores/QuestionStore');
jest.unmock('../../../components/answers/Index.react');
jest.unmock('../../../utils/Common');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import AllAnswers from '../../../components/answers/Index.react';
import AnswerStore from '../../../stores/AnswerStore';
import QuestionStore from '../../../stores/QuestionStore';
import Common from '../../../utils/Common';

describe('AllAnswers', () => {
  beforeEach(() => {
    window.$ = {
      isEmptyObject() {
        return false;
      }

    };
    window.Prism = {
      highlightAll() {
        return false;
      }

    };
  });

  it('It should render 1 answer component on single value', () => {
    spyOn(AnswerStore, 'getAnswers').and.returnValue({answers: 'hellow'});
    const answers = TestUtils
      .renderIntoDocument(< AllAnswers question_id = "1" / >);
    var content = TestUtils
      .findRenderedDOMComponentWithClass(answers, 'content');
    expect(content.textContent).toEqual('1 Answer');
  });
  it('It should render  answers component on multipe value', () => {
    spyOn(AnswerStore, 'getAnswers').and
      .returnValue({answers: 'hellow', sometingelse: 'someting else'});
    const answers = TestUtils
      .renderIntoDocument(< AllAnswers question_id = "1" / >);
    var content = TestUtils
      .findRenderedDOMComponentWithClass(answers, 'content');
    expect(content.textContent).toEqual('2 Answers');
  });
  it('It Should call commonn and prism on initAnswersComponet call', () => {
    spyOn(Common, 'initTinyMceContent');
    spyOn(window.Prism, 'highlightAll');
    const answers = TestUtils
      .renderIntoDocument(< AllAnswers question_id = "1" / >);
    answers.initAnswersComponent();
    expect(Common.initTinyMceContent).toHaveBeenCalled();
    expect(window.Prism.highlightAll).toHaveBeenCalled();
  });

  it('It should render  No answer on empty keys', () => {
    spyOn(AnswerStore, 'getAnswers').and.returnValue({});
    // Render a checkbox with label in the document
    const answers = TestUtils
      .renderIntoDocument(< AllAnswers question_id = "1" / >);
    var content = TestUtils
      .findRenderedDOMComponentWithClass(answers, 'content');
    expect(content.textContent).toEqual('No Answers');
  });
  it('it should call set state on __onChange fire', () => {
    spyOn(AnswerStore, 'getAnswers').and
      .returnValue({answers: 'hellow', sometingelse: 'someting else'});
    spyOn(AnswerStore, 'removeChangeListener').and
      .returnValue({answers: 'hellow', bind: function() {}});
    spyOn(QuestionStore, 'removeChangeListener').and
      .returnValue({answers: 'hellow', bind: function() {}});
    const answers = TestUtils
      .renderIntoDocument(< AllAnswers question_id = "1" / >);
    spyOn(answers, 'setState');
    answers._onChange();
    expect(answers.setState).toHaveBeenCalled();
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(answers).parentNode);
  });
  it('It should render  on undefined', () => {
    spyOn(AnswerStore, 'getAnswers').and.returnValue(false);
    const answers = TestUtils
      .renderIntoDocument(< AllAnswers question_id = "1" / >);
    var content = TestUtils
      .findRenderedDOMComponentWithClass(answers, 'content');
    expect(content.textContent).toEqual('No Answers');
  });
});
