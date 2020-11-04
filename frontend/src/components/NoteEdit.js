const React = require('react');
const _ = require('lodash');

/**
 * A form for editing a note title.
 */
class NoteEdit extends React.Component {
  constructor(props) {
    super(props);
    const note = props.note || {};

    this.state = {
      title: note.title || '',

    };
  }

  render() {
    const revertAndStopEditing = (event) => {
      event.preventDefault();
      this.props.onCancel();
    };

    const submitAndStopEditing = (event) => {
      event.preventDefault();
      // Creates a new noebook object and saves it.
      const editedNote = _.assign({}, this.props.note, {
        title: this.state.title,

      });
      this.props.onSave(editedNote);
    };

    const onTitleChange = (event) => {
      this.setState({ title: event.target.value });
    };



    return (
      <form className="blog-post">
        {/* Title field */}
        <div className="form-group">
          <input className="form-control input-lg" value={this.state.title}
            placeholder="note title" onChange={onTitleChange}
          />
        </div>

        {/* Save button */}
        <button className="btn btn-primary pull-right"
          onClick={submitAndStopEditing}
        >
          Save
        </button>
        {/* Cancel button */}
        <button className="btn btn-danger pull-right"
          style={{ marginRight: '12px' }}
          onClick={revertAndStopEditing}
        >
          Cancel
        </button>
      </form>
    );
  }
}

module.exports = NoteEdit;