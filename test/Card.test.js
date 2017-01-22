import TestUtils from 'react-addons-test-utils';
import React from 'react';
import Card from '../src/components/Card';
import chai from 'chai';
chai.should();

describe('ethe card', () => {
    it('should render the title of a card', () => {
        const result = TestUtils.renderIntoDocument(<Card title="title"/>);
        TestUtils.findRenderedDOMComponentWithClass(result, 'card__title').textContent.should.equal('title');
    });

    it('should render the votecount of a card', () => {
        const result = TestUtils.renderIntoDocument(<Card votes="4"/>);
        TestUtils.findRenderedDOMComponentWithClass(result, 'card__votes').textContent.should.equal('4');
    });
    it('should render the created-by-me class if a card was created by this user', () => {
        const result = TestUtils.renderIntoDocument(<Card created-by-me="true"/>);
        TestUtils.findRenderedDOMComponentWithClass(result, 'card').classList.contains('card--created-by-me').should.be.true;
    });
    it('should not render the created-by-me class if a card was not created by this user', () => {
        const result = TestUtils.renderIntoDocument(<Card/>);
        TestUtils.findRenderedDOMComponentWithClass(result, 'card').classList.contains('card--created-by-me').should.be.false;
    });
});
