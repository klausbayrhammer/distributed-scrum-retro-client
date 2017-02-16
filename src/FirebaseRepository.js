import firebase from 'firebase';
import uuid from 'uuid-v4';
import _ from 'lodash';
import userId from './repository/user-id';

const config = {
    databaseURL: "https://distributed-scrum-retro.firebaseio.com/"
};
firebase.initializeApp(config);
const database = firebase.database();

function defaultInitialState() {
    return {
        "G": {title: "Good", order: 0},
        "B": {title: "Bad", order: 1},
        "N": {title: "Next actions", order: 2}
    };
}

export default class {
    constructor({initialState = defaultInitialState(), appId = uuid()} = {}) {
        this.columns = [];
        this.createCardForColumn = _.mapValues(initialState, (value, key) => initialState[key].createCard);
        this.appId = appId;
        this.userId = userId();
        this._registerOnValueChange(initialState);
    }


    onChange(obs) {
        this.observer = obs;
    }

    createCard({columnId, title}) {
        const newCardId = uuid();
        const cardRef = database.ref(`${this.appId}/columns/${columnId}/cards/${newCardId}`);
        cardRef.set({title, votes: 0, userId:this.userId});
        this.undoPrepareCreateCard(columnId);
    }

    addVote(cardId) {
        this._updateVote(cardId, 1)
    }

    removeVote(cardId) {
        this._updateVote(cardId, -1)
    }

    deleteCard(cardId) {
        const columnId = this.columns.find(column => column.cards.some(card => card.id === cardId)).id;
        const cardRef = database.ref(`${this.appId}/columns/${columnId}/cards/${cardId}`);
        cardRef.remove();
    }

    prepareCreateCard(columnId) {
        this._setCreateCard(columnId, true);
    }

    undoPrepareCreateCard(columnId) {
        this._setCreateCard(columnId, false);
    }

    _setCreateCard(columnId, value) {
        this.createCardForColumn[columnId] = value;
        this.columns.find(col => col.id === columnId).createCard = value;
        this._notify();
    }

    _updateVote(cardId, increment) {
        const columnId = this.columns.find(column => column.cards.some(card => card.id === cardId)).id;
        const cardVoteRef = database.ref(`${this.appId}/columns/${columnId}/cards/${cardId}/votes`);
        cardVoteRef.once('value', snapshot => {
            cardVoteRef.set(snapshot.val() + increment);
        });
    }

    _registerOnValueChange(initialState) {
        const colRef = database.ref(`${this.appId}/columns`);
        colRef.on('value', snapshot => {
            const columns = snapshot.val();
            if (!columns) {
                return colRef.set(initialState);
            }
            this._valueChanged(columns);
        });
    }

    _valueChanged(columns) {
        const columnsWithId = Object.keys(columns).map(id => Object.assign({id}, columns[id]));
        this.columns = _.chain(columnsWithId)
            .sortBy('order')
            .map(col => _.omit(col, 'order'))
            .value();
        this.columns.forEach(col => {
            col.cards = Object.keys(col.cards || {})
                .map(id => Object.assign({id}, col.cards[id]))
                .map(card => Object.assign(card, {createdByMe: card.userId === this.userId}));
            col.createCard = this.createCardForColumn[col.id];
        });
        this._notify();
    }

    _notify() {
        if (this.observer) {
            this.observer(this);
        }
    }
};