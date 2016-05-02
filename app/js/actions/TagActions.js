import AppDispatcher from '../dispatcher/AppDispatcher';
import ZhishiConstants from '../constants/ZhishiConstants';

let TagActions;

TagActions = {
  receiveTags: (tags) => {
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.TAG_INDEX,
      data: tags
    })
  },

  selectTagForSubscription: (tag) => {
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.TAG_SELECT_FOR_SUBSCRIPTION,
      data: tag
    })
  },

  updateBatchTags: (tags) => {
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.TAG_BATCH_UPDATE,
      data: tags
    })
  },
  receiveUserTags: function(data) {
    AppDispatcher.dispatch({
      actionType: ZhishiConstants.RECEIVE_USER_TAGS,
      data: data
    });
  }
}
export default TagActions;
