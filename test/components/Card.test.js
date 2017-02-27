import 'react';
import { shallow } from 'enzyme';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Card from '../../src/components/Card';
import EditCardTitleWrapper from '../../src/components/EditCardTitle/';

chai.should();
chai.use(sinonChai);

describe('the card', () => {
  it('should render the EditCardTitle component correctly', () => {
    const repository = sinon.stub();
    const wrapper = shallow(Card({ card: { title: 'title', id: 5, editCard: true }, repository }));
    wrapper.find(EditCardTitleWrapper).props().should.eql({ cardId: 5, title: 'title', editCard: true, repository });
  });

  it('should render the votecount of a card', () => {
    const wrapper = shallow(Card({ card: { votes: 4 } }));
    wrapper.find('.card__votes').text().should.equal('4');
  });

  it('should invoke the deleteCard method if the delete card button has been clicked', () => {
    const deleteCard = sinon.stub();
    const wrapper = shallow(Card({ card: { id: 5 }, repository: { deleteCard } }));
    wrapper.find('.card__delete').simulate('click');
    deleteCard.should.have.been.calledWith(5);
  });

  it('should invoke the add vote method if the add vote button has been clicked', () => {
    const addVote = sinon.stub();
    const wrapper = shallow(Card({ card: { id: 5 }, repository: { addVote } }));
    wrapper.find('.card__add-vote').simulate('click');
    addVote.should.have.been.calledWith(5);
  });

  it('should invoke the removeVote method if the remove vote button has been clicked', () => {
    const removeVote = sinon.stub();
    const wrapper = shallow(Card({ card: { id: 5 }, repository: { removeVote } }));
    wrapper.find('.card__remove-vote').simulate('click');
    removeVote.should.have.been.calledWith(5);
  });

  it('should render the created-by-me class if a card was created by this user', () => {
    const wrapper = shallow(Card({ card: { createdByMe: true } }));
    wrapper.find('.card').hasClass('card--created-by-me').should.be.true;
  });

  it('should not render the created-by-me class if a card was not created by this user', () => {
    const wrapper = shallow(Card());
    wrapper.find('.card').hasClass('card--created-by-me').should.be.false;
  });
});
