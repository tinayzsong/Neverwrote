const _ = require('lodash');
const api = require('../helpers/api');

// Action type constants
const INSERT = 'frontend/notebooks/INSERT';
const CHANGE = 'frontend/notebooks/CHANGE';
const REMOVE = 'frontend/notebooks/REMOVE';
const UPDATE = 'frontend/notebooks/UPDATE';
const SETNOTEBOOK = 'frontend/notebooks/SETNOTEBOOK';

// The initial state of notebook data
const initialState = {
  visibleNotebooks: [
    {
      activeNotebookId: -1,
      activeNote: null,
      notes: [],
    }

  ]
};

// Function which takes the current data state and an action,
// and returns a new state
function reducer(state, action) {
  state = state || initialState;
  action = action || {};

  switch(action.type) {

 // Inserts new notebook into the local store
    case INSERT: {

      const unsortedNotebooks = _.concat(state.visibleNotebooks, action.notebooks);

      const visibleNotebooks = _.orderBy(unsortedNotebooks, 'createdAt','desc');

      // Return updated state
      return _.assign({}, state, { visibleNotebooks} );
    }


    // Removes a single notebook from the visible notebook list
    case REMOVE: {
      const visibleNotebooks = _.reject(state.visibleNotebooks, {id: action.id});
      return _.assign({}, state, { visibleNotebooks });
    }

      // Changes a single notebook's data in the local store
    case CHANGE: {
      const visibleNotebooks = _.clone(state.visibleNotebooks);
      const changedIndex = _.findIndex(state.visibleNotebooks, {id: action.notebook.id })
      visibleNotebooks[changedIndex] = action.notebook;
      return _.assign({}, state, { visibleNotebooks });
    }
     	case UPDATE: {
    	return Object.assign({}, state, { activeNotebookId: action.notebookId, notes: action.notes, activeNote: null });
    }

    case SETNOTEBOOK: {
      return _.assign({}, state, { activeNotebookId: action.notebookId, notes: action.notes });
    }




    default: return state;
  }
}

// Now we define a whole bunch of action creators

// Inserts notebooks into the notebook list
reducer.insertNotebooks = (notebooks) => {
  return { type: INSERT, notebooks };
};

// Attempts to create a notebook on the server and inserts it into the local notebook
// list if successful
reducer.createNotebook = (newNotebook, callback) => {
  return (dispatch) => {
    api.post('/notebooks', newNotebook).then((notebook) => {

      dispatch(reducer.insertNotebooks([notebook]));
      callback();
    }).catch(() => {
      alert('Failed to create notebook. Are all of the fields filled in correctly?');
    });
  };
};


// Removes a notebook from the visible notebook list
reducer.removeNoteBook = (id) => {
  return { type: REMOVE, id };
};



// Attempts to delete a notebook from the server and removes it from the visible
// notebook list if successful
reducer.deleteNotebook = (notebookId) => {

   return (dispatch) => {
    api.delete('/notebooks/' + notebookId).then(() => {
      // Delete post.
      dispatch(reducer.removeNoteBook(notebookId));

    }).catch(() => {
      alert('Failed to delete notebook.');
    });
  };

};


// Changes local post data
reducer.changeNotebook = (notebook) => {
  return { type: CHANGE, notebook };
};

// Attempts to update a notebook on the server and updates local notebook data if
// successful
reducer.saveNotebook = (editedNotebook, callback) => {
  return (dispatch) => {
    api.put('/notebooks/' + editedNotebook.id, editedNotebook).then((notebook) => {
      // Saves local notebook.
      dispatch(reducer.changeNotebook(notebook));
      callback();
    }).catch(() => {
      alert('Failed to save notebook.  Are all of the fields filled in correctly?');
    });
  };
};

reducer.loadNotes = (notebookId) => {
	return (dispatch) => {
    api.get('/notebooks/' + notebookId + '/notes').then((notes) => {
      dispatch({ type: UPDATE, notebookId, notes })
    });
  };
};

reducer.setActiveNotebook = (note) => {
  return (dispatch) => {
    dispatch({type: SETNOTEBOOK, note})
  };
};





// Export the action creators and reducer
module.exports = reducer;