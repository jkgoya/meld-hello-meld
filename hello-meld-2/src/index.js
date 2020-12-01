import React  from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';

import { reducers } from 'meld-clients-core/lib/reducers';
import Score        from 'meld-clients-core/lib/containers/score';
import AudioPlayer  from 'meld-clients-core/lib/components/audioPlayer';

const createStoreWithMiddleware = applyMiddleware(thunk, ReduxPromise)(createStore);

const MEI_URI = "Hello_MELD.mei";
const MP3_URI = "Hello_MELD.mp3";

// Options coped from selectable-score-demo...
// vrvOptions: If not supplied to <SelectableScore>, will default to predefined options
const vrvOptions = {  
  breaks: 'line',
  scale: 45,
  adjustPageHeight: 1,
  pageHeight: 2500,
  pageWidth: 2200,
  noFooter: 1,
  unit: 6
}

// <div className="wrapscorepane"> is used for some experiments with CSS
ReactDOM.render(
  <div>
    <h1>Hello MELD (2)</h1>
    <div className="wrapscorepane">
      <Provider store={createStoreWithMiddleware(reducers)}>
        <AudioPlayer uri={ MP3_URI } />
        <Score uri = { MEI_URI } options = { vrvOptions } />
      </Provider>
      <div className="renderscorepane">
      </div>
    </div>
  </div>
  , document.querySelector('.container')
);

