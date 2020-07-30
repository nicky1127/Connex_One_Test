import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Header from '../components/Header';

afterEach(cleanup);

describe('Header', () => {
  it('Snapshot matchs', () => {
    const tree = renderer.create(<Header />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
