import React from 'react'
import EditTable from './EditTable.jsx';
import EditField from './EditField.jsx';

class Edit extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <EditTable addNode={this.props.addNode} deleteNode={this.props.deleteNode} renderNode={this.props.renderNode} clearGraph={this.props.clearGraph} schema={this.props.schema} selectedNode={this.props.selectedNode} />
        <EditField addField={this.props.addField} deleteField={this.props.deleteField} renderNode={this.props.renderNode} clearGraph={this.props.clearGraph} schema={this.props.schema} selectedNode={this.props.selectedNode} />

      </div>
    )
  }
}

export default Edit;
