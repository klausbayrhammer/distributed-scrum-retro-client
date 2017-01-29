import React from 'react';
import {shallow} from 'enzyme';
import Card from '../../src/components/Card';
import Column from '../../src/components/Column';
import chai from 'chai';

chai.should();

describe('column', () => {
    it('should render a column', () => {
        const wrapper = shallow(<Column />);
        wrapper.find('.column').should.to.have.length(1);
    });

    it('should render a column title', () => {
        const wrapper = shallow(<Column title="column title"/>);
        wrapper.find('.column__title').text().should.equal('column title');
    });

    it('should render multiple cards', () => {
        const cards = [
            {title: 'title1', votes: 1},
            {title: 'title2', votes: 2, createdByMe: true}];

        const wrapper = shallow(<Column cards={cards}/>);

        wrapper.find(Card).get(0).props.should.eql({title: 'title1', votes: 1});
        wrapper.find(Card).get(1).props.should.eql({title: 'title2', votes: 2, createdByMe: true});
    });
});
