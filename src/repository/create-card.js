import uuid from 'uuid-v4';
import database from './database';

export default function ({ columnId, title }, { userId, appId }) {
  const newCardId = uuid();
  const cardRef = database.ref(`${appId}/columns/${columnId}/cards/${newCardId}`);
  cardRef.set({ title, votes: 0, userId });
}
