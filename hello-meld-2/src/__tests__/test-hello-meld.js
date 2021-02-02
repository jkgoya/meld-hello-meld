import React from 'react';  // Needed for JSX
import ReactDOMServer from 'react-dom/server.js';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'

import App from '../App';

describe('Test hello-meld-2', () => {

  test('Check rendering of top-level <App> element', () => {
    const div_app_elem = ( <div data-testid="div_app_elem"> <App /> </div> ) ;
    const header_elem  = ( <h1>Hello MELD (2)</h1> );
    const header_html  = ReactDOMServer.renderToStaticMarkup(header_elem);
    render(div_app_elem);
    const test_html = screen.getByTestId('div_app_elem').outerHTML;
    expect(test_html).toContain(header_html);
  });

});

