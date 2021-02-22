import React, { Component }  from 'react';

import { connect } from 'react-redux';
import { createStore, applyMiddleware, bindActionCreators } from 'redux';
// import thunk from 'redux-thunk';
// import ReduxPromise from 'redux-promise';

import { reducers } from 'meld-clients-core/lib/reducers';
import { registerTraversal, traverse, setTraversalObjectives, checkTraversalObjectives } 
       from 'meld-clients-core/lib/actions/index';
import { fetchGraph } from 'meld-clients-core/lib/actions/index';

import Score        from 'meld-clients-core/lib/containers/score';
import AudioPlayer  from 'meld-clients-core/lib/components/audioPlayer';

const MEI_URI = "Hello_MELD.mei";
const MP3_URI = "Hello_MELD.mp3";

// Options coped from selectable-score-demo...
// vrvOptions: If not supplied to <Score>, will default to predefined options
const vrvOptions = {  
  breaks: 'line',
  scale: 45,
  adjustPageHeight: 1,
  pageHeight: 2500,
  pageWidth: 2200,
  noFooter: 1,
  unit: 6
}

function App() {
  const audio = <AudioPlayer uri={ MP3_URI } />;
  const score = <Score uri = { MEI_URI } options = { vrvOptions } />;
  const app   = (
    <div id="meld_app">
      <h1>Hello MELD (2)</h1>
          {audio} {score}
    </div>
    ) ;
  return app ;
}

// export default App ;

function mapStateToProps({ graph , score, traversalPool}) {
    return { graph , score, traversalPool };
}

function mapDispatchToProps(dispatch) { 
    return bindActionCreators(
        { registerTraversal, traverse,
          setTraversalObjectives, checkTraversalObjectives, 
          fetchGraph 
        },
        dispatch
        );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

