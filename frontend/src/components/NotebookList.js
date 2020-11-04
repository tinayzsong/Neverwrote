const React = require('react');
const ReactRedux = require('react-redux');
const _ = require('lodash');
const notebooksActionCreators = require('../reducers/notebooks');
const notesActionCreators = require('../reducers/notes');
const createActionDispatchers = require('../helpers/createActionDispatchers');
const Notebook = require('./NoteBook');
const ActiveNotebook = require('./ActiveNotebook');
const NotebookNew = require('./NoteBookNew');

class NotebookList extends React.Component{
 constructor(props) {
    super(props);
    // Set initial internal state for this component
    this.state = { loading: false };
  }

  render() {
   // Function which creates a notebook component from a notebook ID
    const createNotebookComponent = (currentNotebook) => {

      if(currentNotebook.id == this.props.notebooks.activeNotebookId){
        console.log(currentNotebook.id);
        return <ActiveNotebook
          key = {currentNotebook.id}
          notebook = {currentNotebook}
          notes = {this.props.notes.notes}
          setActiveNotebook = {this.props.setActiveNotebook}
          deleteNotebook = {this.props.deleteNotebook}
          activeNote = {this.props.activeNote}
        />
      }
      return (
        <Notebook
          key={currentNotebook.id}
          notebooktitle={currentNotebook}
          saveNotebooks ={this.props.saveNotebook}
          loadNotes = {this.props.loadNotes}
          deleteNotebook={this.props.deleteNotebook}
        />
      );
    };

    return(
      <div className="row">
        <div className="blog-main">
            <NotebookNew
              createNotebook={this.props.createNotebook}
            />
            {this.props.notebooks.visibleNotebooks.map(createNotebookComponent)}
        </div>
      </div>
            );
          }
        }

//connect NotebookList to the redux store
const NotebookListContainer = ReactRedux.connect(
  // Map store state to props
  (state) => ({
    notebooks: state.notebooks,
    activeNotebookId: state.activeNotebookId,
    notes: state.notes,
  }),
  createActionDispatchers(notebooksActionCreators,notesActionCreators)
)(NotebookList);

module.exports = NotebookListContainer;