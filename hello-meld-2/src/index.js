import React  from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';

import { reducers } from 'meld-clients-core/lib/reducers';
import Score from 'meld-clients-core/lib/containers/score';

const createStoreWithMiddleware = applyMiddleware(thunk, ReduxPromise)(createStore);

// Options coped from selectable-score-demo...
const MEI_URI = "test.mei" 
// vrvOptions: If not supplied to <SelectableScore>, will default to predefined options
const vrvOptions = {  
  scale: 45,
  adjustPageHeight: 1,
  pageHeight: 2500,
  pageWidth: 2200,
  noFooter: 1,
  unit: 6
}


ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <h1>Hello MELD (2)</h1>
    <Score uri = { MEI_URI } key="xyzzy" vrvOptions = { vrvOptions }/>
  </Provider>
  , document.querySelector('.container')
);


