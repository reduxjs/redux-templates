import React from 'react';
import { fireEvent, render, screen } from '../../test-utils';
import { Counter } from './Counter';

test('render counter', () => {
  render(<Counter />);

  expect(screen.getByText('0')).toBeInTheDocument();
});

test('decrement count', () => {
  render(<Counter />);
  fireEvent.click(screen.getByLabelText(/decrement value/i));

  expect(screen.getByText('-1')).toBeInTheDocument();
});

test('increment count', () => {
  render(<Counter />);
  fireEvent.click(screen.getByLabelText(/increment value/i));

  expect(screen.getByText('1')).toBeInTheDocument();
});

test('add by amount', () => {
  render(<Counter />);
  fireEvent.click(screen.getByText(/add amount/i));

  expect(screen.getByText('2')).toBeInTheDocument();
});

test('add async', async () => {
  render(<Counter />);

  fireEvent.click(screen.getByText(/add async/i));
  await screen.findByText('2');

  expect(screen.getByText('2')).toBeInTheDocument();
});

test('add if odd', () => {
  render(<Counter />);

  fireEvent.click(screen.getByText(/add if odd/i));
  expect(screen.getByText('0')).toBeInTheDocument();

  fireEvent.click(screen.getByLabelText(/increment value/i));
  fireEvent.click(screen.getByText(/add if odd/i));

  expect(screen.getByText('3')).toBeInTheDocument();
});
