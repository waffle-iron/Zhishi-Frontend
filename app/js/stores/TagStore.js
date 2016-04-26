import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import ZhishiConstants from '../constants/ZhishiConstants';
import assign from 'object-assign';
import Common from '../utils/Common.js';

var CHANGE_EVENT = 'change';

var _tags = {}, _selected_tags = [], _tags_loaded = false;

const loadTags = (tags=[]) => {
  tags.forEach(tag => update(tag))
  _tags_loaded = true;
}

const update = (tag) => {
  Common.update(_tags, tag.id, tag);
}

const selectTagForSubscription = (tag) => {
  if (tag && _tags[tag.id]) {
    let status = _tags[tag.id]['status'] == 'selected' ? '' : 'selected'
    assign(_tags[tag.id], { status } );
    updateSelectedTag(tag.name);
  }
}

const updateSelectedTag = (tag_name) => {
  let index = _selected_tags.indexOf(tag_name);
  if (index == -1) {
    _selected_tags.push(tag_name)
  } else {
    _selected_tags.splice(index, 1);
  }
}

const updateBatchTags = (tags=[]) => {
  tags.forEach(tag => {
    Common.update(_tags, tag.id, tag);
    selectTagForSubscription(tag)
  })
}

var CHANGE_EVENT = 'change';

var userTags = [];

let loadUserTags = results => {
  console.log(results);
  userTags = results.reverse();
};

var TagStore = assign({}, EventEmitter.prototype, {

  getAllTags: function() {
    return _tags;
  },

  getSelectedTags: function() {
    return _selected_tags;
  },

  tags_loaded: function() {
    return _tags_loaded;
  },
  getUserTags: function() {
    return userTags;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

TagStore.dispatchToken = AppDispatcher.register(function(action) {
  switch (action.actionType) {
    case ZhishiConstants.TAG_INDEX:
      if (action.data) {
        loadTags(action.data.tags);
      }
      TagStore.emitChange();
      break;

    case ZhishiConstants.TAG_SELECT:
      if (action.data) {
        loadTags(action.data.tags);
      }
      TagStore.emitChange();
      break;

    case ZhishiConstants.TAG_SELECT_FOR_SUBSCRIPTION:
      if (action.data) {
        selectTagForSubscription(action.data);
      }
      TagStore.emitChange();
      break;

    case ZhishiConstants.TAG_BATCH_UPDATE:
      if (action.data) {
        updateBatchTags(action.data);
      }
      TagStore.emitChange();
      break;

    default:
      break;
    case ZhishiConstants.RECEIVE_USER_TAGS:
      if (action.data) {
        loadUserTags(action.data);
      }
      TagStore.emitChange();
      break;

  }
});

export default TagStore;
