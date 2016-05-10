import BaseStore from './BaseStore';
import ZhishiConstants from '../constants/ZhishiConstants';
import CVar from '../config/CookieVariables.js';

class AuthStore extends BaseStore {
  constructor() {
    super();
    this.subscribe(() => this._registerActions.bind(this));
    this._shown_form = 'login';
    this._error_msg = '';
    this.user = null;
  }
  setShownForm(text) {
    this._shown_form = text;
  }
  currentUser() {
    let currentUser =  $.cookie(CVar.current_user) || {};
    return typeof currentUser === 'object' ? currentUser : this.parseUser(currentUser);
  }
  getCurrentUser() {
    debugger;
    return this.currentUser();
  }

  getCurrentUserToken() {
    return this.userToken();
  }

  getErrorMessage(){
    var _msg = _error_msg;
    _error_msg = "";
    return _msg;
  }

  userLoggedIn() {
    return $.cookie(CVar.user_logged_in);
  }
  userToken() {
    return this.currentUser().api_key;
  }
  setCurrentUser(user) {
    debugger;
    let cookieMeta = this.getCookieMeta();
    this.user = (typeof user === 'object') ? JSON.stringify(user) : user;
    $.cookie(CVar.current_user, user, cookieMeta);
    $.cookie(CVar.user_logged_in, (this.userToken() !== undefined), cookieMeta);
  }
  setErrorMessage() {
    this._error_msg = 'Invalid details. Please cross-check';
  }
  setUserLoginStatus(status) {
    $.cookie(CVar.user_logged_in, status);
  }

  logoutUser() {
    $.removeCookie(CVar.current_user);
    $.removeCookie(CVar.user_logged_in);
  }
  update(id, updates) {
    this._users[id] = Object.assign({}, this._users[id], updates);
  }
  updateAll(updates) {
    for (var id in this._users) {
      if ({}.hasOwnProperty.call(this._users, id)) {
        this.update(id, updates);
      }
    }
  }
  parseUser(user) {
    return typeof user === 'object' ? user : this.parseUser(JSON.parse(user));
  }
  getCookieMeta() {
    var currentDate = new Date();
    var expirationDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1,
      0, 0, 0);
    return {path: '/', expires: expirationDate};
  }
  _registerActions(action) {
    switch (action.actionType) {

      case ZhishiConstants.AUTH_FORM_SELECTED:
        this.setShownForm(action.data);
        this.emitChange();
        break;

      case ZhishiConstants.AUTH_LOG_IN:
        if (!this.userLoggedIn() && action.data) {
          this.setCurrentUser(action.data);
          this.emitChange();
        }
        break;

      case ZhishiConstants.CURRENT_USER_UPDATE:
        this.setCurrentUser(action.data);
        this.emitChange();
        break;

      case ZhishiConstants.AUTH_LOG_IN_ERROR:
        this.setErrorMessage(action._error);
        this.emitChange();
        break;

      case ZhishiConstants.AUTH_LOG_OUT:
        this.logoutUser();
        this.emitChange();
        break;
      default:
    }
  }
}

export default new AuthStore();
// import AppDispatcher from '../dispatcher/AppDispatcher';
// import { EventEmitter } from 'events'
// import ZhishiConstants from '../constants/ZhishiConstants';
// import assign from 'object-assign';
// import CVar from "../config/CookieVariables.js";

// var CHANGE_EVENT = 'change';

// let _shown_form = "login", _error_msg = "";
// function setShownForm(text) {
//   _shown_form = text;
// }

// function setCurrentUser(user) {
//   let cookie_meta = get_cookie_meta();
//   user = (typeof user === 'object') ? JSON.stringify(user) : user
//   $.cookie(CVar.current_user, user, cookie_meta);
//   $.cookie(CVar.user_logged_in, (userToken() ? true : false), cookie_meta);
// }

// function userToken(){
//   return currentUser().api_key
// }

// let currentUser = () => {
//   let current_user =  $.cookie(CVar.current_user) || {}
//   return typeof current_user === 'object'
//           ? current_user
//           : parseUser(current_user)
// }

// let parseUser = (user) => {
//   return typeof user === 'object'
//   ? user
//   : parseUser( JSON.parse(user) )
// }

// function setErrorMessage(_error) {
//   _error_msg = "Invalid details. Please cross-check";
// }

// function setUserLoginStatus(status){
//   $.cookie(CVar.user_logged_in, status);
// }

// function update(id, updates) {
//   _users[id] = assign({}, _users[id], updates);
// }

// function updateAll(updates) {
//   for (var id in _users) {
//     update(id, updates);
//   }
// }

// function logoutUser() {
//   $.removeCookie(CVar.current_user);
//   $.removeCookie(CVar.user_logged_in);
// }


// function get_cookie_meta(){
//   var currentDate = new Date();
//   var expirationDate = new Date(
//     currentDate.getFullYear(),
//     currentDate.getMonth(),
//     currentDate.getDate()+1,
//     0, 0, 0);
//   return {path: '/', expires: expirationDate}
// }

// var AuthStore = assign({}, EventEmitter.prototype, {

//   getShownForm: function() {
//     return _shown_form;
//   },

//   getCurrentUser: function() {
//     return currentUser()
//   },

//   getCurrentUserToken: function() {
//     return userToken();
//   },

//   getErrorMessage: function(){
//     var _msg = _error_msg
//     _error_msg = "";
//     return _msg;
//   },

//   userLoggedIn: function() {
//     return $.cookie(CVar.user_logged_in) ;
//   },

//   emitChange: function() {
//     this.emit(CHANGE_EVENT);
//   },

//   addChangeListener: function(callback) {
//     this.on(CHANGE_EVENT, callback);
//   },

//   removeChangeListener: function(callback) {
//     this.removeListener(CHANGE_EVENT, callback);
//   }
// });

// AuthStore.dispatchToken = AppDispatcher.register(function(action) {
//   switch(action.actionType) {

//     case ZhishiConstants.AUTH_FORM_SELECTED:
//       setShownForm(action.data);
//       AuthStore.emitChange();
//       break;

//     case ZhishiConstants.AUTH_LOG_IN:
//       if (!AuthStore.userLoggedIn() && action.data) {
//         setCurrentUser(action.data);
//       }
//       break;

//     case ZhishiConstants.CURRENT_USER_UPDATE:
//       setCurrentUser(action.data)
//       AuthStore.emitChange();
//       break;

//     case ZhishiConstants.AUTH_LOG_IN_ERROR:
//       setErrorMessage(action._error)
//       AuthStore.emitChange();
//       break;

//     case ZhishiConstants.AUTH_LOG_OUT:
//       logoutUser();
//       break;

//     default:
//       // nothing for now
//   }
// });

// module.exports = AuthStore;
