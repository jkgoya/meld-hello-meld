import React from 'react';  // Needed for JSX
import ReactDOMServer from 'react-dom/server.js';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'

import ErrorBoundary from '../ErrorBoundary';
import ReduxApp from '../ReduxApp';

//import verovio from 'verovio' ;
//global.verovio = verovio ;
var verovio_req  = require( 'verovio' );
global.verovio = verovio_req ;

function test_hello_meld_2() {
  const div_app_elem = ( 
    <div data-testid="div_app_elem"> 
      <ErrorBoundary> 
        <ReduxApp /> 
      </ErrorBoundary> 
    </div> 
    ) ;
  const header_elem  = ( <h1>Hello MELD (2)</h1> );
  const header_html  = ReactDOMServer.renderToStaticMarkup(header_elem);
  render(div_app_elem);
  const test_html = screen.getByTestId('div_app_elem').outerHTML;
  expect(test_html).toContain(header_html);
}

describe('Test hello-meld-2', () => {
  test('Check rendering of top-level <ReduxApp> element', done => {

    /* Wait for verovio to load */
    verovio_req.module.onRuntimeInitialized = function ()
    {
        // var vrvToolkit = new verovio_req.toolkit();
        global.verovio = verovio_req ;
        test_hello_meld_2();
        done();
    }
  });
});

