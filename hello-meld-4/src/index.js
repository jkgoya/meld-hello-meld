import React  from 'react';
import ReactDOM from 'react-dom';

// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import ReduxPromise from 'redux-promise';

// import { reducers } from 'meld-clients-core/lib/reducers';
// import App from './App';

// const createStoreWithMiddleware = applyMiddleware(thunk, ReduxPromise)(createStore);

// const GRAPH_URI = "Hello_MELD.jsonld";

// <div className="wrapscorepane"> is for experimentation with CSS

import SelectableScoreWrapper from './containers/selectableScoreWrapper';

// Parameters for SelectableScore component
// ****************************************

// MEI_URI: Can be a full URI, e.g. obtained from the TROMPA Contributor Environment 
const MEI_URI = "Hello_MELD.mei" 

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
  <div>
    <h1>Hello MELD (4)</h1>
    <div className="wrapscorepane">
      <React.StrictMode>
        <SelectableScoreWrapper uri = { MEI_URI } vrvOptions = { vrvOptions }/>
      </React.StrictMode>
    </div>
  </div>
  , document.querySelector('.container')
);

// ReactDOM.render(
//   <div>
//     <h1>Hello MELD (4)</h1>
//     <div className="wrapscorepane">
//       <React.StrictMode>
//         <Provider store={createStoreWithMiddleware(reducers)}>
//           <App graphURI={GRAPH_URI} />
//         </Provider>
//       </React.StrictMode>
//     </div>
//   </div>
//   , document.querySelector('.container')
// );
