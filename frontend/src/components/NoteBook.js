const React = require('react');
const NotebookView = require('./NotebookView');
const NotebookEdit = require('./NotebookEdit');

class NoteBook extends React.Component {
  constructor(props) {
    super(props);
    // Set initial internal state for this component
    this.state = { editing: false };
  }

  render() {
    const openEdit = () => {
      this.setState({ editing: true });
    };

    const closeEdit = () => {
      this.setState({ editing: false });
    };

    const saveEdit = (editedNotebook) => {
      this.props.saveNotebooks(editedNotebook, (err) => {
        if(!err) closeEdit();
      });
    };

    const deleteThisNotebook = () => {
this.props.deleteNotebook(this.props.notebooktitle.id);
};

 if(this.state.editing) {
      // Render component for editing the post
      return (
        <NotebookEdit
          notebook={this.props.notebooktitle}
          onSave={saveEdit}
          onCancel={closeEdit}
        />
      );
    }

    return (
        <NotebookView
        notebook ={this.props.notebooktitle}
        onDelete ={deleteThisNotebook}
        onEdit ={openEdit}
        />
    );
  }
}

// Export the notebook component
module.exports = NoteBook;