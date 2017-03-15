import React from 'react';

export default ({ repository, columnId }) =>
    <button
      className="button button--circular create-card__prepare-create-card"
      onClick={() => repository.prepareCreateCard(columnId)}
    >
        <svg width="24px" height="24px">
            <g id="add">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
            </g>
        </svg>
    </button>;