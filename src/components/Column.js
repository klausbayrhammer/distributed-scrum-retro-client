import React from 'react';
import Card from './Card';
import CreateCardWrapper from './CreateCard/Wrapper';

export default ({column: {title, id, createCard, cards = []} = {}, repository} = {}) =>
    <div className="column">
        <h3 className="column__title">{title}</h3>
        <CreateCardWrapper columnId={id} createCard={createCard} repository={repository} />
        <ul>
            {cards.map(card => <Card card={card} key={card.id} repository={repository}/>)}
        </ul>
    </div>