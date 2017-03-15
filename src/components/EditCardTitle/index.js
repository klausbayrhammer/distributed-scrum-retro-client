import React from 'react';
import EditTitle from './EditTitle';

export default ({ cardId, title, repository, editCard }) => {
  if (editCard) {
    return <div className="card__title card__title--active"><EditTitle cardId={cardId} title={title} repository={repository}/></div>;
  }
  return <div className="card__title" onClick={() => repository.editCard(cardId)}>{title}</div>;
}