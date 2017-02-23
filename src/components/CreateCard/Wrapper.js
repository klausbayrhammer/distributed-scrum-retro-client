import React from 'react';
import PrepareCreateCard from './PrepareCreateCard';
import CreateCard from './CreateCard';

export default ({ repository, columnId, createCard = false }) => {
  if (createCard) {
    return <CreateCard repository={repository} columnId={columnId} />;
  }
  return <PrepareCreateCard repository={repository} columnId={columnId} />;
};
