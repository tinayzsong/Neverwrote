const React = require('react');
const _ = require('lodash');

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phrase: '',
        };
    }
    render() {
        const clearInput = () => {
            this.setState({
                phrase: '',
            });
        };
        const onSearching = event => {
            const phrase = event.target.value;
            this.setState({ 
                phrase 
            });
        };
        return (
            <div>
                <div className="input-group">
                    <input
                        className="form-control"
                        value={this.state.phrase}
                        placeholder="Search..."
                        onChange={onSearching}
                    />
                    <div className="input-group-btn">
                        <button
                            className="btn btn-warning"
                            onClick={clearInput}
                        > Erase
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
module.exports = Search;