import { render, screen } from '@testing-library/react';
import App from './App';

test('renders top-level App element', () => {
  const app_elem    = <App />;
  const header_elem = ( <h1>Hello MELD (1)</h1> );
  render(app_elem);
  expect(header_elem).toBeInTheDocument();
});

