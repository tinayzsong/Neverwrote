const React = require('react');
const moment = require('moment');

/**
 * Render edit/delete buttons and post timestamp.
 *
 * List of props: Note, time, onEdit, onDelete
 */
const NoteMeta = (props) => {
  return (
    <div className="Note-meta">
      <a role="button" title="Edit Note"
        style={{ paddingRight: '8px' }}
        onClick={ props.onEdit }
      >
        <span className="fa fa-edit" />
      </a>

      <a role="button" title="Delete Note"
         style={{ paddingRight: '8px' }}
         onClick={ props.onDelete }
       >
       <span className="fa fa-remove" />
      </a>
    </div>
  );
};

/**
 * A read-only view of a Note.
 * This is a stateless functional component.
 * It takes props as its args and returns what the render method would return.
 *
 * List of props: Note, time, onEdit, onDelete
 */
const NoteView = (props) => {
  return (
    <div className="Note">
      <h2 className="Note-title">{props.Note.title}</h2>

      {/* Display Note metadata */}
        {NoteMeta(props)}

    </div>
  );
};

module.exports = NoteView;