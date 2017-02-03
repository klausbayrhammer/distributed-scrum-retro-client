import React from 'react';
import { shallow } from 'enzyme';
import App from '../src/App';
import Board from '../src/components/Board';
import chai from 'chai';

chai.should();

describe('App', function () {
    it('should have three empty columns as initial state', () => {
        const wrapper = shallow(<App />);
        const initialState = [{title:"Good"}, {title:"Bad"}, {title:"Next actions"}];
        wrapper.state('columns').should.eql(initialState);
        wrapper.find(Board).get(0).props.columns.should.eql(initialState)
    });
});
