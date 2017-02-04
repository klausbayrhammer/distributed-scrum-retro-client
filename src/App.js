import React, {Component} from 'react';
import Board from './components/Board';

class App extends Component {
    constructor() {
        super();
        this.state = {columns: [{id:1, title: "Good"}, {id:2, title: "Bad"}, {id: 3, title: "Next actions"}]};
    }

    createCard({columnId, title}) {
        const card = {title, votes:0};
        this.state = Object.assign({}, this.state, {columns: this.state.columns.map(column => {
            if(column.id !== columnId) {
                return column
            }
            return Object.assign({}, column, {cards: [...(column.cards || []), card]})
        })})
    }
    render() {
        return (
            <div className="App">
                <Board columns={this.state.columns} createCard={this.createCard.bind(this)}/>
            </div>
        );
    }
}

export default App;
