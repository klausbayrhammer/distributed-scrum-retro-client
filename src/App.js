import React, {Component} from 'react';
import Board from './components/Board';

const testdata = [
    {title: 'Good', cards: [{id: 1, title: 'TDD'}, {id: 1, title: 'Teamwork'}]},
    {title: 'Bad', cards: [{id: 3, title: 'commit messages'}]}
];

class App extends Component {
    render() {
        return (
            <div className="App">
                <Board columns={testdata}/>
            </div>
        );
    }
}

export default App;
