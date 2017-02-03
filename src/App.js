import React, {Component} from 'react';
import Board from './components/Board';

class App extends Component {
    constructor() {
        super();
        this.state = {columns: [{title: "Good"}, {title: "Bad"}, {title: "Next actions"}]};
    }

    render() {
        return (
            <div className="App">
                <Board columns={this.state.columns}/>
            </div>
        );
    }
}

export default App;
