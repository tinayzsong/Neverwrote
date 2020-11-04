const _ = require('lodash');
const api = require('../helpers/api');

const initialState = {
  numberOfNotebooks : 0,
  numberOfNotes : 0,
  oldestNotebook : {},
  recentlyUpdatedNote : {}
};

const reducer = (state, action) => {
  state = state || initialState;
  action = action || {};
  switch(action.type) {
    case "UPDATE_STATS":
      return Object.assign({}, state, { 
        numberOfNotebooks : action.numberOfNotebooks,
        numberOfNotes : action.numberOfNotes,
        oldestNotebook : action.oldestNotebook,
        recentlyUpdatedNote : action.recentlyUpdatedNote
      })
    default: return state;
  }
}
const getStatistics = () => {
  return (dispatch) => {
    api.get('/stats').then(data => {
      dispatch({ 
        type : "UPDATE_STATS", 
        numberOfNotebooks : data.numberOfNotebooks, 
        numberOfNotes : data.numberOfNotes, 
        oldestNotebook : data.oldestNotebook, 
        recentlyUpdatedNote : data.recentlyUpdatedNote 
      });
    }).catch(err => {
      console.log(err);
    })
  }
}

module.exports = {
  statistics : reducer,
  getStatistics
};