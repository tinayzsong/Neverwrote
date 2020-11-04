const _ = require('lodash');
const api = require('../helpers/api');
const UPDATE = 'myapp/UPDATE';
const CREATE = 'myapp/CREATE';
const DELETE = 'myapp/DELETE';
const SHOW = 'myapp/SHOW';
const DELETEN = 'myapp/DELETEN';
const CREATEN = 'myapp/CREATEN';
const SEARCHED = 'myapp/SEARCHED';
const RESETNOTE = 'myapp/RESETNOTE';
const RESETNOTEBOOK ='myapp/RESETNOTEBOOK';

const initialState = {
  notebooks: [
    { id: 100, 
      title: 'From Redux Store: A hard-coded notebook' 
    },
    { id: 101, 
      title: 'From Redux Store: Another hard-coded notebook' 
    },
  ],
  activeNotebookId: -1,
  notes:[],
  activeNoteId: -1,
  searchedNotes:[],
};

reducer = (state, action) => {
  state = state || initialState;
  action = action || {};
  switch(action.type) {
    case UPDATE: {
      return Object.assign({}, state, { 
        activeNotebookId:action.notebookId,
        notes: action.notes, 
        activeNoteId: -1}
        );
    }
    case RESETNOTE: {
      return Object.assign({}, state, { activeNoteId: -1});
    }
    case RESETNOTEBOOK:{
       return Object.assign({}, state, { activeNotebookId:-1});
    }
    case CREATE: {
      const unsortedNotebooks = _.concat(state.notebooks,action.notebook);
      const notebooks = _.orderBy(unsortedNotebooks, 'createdAt', 'desc');
      return _.assign({}, state, {notebooks});
    }case DELETE: {
      const newState = _.clone(state);
      newState.notebooks = _.reject(state.notebooks, {id:action.notebookId});
      return newState;
    }
    case SHOW:{
      return Object.assign({}, state, {activeNoteId:action.noteId});
    }
    case DELETEN:{
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
      const notebooks = action.tempNotebooks;
      return _.assign({},state,{searchedNotes});
    }
    default: return state;
  }
}
reducer.loadNotes = notebookId => {
  return dispatch => {
    api.get('/notebooks/' + notebookId + '/notes')
      .then(notes => {
        dispatch({
          type: UPDATE, 
          notebookId, 
          notes
        })
      })
  }
}
reducer.loadNoteContent = noteId => {
  return dispatch => {
    api.get('/notes/'+noteId)
      .then(note => {
        dispatch({type:SHOW, noteId})
    })
  }
}
reducer.resetNote = () => {
  return(dispatch) => {
    dispatch({type:RESETNOTE})
  }
}
reducer.resetNotebook = () => {
  return(dispatch) => {
    dispatch({type:RESETNOTEBOOK})
  }
}
reducer.deleteNotebook = notebookId => {
  return dispatch => {
    api.delete('/notebooks/'+notebookId)
      .then((notebook)=> {
        dispatch({type: DELETE, notebookId})
      })
  }
}
reducer.createNotebook = (newNotebook, cb) => {
  return dispatch => {
    api.post('/notebooks', newNotebook)
      .then(notebook => {
        dispatch({type: CREATE, notebook});
      });
  }
}
reducer.createNote = (newNote, cb) => {
  return dispatch => {
    api.post('/notes',newNote)
      .then(note => {
        dispatch({type:CREATEN, note});
      });
  }
}
reducer.deleteNote = noteId => {
  return dispatch => {
    api.delete('/notes/'+noteId)
      .then(note => {
        dispatch({type:DELETEN, noteId})
    })
  }
}
reducer.onSearchNotes = phrase => {
  return dispatch => {
    api.get('/search/notes/' + phrase)
      .then(notes => {
        const tempNotebooks = []
             notes.map(note => {
                api.get('/notebooks/' + note.notebookId)
                  .then(notebook => {
                    tempNotebooks.push(notebook);
                  }) 
            })
            dispatch({type:SEARCHED, tempNotebooks, notes })
        })
      }
    }
module.exports = reducer;