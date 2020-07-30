import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Main from '../pages/Main';

afterEach(cleanup);

describe('Main', () => {
  it('Snapshot matchs', () => {
    const tree = renderer.create(<Main />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
