const React = require('react');
const NotebookEdit = require('./NotebookEdit');

class NotebookNew extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        editing:false
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
    };
    const createNotebook = newNotebook => {
      this.props.createNotebook(newNotebook, e => {
        if(!e) {
            closeEdit();
        }
      });
    };
    
    if(this.state.editing) {
	  return (
        <NotebookEdit
          notebook = {this.props.notebook}
          onSave={createNotebook}
          onCancel={closeEdit}
        />
      );
    }
    return(
      <button className="btn btn-primary" 
        onClick={openEdit}> Add Notebook
      </button>
    );
  }
}
module.exports = NotebookNew;