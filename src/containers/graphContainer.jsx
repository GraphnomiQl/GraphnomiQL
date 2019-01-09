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
})

const mapDispatchToProps = dispatch => ({
  selectedNode:(id) => dispatch(actions.selectedNode(id)),
})
// pass entire options object from store to this.options here
class GraphContainer extends Component {
  constructor(props) {
    super(props);
    this.graphOptions = {
      edges: {
        smooth: true,
        // type: 'discrete',
        color: "#000000",
      },
      nodes:{
        color: {
          background: '#FFFFFF'
        }
      },
      physics: {
        enabled:true,
        hierarchicalRepulsion: {
          nodeDistance: 160,
        }
      },
      interaction: { 
        hover: true,
        // multiselect: true, 
        dragView: true 
      }
    };
    this.state = {
      events: {
        select: function(event) {
          const { nodes, edges } = event;
          console.log("Selected nodes: ", nodes);
          console.log("Selected edges: ", edges);
          this.props.selectedNode(nodes)
        }.bind(this),
      }
    }
    //edit options from this.props.options to this.options
  }
  render() { 
    return (
      <div id="Graph" style={{ height: "100vh" }}>
        <Graph
          graph={this.props.graph}
          options={this.graphOptions}
          events={this.state.events}
        />
      </div>
    )
  }                  
}

export default connect(mapStateToProps, mapDispatchToProps)(GraphContainer);
