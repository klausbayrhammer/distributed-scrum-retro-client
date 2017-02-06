import React from 'react'
import Card from './Card'

export default ({column: {title, id, cards = []} = {}, repository, addVote, removeVote, deleteCard} = {}) =>
    <div className="column">
        <h3 className="column__title">{title}</h3>
        <button className="column__create-card" onClick={() => repository.createCard({columnId: id, title: 'sampleTitle'})} >+</button>
        <ul>
            {cards.map(card => <Card card={card} key={card.id} repository={repository}/>)}
        </ul>
    </div>