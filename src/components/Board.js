import React from 'react'
import Column from './Column'

export default ({columns = [], createCard, addVote, removeVote, deleteCard} = {}) =>
    <div className="board">
        {columns.map(column => <Column {...column} key={column.title} createCard={createCard} addVote={addVote} removeVote={removeVote} deleteCard={deleteCard}/>)}
    </div>