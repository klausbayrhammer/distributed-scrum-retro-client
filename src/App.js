import React, {Component} from 'react';
import Board from './components/Board';

class App extends Component {
    constructor() {
        super();
        this.state = {columns: [{id:1, title: "Good", cards: []}, {id:2, title: "Bad", cards: []}, {id: 3, title: "Next actions", cards: []}]};
    }

    createCard({columnId, title}) {
        const card = {title, id:1, votes:0, createdByMe:true};
        const columns = {columns: this.state.columns.map(column => {
            if(column.id !== columnId) {
                return column
            }
            return Object.assign({}, column, {cards: [...column.cards, card]})
        })}
        this.state = Object.assign({}, this.state, columns);
    }
    addVote(cardIdToVote) {
        this.state = Object.assign({}, this.state, {columns: this.state.columns.map(column => {
            return Object.assign({}, column, {cards: column.cards.map(card => {
                if(card.id !== cardIdToVote) {
                    return card;
                }
                return Object.assign({}, card, {votes:card.votes+1})
            })})
        })})
    }
    render() {
        return (
            <div className="App">
                <Board columns={this.state.columns} createCard={this.createCard.bind(this)} addVote={this.addVote.bind(this)}/>
            </div>
        );
    }
}

export default App;
