import React from 'react'
import Column from './Column'

export default ({columns = [], createCard} = {}) =>
    <div className="board">
        {columns.map(column => <Column {...column} key={column.title} createCard={createCard} />)}
    </div>