import React from 'react';
import {shallow} from 'enzyme';
import Card from '../../src/components/Card';
import Column from '../../src/components/Column';
import CreateCardWrapper from '../../src/components/CreateCard/Wrapper';
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
        const wrapper = shallow(Column({column: {title:"column title"}}));
        wrapper.find('.column__title').text().should.equal('column title');
    });
    it('should be possible to create a new card', () => {
        const repository = sinon.stub();
        const wrapper = shallow(Column({column: {id:15, createCard:true}, repository}));
        wrapper.find(CreateCardWrapper).get(0).props.should.eql({columnId:15, createCard:true, repository})
    });

    it('should render multiple cards', () => {
        const repository = sinon.stub();
        const cards = [
            {title: 'title1', votes: 1},
            {title: 'title2', votes: 2, createdByMe: true}];

        const wrapper = shallow(Column({column: {cards}, repository}));

        wrapper.find(Card).get(0).props.should.eql({card: {title: 'title1', votes: 1}, repository});
        wrapper.find(Card).get(1).props.should.eql({card: {title: 'title2', votes: 2, createdByMe: true}, repository});
    });
});
