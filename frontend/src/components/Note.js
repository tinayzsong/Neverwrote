const React = require('react');
const NoteView = require('./NoteView');
const NoteEdit = require('./NoteEdit');

class Note extends React.Component {
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

    const saveEdit = (editedNote) => {
      this.props.saveNotebooks(editedNote, (err) => {
        if(!err) closeEdit();
      });
    };

    const deleteThisNote = () => {
this.props.deleteNote(this.props.notetitle.id);
};

 if(this.state.editing) {
      // Render component for editing the post
      return (
        <NoteEdit
          Note={this.props.notetitle}
          onSave={saveEdit}
          onCancel={closeEdit}
        />
      );
    }

    return (
        <NoteView
        Note ={this.props.notetitle}
        onDelete ={deleteThisNote}
        onEdit ={openEdit}
        />
    );


  }
}

// Export the Note component
module.exports = Note;