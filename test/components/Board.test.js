import React from 'react';
import {shallow} from 'enzyme';
import Board from '../../src/components/Board';
import Column from '../../src/components/Column';
import chai from 'chai';
import sinon from 'sinon';

chai.should();

describe('board', () => {
    it('should render a board', () => {
        const wrapper = shallow(Board());
        wrapper.find('.board').should.to.have.length(1);
    });

    it('should render multiple columns', () => {
        const createCard = sinon.stub();
        const addVote = sinon.stub();
        const columns = [
            {title: 'title1', cards: [1]},
            {title: 'title2', cards: [2]}];

        const wrapper = shallow(Board({columns, createCard, addVote}));

        wrapper.find(Column).get(0).props.should.eql({title: 'title1', cards: [1], createCard, addVote});
        wrapper.find(Column).get(1).props.should.eql({title: 'title2', cards: [2], createCard, addVote});
    });
});
