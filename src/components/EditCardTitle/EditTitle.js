import React, { Component } from 'react';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { title: this.props.title};
    this.handleChange = this.handleChange.bind(this);
    this.editTitle = this.editTitle.bind(this);
  }

  handleChange(event) {
    this.setState({ title: event.target.value });
  }

  editTitle() {
    this.props.repository.editCardTitle(this.props.cardId, this.state.title);
  }

  render() {
    return (<div>
      <input type="text" className="edit-title__title" value={this.state.title} onChange={this.handleChange} />
      <button className="edit-title__edit-card-title" onClick={this.editTitle}>e</button>
      <button
        className="edit-title__undo-edit-title"
        onClick={() => this.props.repository.undoEditCard(this.props.cardId)}
      >x
      </button>
    </div>);
  }
}
