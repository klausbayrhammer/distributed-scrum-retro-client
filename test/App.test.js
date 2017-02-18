import React from 'react';
import { shallow } from 'enzyme';
import chai from 'chai';
import Board from '../src/components/Board';
import App from '../src/App';

chai.should();

describe('App', () => {
  it('should update the apps state if the repositories notifies the app about changes', () => {
    const newState = 'newState';
    const repository = { onChange: obs => obs(newState) };

    const wrapper = shallow(<App repository={repository} />);

    wrapper.state('repository').should.equal(newState);
    wrapper.find(Board).get(0).props.repository.should.eql(newState);
  });
});
