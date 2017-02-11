import React from 'react';
import {mount} from 'enzyme';
import App from '../src/App';
import chai from 'chai';
import Repository from '../src/Repository';
chai.should();

describe('App', function () {
    it('renders without crashing', () => {
        mount(<App/>)
    });
    it('should be able to create a new card', () => {
        const wrapper = mount(<App repository={new Repository}/>);
        wrapper.find('.create-card__prepare-create-card').first().simulate('click');
        wrapper.find('.create-card__title').simulate('change', {target: {value: 'title'}});
        wrapper.find('.create-card__create-card').simulate('click');
        wrapper.state('repository').columns[0].cards.should.have.length(1);
        wrapper.state('repository').columns[0].cards[0].title.should.equal('title');
    });

    it('should be able to create and vote for a card', () => {
        const wrapper = mount(<App  repository={new Repository}/>);
        wrapper.find('.create-card__prepare-create-card').first().simulate('click');
        wrapper.find('.create-card__title').simulate('change', {target: {value: 'title'}});
        wrapper.find('.create-card__create-card').simulate('click');
        wrapper.find('.card__add-vote').simulate('click');
        wrapper.state('repository').columns[0].cards[0].votes.should.equal(1);
    });
});
