import React from 'react'
import Card from './Card'

export default ({cards = [], title, createCard, id, addVote, removeVote} = {}) =>
    <div className="column">
        <h3 className="column__title">{title}</h3>
        <button className="column__create-card" onClick={() => createCard({columnId: id, title: 'sampleTitle'})} />
        <ul>
            {cards.map(card => <Card {...card} key={card.title} addVote={addVote} removeVote={removeVote}/>)}
        </ul>
    </div>