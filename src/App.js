import React, {Component} from 'react';
import Board from './components/Board';

class App extends Component {
    constructor() {
        super();
        this.state = {columns: [{id:1, title: "Good"}, {id:2, title: "Bad"}, {id: 3, title: "Next actions"}]};
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
