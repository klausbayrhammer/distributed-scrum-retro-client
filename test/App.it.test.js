import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../src/App';
import chai from 'chai';
chai.should();

describe('App', function () {
    it('renders without crashing', () => {
        mount(<App/>)
    });
    it('should be able to create a new card', () => {
        const wrapper = shallow(<App/>);
        wrapper.find('.column__create-card').first().simulate('click');
        wrapper.state('repository').columns[0].cards.should.have.length(0);
    });
});
