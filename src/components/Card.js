import React  from 'react';

function classNames(createdByMe) {
    if (!createdByMe) {
        return "card"
    }
    return "card card--created-by-me"
}

export default ({title, votes, createdByMe}) =>
    <div className={classNames(createdByMe)}>
        <div className="card__title">
            {title}
        </div>
        <div className="card__votes">
            {votes}
        </div>
    </div>
