import React from 'react'
import Header from '../layouts/Header.react'
import Footer from '../layouts/Footer.react'
import Sidebar from '../layouts/Sidebar.react'
import UserActions from '../../actions/UserActions.js'
import UserStore from '../../stores/UserStore.js'
import AuthStore from '../../stores/AuthStore.js'
import webAPI from '../../utils/webAPI.js'
import QuestionStore from '../../stores/QuestionStore.js'
import TagStore from '../../stores/TagStore.js'
import TagActions from '../../actions/TagActions.js'
import QuestionsList from '../questions/QuestionsList.react'
import ZhishiInit from '../../utils/ZhishiInit'


function getHomeState(){
  return {
    questions: QuestionStore.getQuestions(),
    top_questions: QuestionStore.getTopQuestions(),
    current_user: AuthStore.getCurrentUser(),
    should_fetch: QuestionStore.shouldFetchQuestions(),
    current_page: QuestionStore.getCurrentPage()
  }
}


function getUserState(user_id){
  if (user_id && !UserStore.getUser(user_id)) {
    webAPI.processRequest(`/users/${user_id}`, 'GET', null, UserActions.receiveUser);
  }
  return {
    user: UserStore.getUser(user_id),
    current_user: AuthStore.getCurrentUser()
  }
}

class Show extends React.Component {
  constructor(props, context){
    super(props);
    this.state = getUserState(props.user_id);
  }
  componentWillMount() {
    ZhishiInit.getQuestions();
    webAPI.processRequest(`/users/${this.props.user_id}/tags`, "GET", null, (data) => {
      debugger;
      TagActions.receiveUserTags(data.tags);
    });
  }
  componentDidMount(){
    QuestionStore.addChangeListener(this._onChange.bind(this));
    UserStore.addChangeListener(this._onChange.bind(this));
    // TagStore.addChangeListener(this._onChange.bind(this));
  }
  componentWillUnmount(){
    UserStore.removeChangeListener(this._onChange).bind(this);
  }
  _onChange() {
    this.setState(getUserState(this.props.user_id))
    this.setState(getHomeState());

  }
  render(){
    let current_user = this.state.current_user;
    let user = this.state.user || {};
    return (
      <div className="main-wrapper">
        <Header />

        <main className="ui container main">
          <div className="ui stackable grid">

              <div className="five wide column">
                <div className="ui card user">
                  <div className="image">
                    <img src={current_user.image || "/assets/img/profile.jpg"} alt="Profile" />
                  </div>

                  <div className="content">
                    Reputation: {current_user.points}
                  </div>
                </div>
              </div>

              <div className="seven wide column">
                <h2>
                  {current_user.name}
                </h2>
                <div className="ui card profile-tags">
                  <div className="content">
                    <div className="column tag-buttons">
                    <button className="ui button subscribed">Subscribed tags
                    </button>
                    <button className="ui primary button addmore">
                    Add more
                    </button>
                    </div>
                    <div className="column tag-buttons">
                    <button className="ui button">Amity </button>
                    <button className="ui button">Amity </button>
                    <button className="ui button">Amity </button>
                    <button className="ui button">Amity </button>
                    <button className="ui button">Amity </button>
                    <button className="ui button">Amity </button>
                    <button className="ui button">Amity </button>
                    <button className="ui button">Amity </button>
                    </div>
                  </div>
                </div>
              </div>
            <aside className="four wide computer only column">
              <div className="sidebar wide column row">
              <h2 className="headers"> Settings</h2>
              <div className="ui divider"></div>
                <div className="ui grid two column row settings">
                <div className="column">
                <label>Notifications: </label>
                </div>
                <div className="column">
                  <div className="ui test toggle checkbox">
                    <input type="checkbox" checked="checked"/>
                    <label></label>
                  </div>
                  </div>
                </div>
              <div className="ui divider"></div>
              <div className="ui grid  two column row settings">
                <div className="column">
                <label>Newsletter: </label>
                </div>
                <div className="column">
                  <div className="ui test toggle checkbox">
                    <input type="checkbox" checked="checked"/>
                    <label></label>
                  </div>
                  </div>
                </div>
                <div className="ui divider"></div>

              </div>
              </aside>


          </div>
         <div className="ui divider"></div>

          <div className="ui grid">
            <div className="sixteen wide tablet twelve wide computer column">
              <h2>Top Questions</h2>
          <QuestionsList questions={this.state.questions} current_page={1} />
          </div>
          </div>

        </main>
        <Footer />

      </div>
    )
  }
}

module.exports = Show;
