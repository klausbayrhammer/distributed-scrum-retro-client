import React from 'react';
import {mount} from 'enzyme';
import App from '../src/App';
import chai from 'chai';
import Repository from '../src/FirebaseRepository';
chai.should();

function initializeRepository(initialState, appId) {
    return new Promise(resolve => {
        const repository = new Repository({initialState, appId});
        repository.onChange(resolve);
    });
}

describe('App', function () {
    it('renders without crashing', () => {
        mount(<App/>)
    });
    it('should be able to display cards', () => {
        initializeRepository({G: {title: "Good", cards: {card1: {title: "title", votes: 0}}}}).then(repository => {
            const wrapper = mount(<App repository={new Repository}/>);
            wrapper.find('.card__title').text().should.equal('title');
        });
    });
});
