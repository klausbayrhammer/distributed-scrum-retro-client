import React from 'react'
import Card from './Card'

export default ({cards = []}) =>
    <div className="column">
        {cards.map(card => <Card {...card} key={card.title}/>)}
    </div>