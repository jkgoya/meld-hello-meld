import { render, screen } from '@testing-library/react';
import App from './App';

test('renders top-level App element', () => {
  render(<App />);
  const header_elem = (<h1>Hello MELD (1)</h1>);
  expect(header_elem).toBeInTheDocument();
});
