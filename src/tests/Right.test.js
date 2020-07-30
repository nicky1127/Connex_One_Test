import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Right from '../components/Right';

afterEach(cleanup);

describe('Right', () => {
  it('Snapshot matchs', () => {
    const tree = renderer.create(<Right />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
