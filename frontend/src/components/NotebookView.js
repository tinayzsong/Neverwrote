const React = require('react');
const moment = require('moment');

/**
 * Render edit/delete buttons and post timestamp.
 *
 * List of props: notebook, time, onEdit, onDelete
 */
const NotebookMeta = (props) => {
  return (
    <div className="notebook-meta">
      <a role="button" title="Edit notebook"
        style={{ paddingRight: '8px' }}
        onClick={ props.onEdit }
      >
        <span className="fa fa-edit" />
      </a>

      <a role="button" title="Delete notebook"
         style={{ paddingRight: '8px' }}
         onClick={ props.onDelete }
       >
       <span className="fa fa-remove" />
      </a>

    </div>
  );
};

/**
 * A read-only view of a notebook.
 * This is a stateless functional component.
 * It takes props as its args and returns what the render method would return.
 *
 * List of props: notebook, time, onEdit, onDelete
 */
const NotebookView = (props) => {
  return (
    <div className="newNotebook">
      <a href=""><h2 className="notebook-title">{props.notebook.title}</h2></a>

      {/* Display notebook metadata */}
        {NotebookMeta(props)}

    </div>
  );
};

module.exports = NotebookView;