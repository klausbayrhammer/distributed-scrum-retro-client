import React from 'react';
import { shallow } from 'enzyme';
import Board from '../src/components/Board';
import App from '../src/App';
import chai from 'chai';
import sinon from 'sinon';

chai.should();

describe('App', function () {
    it('should have three empty columns as initial state', () => {
        const wrapper = shallow(<App />);
        const initialState = [{id:1, title:"Good", cards:[]}, {id:2, title:"Bad", cards:[]}, {id:3, title:"Next actions", cards:[]}];
        wrapper.state('repository').columns.should.eql(initialState);
        wrapper.find(Board).get(0).props.repository.columns.should.eql(initialState);
    });
    it('should update the apps state if the repositories notifies the app about changes', () => {
        const newState = 'newState';
        const repository = {onChange: obs => obs(newState)};

        const wrapper = shallow(<App repository={repository}/>);

        wrapper.state('repository').should.equal('newState');
    });
});
