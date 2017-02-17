import database from './database';

export default function (cardId, increment, {appId, columns}) {
    const columnId = columns.find(column => column.cards.some(card => card.id === cardId)).id;
    const cardVoteRef = database.ref(`${appId}/columns/${columnId}/cards/${cardId}/votes`);
    cardVoteRef.once('value', snapshot => {
        cardVoteRef.set(snapshot.val() + increment);
    });
}
