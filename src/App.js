import React, {Component} from 'react';
import Board from './components/Board';

class App extends Component {
    constructor() {
        super();
        this.state = {columns: [{id:1, title: "Good", cards: []}, {id:2, title: "Bad", cards: []}, {id: 3, title: "Next actions", cards: []}]};
    }

    createCard({columnId, title}) {
        const card = {title, id:1, votes:0, createdByMe:true};
        const columnWithNewlyAddedCard = column => Object.assign({}, column, {cards: [...column.cards, card]})
        const columns = this.state.columns.map(column => column.id !== columnId ? column : columnWithNewlyAddedCard(column));
        this.setState(Object.assign({}, this.state, {columns}));
    }
    addVote(cardIdToVote) {
        this.updateVote(cardIdToVote, 1);
    }
    removeVote(cardIdToVote) {
        this.updateVote(cardIdToVote, -1);
    }
    updateVote(cardIdToVote, increment) {
        const cardWithAddedVote = card => Object.assign({}, card, {votes:card.votes + increment});
        const columns = this.state.columns.map(column => 
            Object.assign({}, column, {cards: column.cards.map(card => card.id !== cardIdToVote ? card : cardWithAddedVote(card))})
        )
        this.setState(Object.assign({}, this.state, {columns}));
    }
    deleteCard(cardIdToDelete) {
        const columns = this.state.columns.map(column => 
            Object.assign({}, column, {cards: column.cards.filter(card => card.id !== cardIdToDelete)})
        )
        this.setState(Object.assign({}, this.state, {columns}));
    }
    render() {
        return (
            <div className="App">
                <Board columns={this.state.columns} createCard={this.createCard.bind(this)} deleteCard={this.deleteCard.bind(this)} addVote={this.addVote.bind(this)} removeVote={this.removeVote.bind(this)}/>
            </div>
        );
    }
}

export default App;
