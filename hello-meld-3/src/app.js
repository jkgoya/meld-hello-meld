import React, { Component }  from 'react';
import { connect } from 'react-redux' ;
import { bindActionCreators } from 'redux';
import { registerTraversal, traverse, setTraversalObjectives, checkTraversalObjectives } from 'meld-clients-core/lib/actions/index';
import { prefix as pref } from 'meld-clients-core/lib/library/prefixes';
import { fetchGraph } from 'meld-clients-core/lib/actions/index';

import Score        from 'meld-clients-core/lib/containers/score';
import AudioPlayer  from 'meld-clients-core/lib/components/audioPlayer';

const MAX_TRAVERSERS = 2;


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

class App extends Component { 

    constructor(props) {
        super(props);

        this.props.setTraversalObjectives([
            {
                "@type": pref.meldterm + "MEIManifestation"
            },
            {
                "@type": pref.meldterm + "AudioManifestation"
            }
        ]);

        this.state = {
            mp3_uri: null,
            mei_uri: null
        };
    }

    componentDidMount(){
        // See: https://reactjs.org/docs/react-component.html#componentdidmount
        if(this.props.graphURI){
            this.props.registerTraversal(this.props.graphURI, {numHops: 0, noProp: "unused"});
        }
    }

    componentDidUpdate(prevProps, prevState){
        // See: https://reactjs.org/docs/react-component.html#componentdidupdate
        if(prevProps && "graph" in prevProps) {
            if ( this.graphComponentDidUpdate(this.props, prevProps, prevState ) ) {
                var mp3, mei;
                if(this.props.graph.outcomes && this.props.graph.outcomes[0]
                     && this.props.graph.outcomes[0]['@graph'].length){
                    mei = this.props.graph.outcomes[0]['@graph'][0]['@id'];
                }
                if(this.props.graph.outcomes && this.props.graph.outcomes[1]
                     && this.props.graph.outcomes[1]['@graph'].length){
                    mp3 = this.props.graph.outcomes[1]['@graph'][0]['@id'];
                }
                this.setState({ mp3_uri: mp3, mei_uri: mei });
            }
        }
    }

    graphComponentDidUpdate(props, prevProps, prevState) {
        var prevPool = prevProps.traversalPool;
        var thisPool = props.traversalPool;
        var updated  = false;
        if (prevPool.running === 1 && thisPool.running ===0){
            // check our traversal objectives if the graph has updated
            props.checkTraversalObjectives(
                props.graph.graph, props.graph.objectives);
            updated = true;
        } else if ( Object.keys(thisPool.pool).length && thisPool.running < MAX_TRAVERSERS) {
            // Initiate next traverser in pool...
            var uri = Object.keys(thisPool.pool)[0];
            props.traverse(uri, thisPool.pool[uri]);
            if (prevProps.graph.outcomesHash !== props.graph.outcomesHash) {
                updated = true;
            }
        } else if ( props.traversalPool.running===0 ) {
            if(prevProps.graph.outcomesHash !== props.graph.outcomesHash) {
                updated = true;
            }
        }
        return updated;
    }

    render() {
        console.log(this.props, this.state);
        var loading = !(this.state.mp3_uri || this.state.mei_uri) ?
            <div>Loading...</div> : false;
        var Audio = this.state.mp3_uri ?
            <AudioPlayer uri={ this.state.mp3_uri } /> : false;
        var MEI = this.state.mei_uri ?
            <Score uri={ this.state.mei_uri } options={vrvOptions} /> : false;
        return (
            <div>
                {loading} {Audio} {MEI}
            </div>
        );
    }
}

function mapStateToProps({ graph , score, traversalPool}) {
    return { graph , score, traversalPool };
}

function mapDispatchToProps(dispatch) { 
    return bindActionCreators({ registerTraversal, traverse,
                                                            setTraversalObjectives,
                                                            checkTraversalObjectives, fetchGraph },
                                                        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

