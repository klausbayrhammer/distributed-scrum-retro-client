import React from 'react';
import EditTitle from './EditTitle';

export default ({ cardId, title, repository, editCard }) => {
  if (editCard) {
    return <div><EditTitle cardId={cardId} title={title} repository={repository}/></div>;
  }
  return <div className="card__title" onClick={() => repository.editCard(cardId)}>{title}</div>;
}