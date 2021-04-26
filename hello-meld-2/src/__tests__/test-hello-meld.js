import React from 'react';  // Needed for JSX
import ReactDOMServer from 'react-dom/server.js';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'

import ReduxApp from '../ReduxApp';

import verovio from 'verovio' ;
// var verovio = require( 'verovio' );

describe('Test hello-meld-2', () => {

  test('Check rendering of top-level <ReduxApp> element', () => {
    const div_app_elem = ( <div data-testid="div_app_elem"> <ReduxApp /> </div> ) ;
    const header_elem  = ( <h1>Hello MELD (2)</h1> );
    const header_html  = ReactDOMServer.renderToStaticMarkup(header_elem);
    render(div_app_elem);
    const test_html = screen.getByTestId('div_app_elem').outerHTML;
    expect(test_html).toContain(header_html);
  });

});

