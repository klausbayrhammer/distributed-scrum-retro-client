import React from 'react';
import Wrapper from '../../../src/components/CreateCard/Wrapper';
import PrepareCreateCard from '../../../src/components/CreateCard/PrepareCreateCard';
import CreateCard from '../../../src/components/CreateCard/CreateCard';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import chai from 'chai';
chai.should();

describe('create card', function () {
    it('should render the prepare-create-card component if no prepareCard prop is set', function () {
        const repository = sinon.stub();
        const columnId = 5;

        const wrapper = shallow(<Wrapper repository={repository} columnId={columnId}/>);

        wrapper.find(PrepareCreateCard).get(0).props.should.eql({repository, columnId});
        wrapper.find(CreateCard).exists().should.be.false;
    });
    it('should render the create-card component if the createCard prop is set', function () {
        const repository = sinon.stub();
        const columnId = 5;

        const wrapper = shallow(<Wrapper repository={repository} columnId={columnId} createCard={true}/>);

        wrapper.find(CreateCard).get(0).props.should.eql({repository, columnId});
        wrapper.find(PrepareCreateCard).exists().should.be.false;
    });
});