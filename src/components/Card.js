import React, { Component } from 'react';

export default class extends Component {
    classNames() {
        if(!this.props['created-by-me']) {
            return "card"
        }
        return "card card--created-by-me"
    }

    render() {
        return (
            <div className={this.classNames()}>
                <div className="card__title">
                    {this.props.title}
                </div>
                <div className="card__votes">
                    {this.props.votes}
                </div>
            </div>
        );
    }
}
