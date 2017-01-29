import React from 'react';
import { mount } from 'enzyme';
import App from '../src/App';

describe('New test', function () {
    it('renders without crashing', () => {
        mount(<App/>)
    });
});
