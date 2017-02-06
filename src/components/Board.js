import React from 'react'
import Column from './Column'

export default ({repository}) =>
    <div className="board">
        {repository.columns.map((column, index) => <Column key={index} column={column} repository={repository} />)}
    </div>