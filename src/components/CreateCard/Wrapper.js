import React from 'react';
import PrepareCreateCard from './PrepareCreateCard';
import CreateCard from './CreateCard';

export default ({repository, columnId, createCard}) => {
    if (createCard) {
        return <CreateCard repository={repository} columnId={columnId}/>
    }
    return <PrepareCreateCard repository={repository} columnId={columnId}/>
}