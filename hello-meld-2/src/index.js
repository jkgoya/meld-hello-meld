// This is a boilerplate index.js for MELD applications.
// The intent is that all application-specific logic can be pushed into the <App ...>
// component, where it is available for testing using Mocha, etc.
//
// It sets up a Redux store provider for the `meld-clients-core` functions used,
// providing the `reducers` instance defined by `meld-clients-core`.
//
// It assumes a `public/index.html` that defines an empty element with Id `root`,
// into which the App is rendered.
//

import React  from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';

import { reducers } from 'meld-clients-core/lib/reducers';

import ReduxApp from './ReduxApp';

const createStoreWithMiddleware = applyMiddleware(thunk, ReduxPromise)(createStore);

// import verovio_req from 'verovio' ;
// global.verovio = verovio_req ;

var verovio  = require( 'verovio' );
//global.verovio = verovio_req ;

// See: https://stackoverflow.com/a/15880109
// var globalscope = (function(){ return this }).call(null) ;

// See: https://stackoverflow.com/questions/9107240
//var globalscope = (function () { return this || (1, eval)('this'); }()) ;

// globalscope.verovio = verovio_req ;

function renderApp()
{
    ReactDOM.render( 
      <div>
        <React.StrictMode>
          <ReduxApp />
        </React.StrictMode>
      </div>
      , document.getElementById('root') );  
}

/* Wait for verovio to load */
verovio.module.onRuntimeInitialized = function ()
{
    // var vrvToolkit = new verovio_req.toolkit();
    // global.verovio = verovio_req ;
    // window.verovio = verovio_req ;
    console.log("global.verovio         "+verovio) ;
    console.log("global.verovio.toolkit "+verovio.toolkit) ;
    renderApp() ;
}

/*
ReactDOM.render( 
  <div>
    <React.StrictMode>
      <Provider store={createStoreWithMiddleware(reducers)} >
        <App />
      </Provider>
    </React.StrictMode>
  </div>
  , document.getElementById('root') );
*/

