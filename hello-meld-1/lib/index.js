import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
/*
ReactDOM.render(
  <h1>Hello MELD (1)</h1>
		, document.querySelector('.container')
);
*/

ReactDOM.render( /*#__PURE__*/React.createElement(React.StrictMode, null, /*#__PURE__*/React.createElement(App, null)), document.getElementById('root'));