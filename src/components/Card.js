import React  from 'react';

export default ({title, votes, createdByMe, id, deleteCard, addVote, removeVote} = {}) =>
    <li className={createdByMe ? "card card--created-by-me" : "card"}>
        <div className="card__title">
            {title}
        </div>
        <div className="card__votes">
            {votes}
        </div>
        <button className="card__delete" onClick={() => deleteCard(id)} />
        <button className="card__add-vote" onClick={() => addVote(id)} />
        <button className="card__remove-vote" onClick={() => removeVote(id)} />
    </li>
