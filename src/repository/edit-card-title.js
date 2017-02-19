import database from './database';

export default function ({ cardId, newTitle }, { appId, columns }) {
  const columnContainingCard = columns.find(column => column.cards.find(({ id }) => id === cardId));
  const columnId = columnContainingCard.id;
  const cardRef = database.ref(`${appId}/columns/${columnId}/cards/${cardId}/title`);
  cardRef.set(newTitle);
}
