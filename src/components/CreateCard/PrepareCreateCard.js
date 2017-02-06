import React from 'react';

export default ({repository, columnId}) =>
    <div>
        <button className="create-card__prepare-create-card" onClick={() => repository.prepareCreateCard(columnId)} >+</button>
    </div>