const React = require('react');
const ReactRedux = require('react-redux');
const _ = require('lodash');
const notebooksActionCreators = require('../reducers/notes');
const createActionDispatchers = require('../helpers/createActionDispatchers');
const Note = require('./Note');
const NoteNew = require('./NoteNew');

class NoteList extends React.Component{
 constructor(props) {
    super(props);
    // Set initial internal state for this component
    this.state = { loading: false };
  }

  render() {
   // Function which creates a Note component from a Note ID
    const createNoteComponent = (currentNote) => {
      return (
        <Note
          key={currentNote.id}
          notetitle={currentNote}
          saveNotebooks ={this.props.saveNote}
          deleteNotebook={this.props.deleteNote}
        />
      );
    };

    return(
      <div className="row">
        <div className="blog-main">
            <NoteNew
              createNote={this.props.createNote}
            />
            {this.props.notes.visibleNotes.map(createNoteComponent)}
        </div>
      </div>
            );
          }
        }

//connect NotebookList to the redux store
const NoteListContainer = ReactRedux.connect(
  // Map store state to props
  (state) => ({
    notes: state.notes
  }),
  createActionDispatchers(noteActionCreators)
)(NoteList);

module.exports = NoteListContainer;