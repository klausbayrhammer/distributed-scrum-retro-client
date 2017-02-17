import _ from 'lodash';

export default function({userId, createCardForColumn, remoteColumns}) {
    const columnsWithId = Object.keys(remoteColumns).map(id => Object.assign({id}, remoteColumns[id]));
    const sortedColumns = _.chain(columnsWithId)
        .sortBy('order')
        .map(col => _.omit(col, 'order'))
        .value();
    sortedColumns.forEach(col => {
        col.cards = Object.keys(col.cards || {})
            .map(id => Object.assign({id}, col.cards[id]))
            .map(card => Object.assign(card, {createdByMe: card.userId === userId}));
        col.createCard = createCardForColumn[col.id];
    });
    return sortedColumns;
}