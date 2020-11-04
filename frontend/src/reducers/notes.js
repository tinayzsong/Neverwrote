const _ = require('lodash');
const api = require('../helpers/api');
const DELETEN = 'myapp/DELETEN';
const CREATEN = 'myapp/CREATEN';
const SEARCHED = 'myapp/SEARCHED';
const RESETNOTE = 'myapp/RESETNOTE';
const SHOW = 'myapp/SHOW';
const initialState = {
  notes:[],
  activeNoteId: -1,
  searchedNotes:[],
};
reducer = (state, action) => {
  state = state || initialState;
  action = action || {};
  switch(action.type) {
    case RESETNOTE: {
      return Object.assign({}, state, { activeNoteId: -1});
    }
    case SHOW: {
      return Object.assign({}, state, {activeNoteId:action.noteId});
    }
    case DELETEN: {
        const newState = _.clone(state)
        newState.notes = _.reject(state.notes,{id:action.noteId});
        return newState;
    }
    case CREATEN: {
      const unsortedNotes = _.concat(state.notes, action.note);
      const notes = _.orderBy(unsortedNotes,'createdAt','desc');
      return _.assign({},state,{notes});
    }
    case SEARCHED: {
      const searchedNotes = action.notes;
      return _.assign({},state,{searchedNotes});
    }
    default: return state;
  }
}
reducer.loadNoteContent = noteId => {
  return(dispatch) => {
    api.get('/notes/'+noteId)
        .then(() => {
            dispatch({type:SHOW, noteId})
        })
  }
}
reducer.resetNote = () => {
  return(dispatch) => {
    dispatch({type:RESETNOTE})
  }
}
reducer.createNote = (newNote, cb) => {
  return dispatch => {
    api.post('/notes',newNote)
        .then((note) => {
            dispatch({type:CREATEN, note});
    });
  }
}
reducer.deleteNote = noteId => {
  return dispatch => {
    api.delete('/notes/'+noteId).then((note) => {
      dispatch({type:DELETEN, noteId})
    })
  }
}
reducer.onSearchNotes = phrase => {
    return dispatch => {
        api.get('/search/notes/' + phrase).then((notes) => {
            const tempNotebooks = []
            notes.map((note) => {
                api.get('/notebooks/'+note.notebookId).then((notebook) => {
                    tempNotebooks.push(notebook);
                })
            })
            dispatch({type:SEARCHED, tempNotebooks, notes })
        })
    }
}
module.exports = reducer;