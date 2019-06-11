import React from 'react';
import EditTable from '../components/EditTable.jsx';
import EditField from '../components/EditField.jsx';

// edit container containing editField and editTable component
const Edit = (props) => {
  const {
    addNode,
    deleteNode,
    renderNode,
    clearGraph,
    schema,
    selectedNode,
    addField,
    deleteField,
  } = props;
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
};

export default Edit;
