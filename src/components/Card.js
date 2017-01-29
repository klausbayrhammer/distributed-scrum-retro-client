import React  from 'react';

export default ({title, votes, createdByMe}) =>
    <li className={createdByMe ? "card card--created-by-me" : "card"}>
        <div className="card__title">
            {title}
        </div>
        <div className="card__votes">
            {votes}
        </div>
    </li>
