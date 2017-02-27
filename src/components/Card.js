import React from 'react';
import EditCardTitle from './EditCardTitle';

export default ({ card: { title, votes, createdByMe, id, editCard } = {}, repository } = {}) =>
  <div className={createdByMe ? 'card card--created-by-me' : 'card'}>
    <EditCardTitle title={title} cardId={id} editCard={editCard} repository={repository} />
    <div className="card__votes">
      {votes}
    </div>
    <button className="card__delete" onClick={() => repository.deleteCard(id)}>x</button>
    <button className="card__add-vote" onClick={() => repository.addVote(id)}>+</button>
    <button className="card__remove-vote" onClick={() => repository.removeVote(id)}>-</button>
  </div>;
