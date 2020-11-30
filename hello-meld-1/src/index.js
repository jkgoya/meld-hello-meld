import React  from 'react';
import ReactDOM from 'react-dom';
import App from './App';

/*
ReactDOM.render(
  <h1>Hello MELD (1)</h1>
		, document.querySelector('.container')
);
*/

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
