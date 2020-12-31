import React from 'react';
import ReactDOMServer from 'react-dom/server.js';
import react_test_pkg from '@testing-library/react';
import chai_pkg from "chai";
import jsdom from "mocha-jsdom";
import App from '../App.js';

const { render, screen } = react_test_pkg;
const { expect } = chai_pkg;

global.document = jsdom({
  url: "http://localhost:8080"
});

describe('Test hello-meld-1', () => {

    it('Check rendering of top-level <App> element', () => {
      const app_elem    = ( <App /> ) ;
      const header_elem = ( <h1>Hello MELD (1)</h1> );
      render(app_elem);
      const content = global.document.body.outerHTML;
      expect(content).to.contain(ReactDOMServer.renderToStaticMarkup(header_elem));
    });

});

