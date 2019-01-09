import React, { Component } from 'react';
import { connect } from 'react-redux';
// import * as errorAction from '../actions/errorActions';
import * as actions from '../actions/introspectionActions';
// import * as svgAction from '../actions/svgActions';
// import * as viewAction from '../actions/viewActions';
// import Type from '../components/Type.jsx';
import { FormGroup } from '@material-ui/core';
import Graph from 'react-graph-vis';
// import DataSet from 'vis/lib/DataSet';
import ReactDOM from 'react-dom';

const mapStateToProps = store => ({
  schema: store.root.schema,
  options: store.root.options,
  graph: store.root.graph,
  // events: store.root.events
})

const mapDispatchToProps = dispatch => ({
  selectedNode:(id) => dispatch(actions.selectedNode(id)),
})

// const nodes = new DataSet();
// const edges = new DataSet();

// Container component that contains type nodes 
class GraphContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    //   options: {
    //     edges: {
    //       smooth: true,
    //       // type: 'discrete',
    //       color: "#000000",
    //     },
    //     groups: {
    //       // Querys: {color: {background: 'grey'}},
    //       // Business: {color: {background: 'pink'}}
    //     },
    //     physics: {
    //       enabled:true,
    //       hierarchicalRepulsion: {
    //         nodeDistance: 160,
    //       }
    //     },
    //     interaction: { 
    //       hover: true,
    //       // multiselect: true, 
    //       dragView: true 
    //     }
    //   },
    //   graph: {
    //     nodes: [],
    //     edges: []
    //     // nodes: new DataSet(),
    //     // edges: new DataSet(),
    //   },
      events: {
        
        select: function(event) {
          const { nodes, edges } = event;
          console.log("Selected nodes: ", nodes);
          console.log("Selected edges: ", edges);
          this.props.selectedNode(nodes)
        }.bind(this),

      }
    }
  }
  

  // render() {
  //   // iterate through types from store and check for type kind
  //     // create a type node if it's an object
  //   if (!this.props.schema) return null;
  //   const typeList = this.props.schema.data.__schema.types.filter((type) => {
  //     return (
  //       type.name.charAt(0) !== "_" && type.name.charAt(1) !== "_" && 
  //       type.kind !== "INPUT_OBJECT" &&
  //       type.kind !== "SCALAR" && 
  //       type.kind !== "ENUM" && 
  //       (type.fields !== null || type.possibleTypes !== null) &&
  //       type.name.toLowerCase() !== "mutation")
  //     });
  //     const nodes = typeList.map(type => {
  //       // console.log(type)
  //     return <Type fields={type.fields} name={type.name} possibleTypes={type.possibleTypes}/>
  //   })

    // return(
    //     <div className="nodes">
    //         {nodes}
    //     </div>
    // )


  

  // componentDidUpdate() {
  //   console.log('updating');
  //     if (!this.props.schema) return null;
  //     const typeList = this.props.schema.data.__schema.types.filter((type) => {
  //       return (
  //         type.name.charAt(0) !== "_" && type.name.charAt(1) !== "_" && 
  //         type.kind !== "INPUT_OBJECT" &&
  //         type.kind !== "SCALAR" && 
  //         type.kind !== "ENUM" && 
  //         (type.fields !== null || type.possibleTypes !== null) &&
  //         type.name.toLowerCase() !== "mutation"
  //       )
  //     });
      
  //     // let typefield = new DataSet();
  //     // let createEdge = new DataSet();
  //     let newNodes = this.state.graph.nodes.slice();
  //     let newEdges = this.state.graph.edges.slice();
  
  //     typeList.forEach((type) => {
  //       newNodes.push({id: type.name, label: type.name, group: type.name, type: 'type'})
  //       // typefield.add(
  //       //   {id: type.name, label: type.name, group: type.name}
  //       // )
  //       type.fields.forEach((field) => {
  //         newNodes.push({id: `${type.name}${field.name}`, label: field.name, group: type.name, type: 'field'})
  
  //         newEdges.push({from: type.name, to: `${type.name}${field.name}`, arrows: "to"})
  //         //   {from: type.name, to: field.name, arrows: "to"})
  //         // typefield.add(
  //         //   {id: `${type.name}${field.name}`, label: field.name, group: type.name}
  //         // )
  //         // createEdge.add(
  //         //   // { from: "Query", to: "Querybusiness", arrows: "to" }, 
  //         //   {from: type.name, to: `${type.name}${field.name}`, arrows: "to"}
  //         // )
  //         // LIST
  //         if (field.type.kind === "LIST") {
  //           newEdges.push({from: `${type.name}${field.name}`, to: field.type.ofType.name, arrows: "to", dashes: true})
  //           // createEdge.add(
  //           //   {from: `${type.name}${field.name}`, to: field.type.ofType.name, arrows: "to", dashes: true}
  //           // )
  //         }
  //         // OBJECT
  //         if (field.type.kind === "OBJECT") {
  //           newEdges.push({from: `${type.name}${field.name}`, to: field.type.name, arrows: "to"})
  //           // createEdge.add(
  //           //   {from: `${type.name}${field.name}`, to: field.type.name, arrows: "to"}
  //           // )
  //         }
  //       })
  //     })
  //     this.setState ({
  //       graph: {
  //         nodes: newNodes,
  //         edges: newEdges,
  //       },
  //     });
  //     // const graph = document.getElementById('Graph');
  //     // ReactDOM.render(<Graph graph={this.state.graph} options={this.state.options} events={this.state.events} />, graph);
  // }
  

  render() { 
    /**
     * filter out proper fields from interspection to create overall Table
     */
    return (
      <div id="Graph" style={{ height: "100vh" }}>
        {/* <Type nodes={this.state.graph.nodes} edges={this.state.graph.edges} typeList={typeList} /> */}
        <Graph
          graph={this.props.graph}
          options={this.props.options}
          events={this.state.events}
        />
      </div>
    )
  }                  
}

export default connect(mapStateToProps, mapDispatchToProps)(GraphContainer);









// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import * as errorAction from '../actions/errorActions';
// import * as introspectionAction from '../actions/introspectionActions';
// import * as svgAction from '../actions/svgActions';
// import * as viewAction from '../actions/viewActions';
// import Type from '../components/Type.jsx';
// import { FormGroup } from '@material-ui/core';

// const mapStateToProps = store => ({
//   schema: store.root.schema
// })

// const mapDispatchToProps = dispatch => ({

// })

// class GraphContainer extends Component {
//   constructor(props) {
//       super(props);
//   }

//   render() {
//   // filter introspection query result to related type tables
//     // const typeList = this.props.schema.data.__schema.types.filter((type) => {
//     //   return (type.name.charAt(0) !== "_" && type.name.charAt(1) !== "_" && type.kind !== "SCALAR" && type.kind !== "ENUM" && type.name.toLowerCase() !== "mutation")
//     if (!this.props.schema) return null;
//     const typeList = this.props.schema.data.__schema.types.filter((type) => {
//       return (
//         type.name.charAt(0) !== "_" && type.name.charAt(1) !== "_" && 
//         type.kind !== "INPUT_OBJECT" &&
//         type.kind !== "SCALAR" && 
//         type.kind !== "ENUM" && 
//         (type.fields !== null || type.possibleTypes !== null) &&
//         type.name.toLowerCase() !== "mutation")
//     });

//     const nodes = typeList.map(type => {
//       // console.log(type)
//       return <Type fields={type.fields} name={type.name} possibleTypes={type.possibleTypes}/>
//     })

//     return(
//         <div className="nodes">
//             {nodes}
//         </div>
//     )
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(GraphContainer);
