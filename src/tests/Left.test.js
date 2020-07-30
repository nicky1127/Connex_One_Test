import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Left from '../components/Left';

afterEach(cleanup);

describe('Left', () => {
  it('Snapshot matchs', () => {
    const tree = renderer.create(<Left />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
