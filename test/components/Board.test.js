import 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import Board from '../../src/components/Board';
import Column from '../../src/components/Column';

chai.should();

describe('board', () => {
  it('should render multiple columns', () => {
    const repository = {
      columns: [
        { title: 'title1', cards: [1] },
        { title: 'title2', cards: [2] }],
    };

    const wrapper = shallow(Board({ repository }));

    wrapper.find(Column).get(0).props.should.eql({ column: { title: 'title1', cards: [1] }, repository });
    wrapper.find(Column).get(1).props.should.eql({ column: { title: 'title2', cards: [2] }, repository });
  });
});
