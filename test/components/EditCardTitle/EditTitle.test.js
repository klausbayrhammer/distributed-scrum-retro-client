import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai from 'chai';
import EditTitle from '../../../src/components/EditCardTitle/EditTitle';

chai.should();
chai.use(sinonChai);

describe('edit title card', () => {
  it('should trigger the undoEditCard repository method when the undoEditCard button is clicked', () => {
    const repository = { undoEditCard: sinon.stub() };
    const cardId = 5;
    const wrapper = shallow(<EditTitle repository={repository} cardId={cardId}/>);

    wrapper.find('.edit-title__undo-edit-title').simulate('click');

    repository.undoEditCard.should.have.been.calledWith(cardId);
  });
  it('should show the cards title as the textfields value', () => {
    const wrapper = shallow(<EditTitle title="title"/>);

    wrapper.find('.edit-title__title').props().value.should.equal('title');
  });

  it('should trigger the editCardTitle repository method when the editTitle button is clicked', () => {
    const repository = { editCardTitle: sinon.stub() };
    const cardId = 5;
    const title = 'card-title';
    const wrapper = mount(<EditTitle repository={repository} cardId={cardId} />);

    wrapper.find('.edit-title__title').simulate('change', { target: { value: title } });
    wrapper.find('.edit-title__edit-card-title').simulate('click');

    repository.editCardTitle.should.have.been.calledWith(cardId, title);
  });
});
