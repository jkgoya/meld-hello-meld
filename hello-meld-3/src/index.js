import React  from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';

import { reducers } from 'meld-clients-core/lib/reducers';
import App from './app';

const createStoreWithMiddleware = applyMiddleware(thunk, ReduxPromise)(createStore);

const GRAPH_URI = "Hello_MELD.jsonld";

// <div className="wrapscorepane"> is used for some experiments with CSS

ReactDOM.render(
  <div>
    <h1>Hello MELD (3)</h1>
    <div className="wrapscorepane">
      <Provider store={createStoreWithMiddleware(reducers)}>
				<App graphURI={GRAPH_URI} />
      </Provider>
    </div>
  </div>
  , document.querySelector('.container')
);

