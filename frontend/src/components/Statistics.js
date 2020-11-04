const React = require('react');
const ReactRedux = require('react-redux');
const Redux = require('redux');

const statisticsActionCreators = require('../reducers/statistics');
class Statistics extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    this.props.getStatistics();
  }
  render() { 
    return ( // there is a refresh button as required!!!
      <div className="statistics">
          <div style={{marginLeft : 15, marginBottom : 10}}>
            <button type="button" className="btn btn-primary"
              onClick={e => {
                  this.props.getStatistics();
              }}> Refresh
            </button>
          </div>
          <div className="container">
            <div className="row" style={{ height : 25}}>
                <div className="col-sm-6">
                    Note Count
                </div>
                <div className="col-sm-6">
                    { this.props.numberOfNotes }
                </div>
            </div>
            <div className="row" style={{ height : 25}}>
                <div className="col-sm-6">
                    Notebook Count
                </div>
                <div className="col-sm-6">
                    { this.props.numberOfNotebooks }
                </div>
            </div>
            <div className="row" style={{ height : 25}}>
                <div className="col-sm-6">
                    Oldest Notebook
                </div>
                <div className="col-sm-6">
                { this.props.oldestNotebook.title }
                </div>
            </div>
            <div className="row" style={{ height : 25}}>
                <div className="col-sm-6">
                    Recently Updated Note
                </div>
                <div className="col-sm-6">
                { this.props.recentlyUpdatedNote.title }
                </div>
            </div>
          </div>
      </div>
    );
  }
}

const StatisticsContainer = ReactRedux.connect(
  state => ({
    numberOfNotebooks: state.statistics.numberOfNotebooks,
    numberOfNotes: state.statistics.numberOfNotes,
    oldestNotebook: state.statistics.oldestNotebook,
    recentlyUpdatedNote: state.statistics.recentlyUpdatedNote,
  }),
  (dispatch) =>
    Redux.bindActionCreators(
      {
        getStatistics : statisticsActionCreators.getStatistics
      },
      dispatch
    )
)(Statistics);

module.exports = StatisticsContainer;