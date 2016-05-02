import QuestionActions from "../actions/QuestionActions.js";
import webAPI from "./webAPI.js";

module.exports = {
  getQuestions: function(page) {
    page = page || 1
    webAPI.processRequest("/questions", "GET", {page: page}, (data) => {
      console.log(data.questions);
      QuestionActions.receiveQuestions({questions: data.questions , page: page})
    });
  }
};
