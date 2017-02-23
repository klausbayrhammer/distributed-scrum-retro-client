import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai from 'chai';
import CreateCard from '../../../src/components/CreateCard/CreateCard';

chai.should();
chai.use(sinonChai);

describe('create card', () => {
  it('should trigger the undoPrepareCreateCard repository method when the undoPrepareCreateCard button is clicked', () => {
    const repository = { undoPrepareCreateCard: sinon.stub() };
    const columnId = 5;
    const wrapper = shallow(<CreateCard repository={repository} columnId={columnId} />);

    wrapper.find('.create-card__undo-prepare-create-card').simulate('click');

    repository.undoPrepareCreateCard.should.have.been.calledWith(columnId);
  });
  it('should trigger the createCard repository method when the createCard button is clicked', () => {
    const repository = { createCard: sinon.stub() };
    const columnId = 5;
    const title = 'card-title';
    const wrapper = mount(<CreateCard repository={repository} columnId={columnId} />);

    wrapper.find('.create-card__title').simulate('change', { target: { value: title } });
    wrapper.find('.create-card__create-card').simulate('click');

    repository.createCard.should.have.been.calledWith({ columnId, title });
  });
});
