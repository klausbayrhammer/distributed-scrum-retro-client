import _ from 'lodash';

function mapCards(col, userId) {
  const cards = Object.keys(col.cards || {})
    .map(id => ({ ...col.cards[id], id }))
    .map(card => ({ ...card, createdByMe: card.userId === userId }));
  return { ...col, cards };
}

function mapCreateCard(col, createCardForColumn) {
  return ({ ...col, createCard: createCardForColumn[col.id] });
}

export default function ({ userId, createCardForColumn, remoteColumns }) {
  return _.chain(remoteColumns)
    .keys()
    .map(id => ({ ...remoteColumns[id], id }))
    .sortBy('order')
    .map(col => _.omit(col, 'order'))
    .map(col => mapCreateCard(col, createCardForColumn))
    .map(col => mapCards(col, userId))
    .value();
}
