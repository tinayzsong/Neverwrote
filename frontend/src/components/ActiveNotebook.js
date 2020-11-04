const React = require('react');
// React component for showing an "active" (selected) album
class ActiveNotebook extends React.Component {
  render() {
    const createNoteComponent = (note) => {
      if(this.props.activeNote != null && note.id ==this.props.activeNote.id){
        console.log("working");
        return <Note
          key = {note.id}
          note = {note}
        />;
      }

    console.log("Not working");
    return <li key={note.id}> <a href="#" onClick= {(e) => onClickNotebook(e,note)}>
      {note.title}</a></li>;
    };

    const onClickNotebook = (event,note) => {
      console.log("test");
      event.preventDefault();
      this.props.setActiveNotebook(note);
    };

  }
}

module.exports = ActiveNotebook;
