import React from 'react';
import ReactDOMServer from 'react-dom/server.js';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import App from '../App.js';

describe('Test hello-meld-1', () => {

  test('Check rendering of top-level <App> element', () => {
    const div_app_elem    = ( <div data-testid="div_app_elem"> <App /> </div> ) ;
    const header_elem = ( <h1>Hello MELD (1)</h1> );
    const header_html = ReactDOMServer.renderToStaticMarkup(header_elem);
    render(div_app_elem);
    const test_app_elem = screen.getByTestId('div_app_elem');
    expect(test_app_elem.innerHTML).toContain(header_html);
  });

  test('Check rendering of top-level <App> element contains <h1> element', () => {
    const div_app_elem    = ( <div data-testid="div_app_elem"> <App /> </div> ) ;
    render(div_app_elem);
    const test_app_elem = screen.getByTestId('div_app_elem');
    expect(test_app_elem.children[0].nodeName).toBe("H1");
  });

  test('Check rendering of top-level <App> element contains expected text content', () => {
    const div_app_elem    = ( <div data-testid="div_app_elem"> <App /> </div> ) ;
    render(div_app_elem);
    const test_app_elem = screen.getByTestId('div_app_elem');
    expect(test_app_elem).toHaveTextContent('Hello MELD (1)');
  });

});

