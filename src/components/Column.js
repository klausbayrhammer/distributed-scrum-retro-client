import React from 'react';
import Card from './Card';
import CreateCardWrapper from './CreateCard/Wrapper';

export default ({column: {title, id, createCard, cards = []} = {}, repository} = {}) =>
    <div className="column">
        <h3 className="column__title">{title}</h3>
        <ul className="column__cards card-list">
            {cards.map(card =>
              <li className="card-list__item">
                <Card card={card} key={card.id} repository={repository}/>
              </li>)}
              <li className="card-list__item">
                <CreateCardWrapper columnId={id} createCard={createCard} repository={repository} />
              </li>
        </ul>
    </div>