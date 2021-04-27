import React  from 'react';
import ReactDOM from 'react-dom';

import SelectableScoreWrapper from './containers/selectableScoreWrapper';

// ReactDOM.render(
//   <SelectableScoreWrapper
//   // vrvOptions={vrvOptions}
//   // zoomIn={onZoomIncrease}
//   // zoomOut={onZoomDecrease}
//   />,
//   document.querySelector(".container")
// );

ReactDOM.render(
  <div>
    <h1>Hello MELD (5)</h1>
    <div className="wrapscorepane">
      <React.StrictMode>
        <SelectableScoreWrapper
        // vrvOptions={vrvOptions}
        // zoomIn={onZoomIncrease}
        // zoomOut={onZoomDecrease}
        />,
      </React.StrictMode>
    </div>
  </div>
  , document.querySelector('.container')
);

