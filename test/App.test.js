import React from 'react';
import { shallow } from 'enzyme';
import App from '../src/App';
import Board from '../src/components/Board';
import chai from 'chai';

chai.should();

describe('App', function () {
    it('should have three empty columns as initial state', () => {
        const wrapper = shallow(<App />);
        const initialState = [{id:1, title:"Good", cards:[]}, {id:2, title:"Bad", cards:[]}, {id:3, title:"Next actions", cards:[]}];
        wrapper.state('columns').should.eql(initialState);
        wrapper.find(Board).get(0).props.columns.should.eql(initialState)
    });
    it('should add a card when the createCard function is invoked', function() {
        const wrapper = shallow(<App />);
        wrapper.find(Board).get(0).props.createCard({columnId:1, title:'title'});
        wrapper.state('columns').should.eql([{id:1, title:"Good", cards: [{id:1, title:'title', votes:0, createdByMe:true}]}, {id:2, title:"Bad", cards:[]}, {id:3, title:"Next actions", cards:[]}])
    });
    it('should add a vote to a card when the addVote function is invoked', function() {
        const wrapper = shallow(<App />);
        wrapper.find(Board).get(0).props.createCard({columnId:1, title:'title'});
        wrapper.find(Board).get(0).props.addVote(1);
        wrapper.state('columns').should.eql([{id:1, title:"Good", cards: [{id:1, createdByMe:true, title:'title', votes:1}]}, {id:2, title:"Bad", cards:[]}, {id:3, title:"Next actions", cards:[]}])
    });
});
