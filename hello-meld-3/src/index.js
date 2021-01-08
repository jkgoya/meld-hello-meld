import React  from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';

import { reducers } from 'meld-clients-core/lib/reducers';
import App from './App';

const createStoreWithMiddleware = applyMiddleware(thunk, ReduxPromise)(createStore);

const GRAPH_URI = "Hello_MELD.jsonld";

// <div className="wrapscorepane"> is for experimentation with CSS

ReactDOM.render(
  <div>
    <h1>Hello MELD (3)</h1>
    <div className="wrapscorepane">
      <React.StrictMode>
        <Provider store={createStoreWithMiddleware(reducers)}>
          <App graphURI={GRAPH_URI} />
        </Provider>
      </React.StrictMode>
    </div>
  </div>
  , document.querySelector('.container')
);

