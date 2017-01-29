import React from 'react'
import Card from './Card'

export default ({cards = [], title}) =>
    <div className="column">
        <h3 className="column__title">{title}</h3>
        <ul>
            {cards.map(card => <Card {...card} key={card.title}/>)}}
        </ul>
    </div>