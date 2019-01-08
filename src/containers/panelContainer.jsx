import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Edit from '../components/Edit.jsx';
import * as actions from '../actions/introspectionActions';
import PanelDisplay from '../components/PanelDisplay.jsx';
// import newSchema from '../../newSchema.json'

const { buildClientSchema, printSchema, buildSchema } = require("graphql");
const fs = require("fs");
const path = require("path")

const { dialog } = require('electron').remote;

const mapStateToProps = store => ({
  schema: store.root.schema,
  selectedNode: store.root.selectedNode,
})

const mapDispatchToProps = dispatch => ({
  addNode: name => dispatch(actions.addNode(name)),
  deleteNode: name => dispatch(actions.deleteNode(name)),
  addField: (fieldName, nodeName, typeKind, typeName, ofTypeKind, ofTypeName) => dispatch(actions.addField(fieldName, nodeName, typeKind, typeName, ofTypeKind, ofTypeName)),
  deleteField: (nodeName, fieldName) => dispatch(actions.deleteField(nodeName, fieldName)),
  renderNode: () => dispatch(actions.renderNode()),
  clearGraph: () => dispatch(actions.clearGraph())
})
// entire side panel component
// top - schema selection
// middle - type info
// botton - editing area

class panelContainer extends Component {
  constructor(props) {
    super(props);
    this.handleExportCode = this.handleExportCode.bind(this);
    this.handleExportServer = this.handleExportServer.bind(this);
  }
  handleExportCode(schema) {
    // console.log('nihao schema: ', schema)
    let newSchema = schema.data;
    const graphqlSchemaObj = printSchema(buildClientSchema(newSchema));
    // console.log(graphqlSchemaObj);
    // var jsonStr = JSON.stringify(graphqlSchemaObj);
    // fs.writeFileSync('newSchema.json', graphqlSchemaObj);
    // let content = fs.readFileSync(path.join(__dirname, "../../newSchema.json"), "utf8");

    dialog.showSaveDialog((filename) => {
      if (filename === undefined) {
        alert("Please create file name");
        return;
      }

      fs.writeFile(filename, graphqlSchemaObj, (err) => {
        if (err) {
          console.log('error ocurred ', err.message);
          return;
        }
      })
    })
  }

  // handleExportServer() {
  //   // console.log('nihao schema: ', schema)
  //   let serverCode = fs.readFileSync(path.join(__dirname, "test.js"))
  //   dialog.showSaveDialog((filename) => {
  //     if (filename === undefined) {
  //       alert("Please create server file name");
  //       return;
  //     }

  //     fs.writeFile(filename, serverCode, (err) => {
  //       if (err) {
  //         console.log('error ocurred ', err.message);
  //         return;
  //       }
  //     })
  //   }) 
  // }

  render() {
    return (
      <div className="panel">
        {/* <div className="panelHeadingContainer"> */}
        {/* <h1 id="panelHeading">Welcome to GraphnomiQL!</h1> */}
        <div id="panelHeading">
        <div className="glitch" data-text="Strobocops">

          <span className="glitch__color glitch__color--red">GraphnomiQL</span>


          <span className="glitch__line glitch__line--first"></span>
          <span className="glitch__line glitch__line--second"></span>
        </div>
        
        <br />
        </div>
        {/* </div> */}
        <br />
        <br />
        <div className='center'>
          <label>Select Your Schema Here!</label>
          <br />
          <br />
          <Button id="ChangeSchema" onClick={this.props.handleOpen}>Change Schema</Button>
          <Button id="ExportCode" onClick={() => {this.handleExportCode(this.props.schema)}}>Export Code</Button>
          <Button id="ExportServer" onClick={this.handleExportServer}>Export Server File</Button>
        </div>
        <PanelDisplay selectedNode={this.props.selectedNode} />
        <Edit schema={this.props.schema} addNode={this.props.addNode} deleteNode={this.props.deleteNode} addField={this.props.addField} deleteField={this.props.deleteField} renderNode={this.props.renderNode} clearGraph={this.props.clearGraph}/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(panelContainer);
