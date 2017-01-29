import React from 'react';
import { shallow } from 'enzyme';
import Card from '../src/components/Card';
import chai from 'chai';
chai.should();

describe('ethe card', () => {
    it('should render the title of a card', () => {
        const wrapper = shallow(<Card title="title"/>);
        wrapper.find('.card__title').text().should.equal('title');
    });

    it('should render the votecount of a card', () => {
        const wrapper = shallow(<Card votes="4"/>);
        wrapper.find('.card__votes').text().should.equal('4');
    });
    it('should render the created-by-me class if a card was created by this user', () => {
        const wrapper = shallow(<Card created-by-me="true"/>);
        wrapper.find('.card').hasClass('card--created-by-me').should.be.true;
    });
    it('should not render the created-by-me class if a card was not created by this user', () => {
        const wrapper = shallow(<Card/>);
        wrapper.find('.card').hasClass('card--created-by-me').should.be.false;
    });
});
