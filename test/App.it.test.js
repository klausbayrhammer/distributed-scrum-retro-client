import React from 'react';
import { mount } from 'enzyme';
import App from '../src/App';
import chai from 'chai';
chai.should();

describe('App', function () {
    it('renders without crashing', () => {
        mount(<App/>)
    });
    it('should be able to create a new card', () => {
        const wrapper = mount(<App/>);
        wrapper.find('.create-card__prepare-create-card').first().simulate('click');
        wrapper.find('.create-card__create-card').simulate('click');
        wrapper.state('repository').columns[0].cards.should.have.length(1);
    });
});
