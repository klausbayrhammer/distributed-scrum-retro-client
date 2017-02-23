import React, { Component } from 'react';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '' };
    this.handleChange = this.handleChange.bind(this);
    this.createCard = this.createCard.bind(this);
  }

  handleChange(event) {
    this.setState({ title: event.target.value });
  }

  createCard() {
    const columnId = this.props.columnId;
    const title = this.state.title;
    this.props.repository.createCard({ columnId, title });
  }

  render() {
    return (<div>
      <input type="text" className="create-card__title" onChange={this.handleChange} />
      <button
        className="create-card__create-card"
        onClick={this.createCard}
      >+
      </button>
      <button
        className="create-card__undo-prepare-create-card"
        onClick={() => this.props.repository.undoPrepareCreateCard(this.props.columnId)}
      >x
      </button>
    </div>);
  }
}
