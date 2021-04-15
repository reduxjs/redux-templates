import React from 'react';
import App from './App';
import { render } from './test-utils';

test('renders learn react link', () => {
  const { getByText } = render(<App />);

  expect(getByText(/learn/i)).toBeInTheDocument();
});
