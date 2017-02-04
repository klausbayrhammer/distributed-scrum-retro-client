import React from 'react';
import { shallow } from 'enzyme';
import Board from '../src/components/Board';
import App from '../src/App';
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
        const newCard = wrapper.state('columns')[0].cards[0]
        newCard.should.contain({title:'title', votes:0, createdByMe:true});
        newCard.id.should.not.be.undefined;
    });
    it('should add a vote to a card when the addVote function is invoked', function() {
        const wrapper = shallow(<App />);
        wrapper.state('columns')[0].cards.push({id:1, title:'title', votes:0});
        wrapper.find(Board).get(0).props.addVote(1);
        wrapper.state('columns')[0].cards.should.eql([{id:1, title:'title', votes:1}])
    });
    it('should remove a for a card when the removeVote function is invoked', function() {
        const wrapper = shallow(<App />);
         wrapper.state('columns')[0].cards.push({id:1, title:'title', votes:1});
        wrapper.find(Board).get(0).props.removeVote(1);
        wrapper.state('columns')[0].cards.should.eql([{id:1, title:'title', votes:0}])
    });
    it('should remove a card when the deleteCard function is invoked', function() {
        const wrapper = shallow(<App />);
        wrapper.state('columns')[0].cards.push({id:1, title:'title', votes:1});
        wrapper.find(Board).get(0).props.deleteCard(1);
        wrapper.state('columns')[0].cards.should.be.empty;
    });
});
