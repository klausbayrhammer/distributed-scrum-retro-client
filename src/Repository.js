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
        this.columns.find(column => column.id === columnId).cards.push(card);
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