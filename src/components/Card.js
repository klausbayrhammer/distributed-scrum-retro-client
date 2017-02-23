import React from 'react';

export default ({ card: { title, votes, createdByMe, id } = {}, repository } = {}) =>
  <div className={createdByMe ? 'card card--created-by-me' : 'card'}>
    <div className="card__title">
      {title}
    </div>
    <div className="card__votes">
      {votes}
    </div>
    <button className="card__delete" onClick={() => repository.deleteCard(id)}>x</button>
    <button className="card__add-vote" onClick={() => repository.addVote(id)}>+</button>
    <button className="card__remove-vote" onClick={() => repository.removeVote(id)}>-</button>
  </div>;
