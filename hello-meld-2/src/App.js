import React  from 'react';
// import ReactDOM from 'react-dom';

// meld-client-core components
// import { reducers } from 'meld-clients-core/lib/reducers';

import { connect } from 'react-redux' ;

import Score        from 'meld-clients-core/lib/containers/score';
import AudioPlayer  from 'meld-clients-core/lib/components/audioPlayer';

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

class App extends React.Component {
  render() {
    const audio = <AudioPlayer uri={ MP3_URI } />;
    const score = <Score uri = { MEI_URI } options = { vrvOptions } />;
    return ( <div> {audio} {score} </div> );
  }
}

/*
function App() {
  const audio = <AudioPlayer uri={ MP3_URI } />;
  const score = <Score uri = { MEI_URI } options = { vrvOptions } />;
  return ( <div> {audio} {score} </div> );
}
*/


// Hook up with Redux store, exporting connected App
const mapStateToProps = (state, ownProps) => ({
  // This component has no properties
})

export default connect(mapStateToProps, null)(App);

/*
export default App ;
*/
