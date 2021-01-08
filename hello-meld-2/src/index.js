import React  from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
const createStoreWithMiddleware = applyMiddleware(thunk, ReduxPromise)(createStore);

import { reducers } from 'meld-clients-core/lib/reducers';
import App from './App';

// <div className="wrapscorepane"> is for experimentation with CSS
ReactDOM.render(
  <div>
    <h1>Hello MELD (2)</h1>
    <div className="wrapscorepane">
      <React.StrictMode>
        <Provider store={createStoreWithMiddleware(reducers)}>
          <App />
        </Provider>
      </React.StrictMode>
    </div>
  </div>
, document.getElementById('root')
);

