import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Edit from '../components/Edit.jsx';
import * as actions from '../actions/introspectionActions';
import PanelDisplay from '../components/PanelDisplay.jsx';


const { buildClientSchema, printSchema, buildSchema } = require('graphql');
const fs = require('fs');
const path = require('path');

const { dialog } = require('electron').remote;

const mapStateToProps = store => ({
  schema: store.root.schema,
  selectedNode: store.root.selectedNode,
});

const mapDispatchToProps = dispatch => ({
  addNode: name => dispatch(actions.addNode(name)),
  deleteNode: name => dispatch(actions.deleteNode(name)),
  addField: (fieldName, nodeName, typeKind, typeName, ofTypeKind, ofTypeName) => dispatch(actions.addField(fieldName, nodeName, typeKind, typeName, ofTypeKind, ofTypeName)),
  deleteField: (nodeName, fieldName) => dispatch(actions.deleteField(nodeName, fieldName)),
  renderNode: () => dispatch(actions.renderNode()),
  clearGraph: () => dispatch(actions.clearGraph()),
});

class panelContainer extends Component {
  constructor(props) {
    super(props);
    this.handleExportCode = this.handleExportCode.bind(this);
    this.handleExportServer = this.handleExportServer.bind(this);
  }

  // to save schema code to local FS
  handleExportCode(schema) {
    const newSchema = schema.data;
    for (let i = 0; i < newSchema.__schema.directives.length; i += 1) {
      if (!newSchema.__schema.directives[i].locations) {
        newSchema.__schema.directives[i].locations = [];
      }
    }
    const graphqlSchemaObj = printSchema(buildClientSchema(newSchema));

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
      });
    });
  }

  // to save server code to local FS
  handleExportServer() {
    const serverCode = fs.readFileSync(path.join(__dirname, "../server.js"))
    dialog.showSaveDialog((filename) => {
      if (filename === undefined) {
        alert("Please create server file name");
        return;
      }

      fs.writeFile(filename, serverCode, (err) => {
        if (err) {
          console.log('error ocurred ', err.message);
          return;
        }
      });
    });
  }

  render() {
    return (
      <div className="panel">
        <br />
        <div id="panelHeading">
          <div className="glitch" data-text="Strobocops">
            <span className="glitch__color glitch__color--red">GraphnomiQL</span>
            <span className="glitch__line glitch__line--first" />
            <span className="glitch__line glitch__line--second" />
          </div>
          <br />
        </div>
        <br />
        <br />
        <div className="center">
          <label>Select Your Schema Here!</label>
          <br />
          <br />
          <Button id="ChangeSchema" onClick={this.props.handleOpen}>Change Schema</Button>
          <br />
          <br />
          <Button
            variant="contained"
            color="primary"
            id="ExportCode"
            onClick={() => { this.handleExportCode(this.props.schema); }}
          >
          Export Schema
          </Button>
          <Button
            variant="contained"
            color="secondary"
            id="ExportServer"
            onClick={this.handleExportServer}
          >
            Export Server
          </Button>
        </div>
        <br />
        <br />
        <div className="panelTable">
          <PanelDisplay selectedNode={this.props.selectedNode} />
        </div>
        <Edit schema={this.props.schema} selectedNode={this.props.selectedNode} addNode={this.props.addNode} deleteNode={this.props.deleteNode} addField={this.props.addField} deleteField={this.props.deleteField} renderNode={this.props.renderNode} clearGraph={this.props.clearGraph} />
        <br />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(panelContainer);
