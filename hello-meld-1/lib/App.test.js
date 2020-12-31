import { render, screen } from '@testing-library/react';
import App from './App';
test('renders top-level App element', () => {
  render( /*#__PURE__*/React.createElement(App, null));
  const header_elem = /*#__PURE__*/React.createElement("h1", null, "Hello MELD (1)");
  expect(header_elem).toBeInTheDocument();
});