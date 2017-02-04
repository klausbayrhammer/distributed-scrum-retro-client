import React from 'react';
import {shallow} from 'enzyme';
import Card from '../../src/components/Card';
import Column from '../../src/components/Column';
import chai from 'chai';
import sinon from 'sinon';

import sinonChai from 'sinon-chai';

chai.should();
chai.use(sinonChai);

describe('column', () => {
    it('should render a column', () => {
        const wrapper = shallow(Column());
        wrapper.find('.column').should.to.have.length(1);
    });

    it('should render a column title', () => {
        const wrapper = shallow(Column({title:"column title"}));
        wrapper.find('.column__title').text().should.equal('column title');
    });
    it('should be possible to create a new card', () => {
        const createCard = sinon.stub();
        const wrapper = shallow(Column({id:15, createCard}));
        wrapper.find('.column__create-card').simulate('click');
        createCard.should.have.been.calledWith({columnId: 15, title: 'sampleTitle'});
    });

    it('should render multiple cards', () => {
        const addVote = sinon.stub();
        const removeVote = sinon.stub();
        const cards = [
            {title: 'title1', votes: 1},
            {title: 'title2', votes: 2, createdByMe: true}];

        const wrapper = shallow(Column({cards, addVote, removeVote}));

        wrapper.find(Card).get(0).props.should.eql({title: 'title1', votes: 1, addVote, removeVote});
        wrapper.find(Card).get(1).props.should.eql({title: 'title2', votes: 2, createdByMe: true, addVote, removeVote});
    });
});
