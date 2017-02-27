import chai from 'chai';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import EditCardTitle from '../../../src/components/EditCardTitle/';
import EditTitle from '../../../src/components/EditCardTitle/EditTitle';

chai.should();

describe('board', () => {
  it('should render the title if editCard is false', () => {
    const wrapper = shallow(EditCardTitle({ title: 'title' }));
    wrapper.find('.card__title').text().should.equal('title');
    wrapper.find(EditTitle).exists().should.be.false;
  });

  it('should trigger the editCard function when clicking on the title', () => {
    const repository = { editCard: sinon.stub() }
    const wrapper = shallow(EditCardTitle({ title: 'title', cardId: 5, repository }));
    wrapper.find('.card__title').simulate('click').should.equal('title');
    repository.editCard.should.have.been.calledWith(5);
  });


  it('should render the EditTitle component if editCard is set', () => {
    const repository = sinon.stub();
    const wrapper = shallow(EditCardTitle({ cardId: 5, title: 'title', editCard: true, repository }));

    wrapper.find('.card__title').exists().should.be.false;
    wrapper.find(EditTitle).props().should.eql({ cardId: 5, title: 'title', repository });
  });
});
