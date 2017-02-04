import React from 'react'
import Column from './Column'

export default ({columns = [], createCard, addVote, removeVote} = {}) =>
    <div className="board">
        {columns.map(column => <Column {...column} key={column.title} createCard={createCard} addVote={addVote} removeVote={removeVote}/>)}
    </div>