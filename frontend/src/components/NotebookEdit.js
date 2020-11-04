const React = require('react');
const _ = require('lodash');

class NotebookEdit extends React.Component {
    constructor(props) {
        super(props);
        const notebook = props.notebook || {};
        this.state = {
            title: notebook.title || '',
        };
    }
    render() {
        const revertAndStopEditing = event => {
            event.preventDefault();
            this.props.onCancel();
        };
        const submitAndStopEditing = event => {
            event.preventDefault();
            const editedNotebook = _.assign({}, this.props.notebook, {
                title: this.state.title
            });
            this.props.onSave(editedNotebook);
            this.props.onCancel();
        };
        const onTitleChange = event => {
            this.setState({ 
                title: event.target.value 
            });
        };
        return (
            <div>
                <div className="input-group">
                    <input className="form-control" 
                        value={this.state.title}
                        placeholder="Notebook Title" 
                        onChange={onTitleChange}
                    />
                    <div className="input-group-btn">
                        <button className="btn btn-success"
                            onClick={submitAndStopEditing}
                        > ✔️
                        </button>
                        <button className="btn btn-danger"
                            onClick={revertAndStopEditing}
                        > ×
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = NotebookEdit;