import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/introspectionActions';
import { FormGroup } from '@material-ui/core';
import Graph from 'react-graph-vis';
import ReactDOM from 'react-dom';
// take out options from mapstatetoprops
const mapStateToProps = store => ({
  schema: store.root.schema,
  // options: store.root.options,
  graph: store.root.graph,
});

const mapDispatchToProps = dispatch => ({
  selectedNode: id => dispatch(actions.selectedNode(id)),
});
// pass entire options object from store to this.options here

// GraphContainer contains entire graph using react-graph-vis
class GraphContainer extends Component {
  constructor(props) {
    super(props);
    // necessary for vis nodes to function
    this.graphOptions = {
      edges: {
        smooth: true,
        // type: 'discrete',
        color: '#000000',
      },
      nodes: {
        color: {
          background: '#FFFFFF',
        },
      },
      physics: {
        enabled: true,
        hierarchicalRepulsion: {
          nodeDistance: 160,
        },
      },
      layout: {
        improvedLayout: false
     },
      interaction: {
        hover: true,
        dragView: true,
      },
    };
    // allow selection of nodes to be saved into store
    this.state = {
      events: {
        select: function(event) {
          const { nodes, edges } = event;
          this.props.selectedNode(nodes)
        }.bind(this),
      }
    }
  // edit options from this.props.options to this.options
  }

  render() {
    return (
      <div id="Graph" style={{ height: '100vh' }}>
        <Graph
          graph={this.props.graph}
          options={this.graphOptions}
          events={this.state.events}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GraphContainer);
