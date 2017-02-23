import database from './database';

export default function (cardId, { columns, appId }) {
  const columnId = columns.find(column => column.cards.some(card => card.id === cardId)).id;
  const cardRef = database.ref(`${appId}/columns/${columnId}/cards/${cardId}`);
  cardRef.remove();
}
