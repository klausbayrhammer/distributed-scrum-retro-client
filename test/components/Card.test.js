import React from 'react';
import {shallow} from 'enzyme';
import Card from '../../src/components/Card';
import chai from 'chai';
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

chai.should();
chai.use(sinonChai);

describe('the card', () => {
    it('should render the title of a card', () => {
        const wrapper = shallow(Card({title: "title"}));
        wrapper.find('.card__title').text().should.equal('title');
    });

    it('should render the votecount of a card', () => {
        const wrapper = shallow(Card({votes: 4}));
        wrapper.find('.card__votes').text().should.equal("4");
    });

    it('should invoke the deleteCard method if the delete card button has been clicked', () => {
        const deleteCard = sinon.stub();
        const wrapper = shallow(Card({id: 5, deleteCard}));
        wrapper.find('.card__delete').simulate('click');
        deleteCard.should.have.been.calledWith(5);
    });

    it('should invoke the add vote method if the add vote button has been clicked', () => {
        const addVote = sinon.stub();
        const wrapper = shallow(Card({id: 5, addVote}));
        wrapper.find('.card__add-vote').simulate('click');
        addVote.should.have.been.calledWith(5);
    });

    it('should invoke the removeVote method if the remove vote button has been clicked', () => {
        const removeVote = sinon.stub();
        const wrapper = shallow(Card({id: 5, removeVote}));
        wrapper.find('.card__remove-vote').simulate('click');
        removeVote.should.have.been.calledWith(5);
    });

    it('should render the created-by-me class if a card was created by this user', () => {
        const wrapper = shallow(Card({createdByMe: true}));
        wrapper.find('.card').hasClass('card--created-by-me').should.be.true;
    });

    it('should not render the created-by-me class if a card was not created by this user', () => {
        const wrapper = shallow(Card());
        wrapper.find('.card').hasClass('card--created-by-me').should.be.false;
    });
});
