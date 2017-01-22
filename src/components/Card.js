import React, { Component } from 'react';

export default class extends Component {
    render() {
        return (
            <div className="Card">
                <div className="title">
                    {this.props.card.title}
                </div>
            </div>
        );
    }
}
