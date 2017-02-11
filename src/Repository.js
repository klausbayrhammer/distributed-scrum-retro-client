import uuid from 'uuid-v4';

function defaultInitialState() {
    return [
        {id: 1, title: "Good", cards: []},
        {id: 2, title: "Bad", cards: []},
        {id: 3, title: "Next actions", cards: []}
    ];
}

export default class {
    constructor(columns = defaultInitialState()) {
        this.columns = columns;
        this.observer = [];
    }

    createCard({columnId, title}) {
        const column = this.columns.find(column => column.id === columnId);
        column.cards.push({title, id: uuid(), votes: 0, createdByMe: true});
        column.createCard = false;
        this._notify();
    }

    addVote(cardIdToVote) {
        this.updateVote(cardIdToVote, 1);
    }

    removeVote(cardIdToVote) {
        this.updateVote(cardIdToVote, -1);
    }

    updateVote(cardIdToVote, increment) {
        this.columns.forEach(column => column.cards.forEach(card => {
            if (card.id === cardIdToVote) {
                card.votes += increment;
            }
        }));
        this._notify();
    }

    prepareCreateCard(columnId) {
        this.columns.find(column => column.id === columnId).createCard = true;
        this._notify();
    }

    undoPrepareCreateCard(columnId) {
        this.columns.find(column => column.id === columnId).createCard = false;
        this._notify();
    }

    deleteCard(cardIdToDelete) {
        this.columns.forEach(column => column.cards = column.cards.filter(card => card.id !== cardIdToDelete));
        this._notify();
    }

    onChange(obs) {
        this.observer.push(obs);
    }

    _notify() {
        this.observer.forEach(obs => obs(this));
    }
};