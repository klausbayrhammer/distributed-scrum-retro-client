import React from 'react';
import EditCardTitle from './EditCardTitle';

export default ({ card: { title, votes, createdByMe, id, editCard } = {}, repository } = {}) =>
  <div className={createdByMe ? 'card card--created-by-me' : 'card'}>
    <EditCardTitle title={title} cardId={id} editCard={editCard} repository={repository} />
    <div className="card__votes">
      {votes}
    </div>
    <button className="button card__delete" onClick={() => repository.deleteCard(id)}>x</button>
    <button className="button button--clean" onClick={() => repository.addVote(id)}>
        <svg width="24px" height="24px">
            <use xlinkHref="#thumbs-up"></use>
        </svg>
    </button>
    <button className="button button--clean" onClick={() => repository.removeVote(id)}>
        <svg width="24px" height="24px">
            <use xlinkHref="#thumbs-down"></use>
        </svg>
    </button>
  </div>;
