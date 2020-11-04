const React = require('react');
const MarkdownEditor = require('./MarkdownEditor');
const _ = require('lodash');

class NoteEdit extends React.Component {
    constructor(props) {
        super(props);
        const note = props.note || {};
        this.state = {
            title: note.title || '',
            content: note.content || '',
            notebookId: props.notebookId || ''
        };
    }
    render() {
        const revertAndStopEditing = event => {
            event.preventDefault();
            this.props.onCancel();
        };
        const submitAndStopEditing = event => {
            event.preventDefault();
            const editedPost = _.assign({}, this.props.note, {
                title: this.state.title,
                content: this.state.content,
                notebookId: this.props.notebookId
            });
            this.props.onSave(editedPost);
            this.props.onCancel();
        };
        const onTitleChange = event => {
            this.setState({ 
                title: event.target.value 
            });
        };
        const onContentChange = event => {
            this.setState({ 
                content: event.target.value 
            });
        };
        return (
            <form>
                <div className="form-group">
                    <input className="form-control" 
                        value={this.state.title}
                        placeholder="Title" 
                        onChange={onTitleChange}
                    />
                    <MarkdownEditor value={this.state.content} 
                        onChange={onContentChange} />
                </div>
                <button className="btn btn-danger pull-right btn-lg"
                    onClick={revertAndStopEditing}
                > ×
                </button>
                <button className="btn btn-success pull-right btn-lg"
                    onClick={submitAndStopEditing}
                > ✔️
                </button>
            </form>
        );
    }
}

module.exports = NoteEdit;