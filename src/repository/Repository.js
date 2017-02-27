import uuid from 'uuid-v4';
import _ from 'lodash';
import getUserId from './user-id';
import transformRemoteColumns from './transform-remote-columns';
import database from './database';
import deleteCard from './delete-card';
import createCard from './create-card';
import updateVote from './update-vote';
import editCardTitle from './edit-card-title';

function defaultInitialState() {
  return {
    G: { title: 'Good', order: 0 },
    B: { title: 'Bad', order: 1 },
    N: { title: 'Next actions', order: 2 },
  };
}

export default class {
  constructor({ initialState = defaultInitialState(), appId = uuid() } = {}) {
    this.columns = [];
    this.editCards = [];
    this.createCardForColumn = _.mapValues(initialState, (v, k) => initialState[k].createCard);
    const userId = getUserId();

    const notify = () => this.observer && this.observer(this);

    const getOpts = () => {
      const remoteColumns = this.remoteColumns;
      const columns = this.columns;
      const createCardForColumn = this.createCardForColumn;
      const editCard = this.editCards;
      return { columns, appId, userId, createCardForColumn, remoteColumns, editCard };
    };

    const rebuildColumns = () => {
      console.log(getOpts());
      this.columns = transformRemoteColumns(getOpts());
      console.log(this.columns);
      notify();
    };

    const registerOnValueChange = () => {
      const colRef = database.ref(`${appId}/columns`);
      colRef.on('value', (snapshot) => {
        const columns = snapshot.val();
        if (!columns) {
          return colRef.set(initialState);
        }
        this.remoteColumns = columns;
        return rebuildColumns();
      });
    };

    const setCreateCard = (columnId, value) => {
      this.createCardForColumn[columnId] = value;
      rebuildColumns();
    };

    const setEditCard = (cardId, value) => {
      this.editCards[cardId] = value;
      rebuildColumns();
    };

    this.prepareCreateCard = columnId => setCreateCard(columnId, true);

    this.undoPrepareCreateCard = columnId => setCreateCard(columnId, false);

    this.createCard = ({ columnId, title }) => {
      createCard({ columnId, title }, getOpts());
      this.undoPrepareCreateCard(columnId);
    };

    this.addVote = cardId => updateVote(cardId, 1, getOpts());

    this.removeVote = cardId => updateVote(cardId, -1, getOpts());

    this.deleteCard = cardId => deleteCard(cardId, getOpts());

    this.editCard = cardId => setEditCard(cardId, true);

    this.undoEditCard = cardId => setEditCard(cardId, false);

    this.editCardTitle = (cardId, newTitle) => {
      editCardTitle({ cardId, newTitle }, getOpts());
      this.undoEditCard(cardId);
    };

    this.onChange = (obs) => { this.observer = obs; };

    registerOnValueChange();
  }
}
