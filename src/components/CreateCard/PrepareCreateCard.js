import React from 'react';

export default ({ repository, columnId }) =>
  <div className="column__actions">
    <button
      className="create-card__prepare-create-card"
      onClick={() => repository.prepareCreateCard(columnId)}
    >
      +
    </button>
  </div>;
