import React from 'react'
import Column from './Column'

export default ({columns = []}) =>
    <div className="board">
        {columns.map(column => <Column {...column} key={column.title} />)}
    </div>