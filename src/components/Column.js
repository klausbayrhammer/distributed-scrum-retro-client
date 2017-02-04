import React from 'react'
import Card from './Card'

export default ({cards = [], title, createCard, id, addVote, removeVote, deleteCard} = {}) =>
    <div className="column">
        <h3 className="column__title">{title}</h3>
        <button className="column__create-card" onClick={() => createCard({columnId: id, title: 'sampleTitle'})} >+</button>
        <ul>
            {cards.map(card => <Card {...card} key={card.id} addVote={addVote} removeVote={removeVote} deleteCard={deleteCard}/>)}
        </ul>
    </div>