const React = require('react');
const NoteEdit = require('./NoteEdit');

class NoteNew extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
        };
    }
    render() {
        const openEdit = () => {
            this.setState({ 
                editing: true 
            });
        };
        const closeEdit = () => {
            this.setState({ 
                editing: false 
            });
            this.props.clearInput();
        }
        const createNote = newNote => {
            this.props.createNote(newNote, e => {
                if (!e) {
                    closeEdit();
                }
            })
        };
        if (this.state.editing) {
            return (
                <NoteEdit
                    note={this.props.note}
                    onSave={createNote}
                    onCancel={closeEdit}
                    notebookId={this.props.notebookId}
                />
            );
        }
        return (
            <button className="btn btn-primary"
                onClick={openEdit}
            >＋Note
            </button>
        );
    }
}
module.exports = NoteNew;