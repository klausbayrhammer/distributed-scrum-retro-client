import _ from 'lodash';

export default function ({ userId, createCardForColumn, remoteColumns }) {
  const columnsWithId = Object.keys(remoteColumns)
    .map(id => Object.assign({ id }, remoteColumns[id]));
  return _.chain(columnsWithId)
    .sortBy('order')
    .map(col => _.omit(col, 'order'))
    .map((col) => {
      const cards = Object.keys(col.cards || {})
        .map(id => Object.assign({ id }, col.cards[id]))
        .map(card => Object.assign({ createdByMe: card.userId === userId }, card));
      const createCard = createCardForColumn[col.id];
      return Object.assign({}, col, { cards, createCard });
    })
    .value();
}
