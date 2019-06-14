import React, { Component } from 'react';
import { connect } from 'react-redux';
import Graph from 'react-graph-vis';

import * as actions from '../actions/introspectionActions';

// take out options from mapstatetoprops
const mapStateToProps = store => ({
  schema: store.root.schema,
  // options: store.root.options,
  graph: store.root.graph,
});

const mapDispatchToProps = dispatch => ({
  selectedNode: id => dispatch(actions.selectedNode(id)),
});

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
          const { nodes } = event;
          this.props.selectedNode(nodes);
        }.bind(this),
      },
    };
  // edit options from this.props.options to this.options
  }

  render() {
    const { graph } = this.props;
    const { events } = this.state;
    return (
      <div id="Graph" style={{ height: '100vh' }}>
        <Graph
          graph={graph}
          options={this.graphOptions}
          events={events}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GraphContainer);
