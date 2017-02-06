import uuid from 'uuid-v4';

export default class {
    constructor() {
        this.columns = [{id: 1, title: "Good", cards: []}, {id: 2, title: "Bad", cards: []}, {
            id: 3,
            title: "Next actions",
            cards: []
        }];
        this.observer = [];
    }
    createCard({columnId, title}) {
        const card = {title, id: uuid(), votes: 0, createdByMe: true};
        const columnWithNewlyAddedCard = column => Object.assign({}, column, {cards: [...column.cards, card]});
        this.columns = this.columns.map(column => column.id !== columnId ? column : columnWithNewlyAddedCard(column));
        this._notify();
    }
    addVote(cardIdToVote) {
        this.updateVote(cardIdToVote, 1);
    }
    removeVote(cardIdToVote) {
        this.updateVote(cardIdToVote, -1);
    }
    updateVote(cardIdToVote, increment) {
        const cardWithAddedVote = card => Object.assign({}, card, {votes:card.votes + increment});
        this.columns = this.columns.map(column =>
            Object.assign({}, column, {cards: column.cards.map(card => card.id !== cardIdToVote ? card : cardWithAddedVote(card))})
        )
        this._notify();
    }
    deleteCard(cardIdToDelete) {
        this.columns = this.columns.map(column =>
            Object.assign({}, column, {cards: column.cards.filter(card => card.id !== cardIdToDelete)})
        )
        this._notify();
    }
    onChange(obs) {
        this.observer.push(obs);
    }

    _notify() {
        this.observer.forEach(obs => obs(this));
    }
};