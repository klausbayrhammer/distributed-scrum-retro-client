import React from 'react'
import Column from './Column'

export default ({columns = [], createCard, addVote} = {}) =>
    <div className="board">
        {columns.map(column => <Column {...column} key={column.title} createCard={createCard} addVote={addVote} />)}
    </div>