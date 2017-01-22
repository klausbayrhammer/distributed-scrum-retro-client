import TestUtils from 'react-addons-test-utils';
import React from 'react';
import Card from '../src/components/Card';
import chai from 'chai';
chai.should();

describe('ethe card', () => {
    it('should render a card', () => {
        const cardState = {title: 'title'};
        let result = TestUtils.renderIntoDocument(<Card card={cardState}/>);
        TestUtils.findRenderedDOMComponentWithClass(result, 'title').textContent.should.equal('title');
    });
});
