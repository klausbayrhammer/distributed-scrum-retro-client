import PrepareCreateCard from '../../../src/components/CreateCard/PrepareCreateCard'
import {shallow} from 'enzyme';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai from 'chai';

chai.should();
chai.use(sinonChai);

describe('create card', function () {
    it('should trigger the prepareCreateCard repository method when the createCard button is clicked', function () {
        const repository = {prepareCreateCard: sinon.stub()}
        const columnId = 5;
        const wrapper = shallow(PrepareCreateCard({repository, columnId}));

        wrapper.find('.create-card__prepare-create-card').simulate('click');

        repository.prepareCreateCard.should.have.been.calledWith(columnId);
    });
});