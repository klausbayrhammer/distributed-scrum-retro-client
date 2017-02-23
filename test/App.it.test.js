import React from 'react';
import { mount } from 'enzyme';
import chai from 'chai';
import App from '../src/App';
import Repository from '../src/repository/Repository';

chai.should();

function initializeRepository(initialState, appId) {
  return new Promise((resolve) => {
    const repository = new Repository({ initialState, appId });
    repository.onChange(resolve);
  });
}

describe('App', () => {
  it('renders without crashing', () => {
    mount(<App />);
  });
  it('should be able to display cards', async () => {
    const repository = await initializeRepository({
      G: {
        title: 'Good',
        cards: { card1: { title: 'title', votes: 0 } },
      },
    });
    const wrapper = mount(<App repository={repository} />);
    wrapper.find('.card__title').text().should.equal('title');
  });
});
