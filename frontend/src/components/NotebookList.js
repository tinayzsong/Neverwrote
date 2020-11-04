const React = require('react');
const ReactRedux = require('react-redux');
const _ = require('lodash');
const createActionDispatchers = require('../helpers/createActionDispatchers');
const notebooksActionCreators = require('../reducers/notebooks');
const NotebookNew = require('./NotebookNew');
const NoteNew = require('./NoteNew');

class ActiveNotebook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phrase: '',
      tempNotes: '',
    };
  }
  render() {
    const createNote = note => {
      if (note.id === this.props.activeNoteId) {
        return <ActiveNote key={note.id} 
                title={note.title} 
                note={note} 
                resetNote={this.props.resetNote} 
                deleteNote={this.props.deleteNote} 
                content={note.content} 
                />;
      } else {
        return <Note key={note.id} 
                note={note} 
                loadNoteContent={this.props.loadNoteContent} 
                deleteNote={this.props.deleteNote} 
                />;
      }
    }
    const onClickNotebook = event => {
      event.preventDefault();
      this.props.resetNotebook();
    };
    const onDeleteNotebookButtonClick = () => {
      this.props.deleteNotebook(this.props.notebook.id);
    };
    const clearInput = () => {
      this.setState({
        phrase: '',
        tempNotes: '',
      });
      onSearch('');
    };
    const onSearching = event => {
      const phrase = event.target.value;
      this.setState({ phrase });
      onSearch(phrase);
    };
    const onSearch = phrase => {
      const tempNotes = [];
      this.setState({ 
        tempNotes 
      });
      this.props.notes.map(note => {
        if (!(note.title.contains(phrase) || note.content.contains(phrase) || phrase === '')) {
          tempNotes.push(note);
        }
      })
      this.setState({ 
        tempNotes 
      });
    }
    return (
      <li>
        <a href="#" onClick={onClickNotebook}>
          {this.props.notebook.title}
        </a>
        <button className="btn btn-danger" 
          onClick={onDeleteNotebookButtonClick}>×
        </button>
        <div>
          <div className="input-group">
            <input
              className="form-control"
              value={this.state.phrase}
              placeholder="Search...."
              onChange={onSearching}
            />
            <div className="input-group-btn">
              <button
                className="btn btn-warning"
                onClick={clearInput}
              > Erase
              </button>
            </div>
          </div>
          <div>
            <h3>Notes
              <NoteNew clearInput={clearInput} 
                createNote={this.props.createNote} 
                notebookId={this.props.activeNotebookId} />
            </h3>
            <ol>
              {_.difference(this.props.notes, this.state.tempNotes).map(note => createNote(note))}
            </ol>
          </div>
        </div>
      </li>
    );
  }
}
class ActiveNote extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const onClickNote = event => {
      event.preventDefault();
      this.props.resetNote();
    };
    const onDeleteNoteButtonClick = event => {
      event.preventDefault();
      this.props.deleteNote(this.props.note.id);
    };
    return (
      <li>
        <button className="btn btn-danger" 
          onClick={onDeleteNoteButtonClick}> ×
        </button>
        <a href="#" onClick={onClickNote}>
          {this.props.title} →
        </a>
        {this.props.content}
      </li>
    );
  }
}
class Note extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const onClickNote = event => {
      event.preventDefault();
      this.props.loadNoteContent(this.props.note.id);
    };
    const onDeleteNoteButtonClick = event => {
      event.preventDefault();
      this.props.deleteNote(this.props.note.id);
    };
    return (
      <li>
        <button className="btn btn-danger" 
          onClick={onDeleteNoteButtonClick}> ×
        </button>
        <a href="#" onClick={onClickNote}>
          {this.props.note.title}
        </a>
      </li>
    );
  }
}
class Notebook extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const onClickNotebook = event => {
      event.preventDefault();
      this.props.loadNotes(this.props.notebook.id);
    };
    const onDeleteNotebookButtonClick = event => {
      this.props.deleteNotebook(this.props.notebook.id);
    };
    return (
      <li>
        <a href="#" onClick={onClickNotebook}>
          {this.props.notebook.title}
        </a>
        <button className="btn btn-danger" 
          onClick={onDeleteNotebookButtonClick}> ×
        </button>
      </li>
    );
  }
}
class SearchedNote extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <li>
        {this.props.note.title} : {this.props.note.content}
      </li>
    );
  }
}
class NotebookList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phrase: '',
    };
  }
  render() {
    const createNotebookListItem = notebook => {
      if (notebook.id === this.props.notebooks.activeNotebookId) {
        return (
          <ActiveNotebook
            key={notebook.id}
            notebook={notebook}
            deleteNotebook={this.props.deleteNotebook}
            notes={this.props.notebooks.notes}
            loadNotes={this.props.loadNotes}
            loadNoteContent={this.props.loadNoteContent}
            activeNoteId={this.props.notebooks.activeNoteId}
            deleteNote={this.props.deleteNote}
            createNote={this.props.createNote}
            activeNotebookId={this.props.notebooks.activeNotebookId}
            resetNote={this.props.resetNote}
            resetNotebook={this.props.resetNotebook}
          />
        );
      }
      return (
        <Notebook
          key={notebook.id}
          notebook={notebook}
          loadNotes={this.props.loadNotes}
          deleteNotebook={this.props.deleteNotebook}
        />
      );
    };
    const onSearching = event => {
      const phrase = event.target.value;
      this.setState({ 
        phrase 
      });
      onSearch(phrase);
    };
    const onSearch = phrase => {
      if (!(phrase === '')) {
        this.props.onSearchNotes(phrase);
      }
    };
    const clearInput = () => {
      this.setState({
        phrase: '',
      });
      onSearch('')
    };
    const createNote = () => {
      return this.props.notebooks.searchedNotes.map(note => {
        return <SearchedNote key={note.id} 
                note={note} />
      })
    }
    const loadSearchedNotes = () => {
      if (this.state.phrase === "") {
        // pass
      } else {
        return (
          <div>
            <p>Search Result:</p>
            <ol> {createNote()} </ol>
          </div>
        )
      }
    }
    return (
      <div>
        <div className="input-group">
          <input
            className="form-control"
            value={this.state.phrase}
            placeholder="Search...."
            onChange={onSearching}
          />
          <div className="input-group-btn">
            <button
              className="btn btn-warning"
              onClick={clearInput}
            > Erase
            </button>
          </div>
        </div>
        <div>
          {loadSearchedNotes()}
        </div>
        <h2>Notebooks
          <NotebookNew createNotebook={this.props.createNotebook} />
        </h2>
        <ul>
          {this.props.notebooks.notebooks.map(createNotebookListItem)}
        </ul>
      </div>
    );
  }
}
const NotebookListContainer = ReactRedux.connect(state => {
    return {
      notebooks: state.notebooks,
      notes: state.notes,
      activeNoteId: state.activeNoteId,
      searchedNotes: state.searchedNotes,
    };
  }, createActionDispatchers(notebooksActionCreators))(NotebookList);

module.exports = NotebookListContainer;