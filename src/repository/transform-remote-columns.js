import _ from 'lodash';

export default function ({ userId, createCardForColumn, remoteColumns }) {
  const columnsWithId = Object.keys(remoteColumns)
    .map(id => ({ ...remoteColumns[id], id }));
  return _.chain(columnsWithId)
    .sortBy('order')
    .map(col => _.omit(col, 'order'))
    .map(col => ({ ...col, createCard: createCardForColumn[col.id] }))
    .map((col) => {
      const cards = Object.keys(col.cards || {})
        .map(id => ({ ...col.cards[id], id }))
        .map(card => ({ ...card, createdByMe: card.userId === userId }));
      return { ...col, cards };
    })
    .value();
}
