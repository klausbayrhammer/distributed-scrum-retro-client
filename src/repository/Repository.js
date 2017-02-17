import uuid from 'uuid-v4';
import _ from 'lodash';
import userId from './user-id';
import transformRemoteColumns from './transform-remote-columns';
import database from './database';
import deleteCard from './delete-card';
import createCard from './create-card';
import updateVote from './update-vote';
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
        createCard({columnId, title}, this._getOpts());
        this.undoPrepareCreateCard(columnId);
    }

    addVote(cardId) {
        updateVote(cardId, 1, this._getOpts());
    }

    removeVote(cardId) {
        updateVote(cardId, -1, this._getOpts());
    }

    deleteCard(cardId) {
        deleteCard(cardId, this._getOpts());
    }

    prepareCreateCard(columnId) {
        this._setCreateCard(columnId, true);
    }

    undoPrepareCreateCard(columnId) {
        this._setCreateCard(columnId, false);
    }

    _setCreateCard(columnId, value) {
        this.createCardForColumn[columnId] = value;
        this._rebuildColumns();
    }

    _registerOnValueChange(initialState) {
        const colRef = database.ref(`${this.appId}/columns`);
        colRef.on('value', snapshot => {
            const columns = snapshot.val();
            if (!columns) {
                return colRef.set(initialState);
            }
            this.remoteColumns = columns;
            this._rebuildColumns();
        });
    }
    _rebuildColumns() {
        this.columns = transformRemoteColumns(this._getOpts());
        this._notify();
    }

    _getOpts() {
        const remoteColumns = this.remoteColumns;
        const columns = this.columns;
        const appId = this.appId;
        const userId = this.userId;
        const createCardForColumn = this.createCardForColumn;
        return {columns, appId, userId, createCardForColumn, remoteColumns};
    }

    _notify() {
        if (this.observer) {
            this.observer(this);
        }
    }
};