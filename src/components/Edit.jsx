import React from 'react';

import EditTable from './EditTable.jsx';
import EditField from './EditField.jsx';

class Edit extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      addNode,
      deleteNode,
      renderNode,
      clearGraph,
      schema,
      selectedNode,
      addField,
      deleteField,
    } = this.props;
    return (
      <div>
        <EditTable
          addNode={addNode}
          deleteNode={deleteNode}
          renderNode={renderNode}
          clearGraph={clearGraph}
          schema={schema}
          selectedNode={selectedNode}
        />
        <EditField
          addField={addField}
          deleteField={deleteField}
          renderNode={renderNode}
          clearGraph={clearGraph}
          schema={schema}
          selectedNode={selectedNode}
        />
      </div>
    );
  }
}

export default Edit;
