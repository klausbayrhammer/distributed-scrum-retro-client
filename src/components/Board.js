import React from 'react';
import Column from './Column';

export default ({ repository }) =>
  <div className="board">
    {repository.columns.map(column =>
      <Column key={column.id} column={column} repository={repository} />,
    )}
  </div>;
