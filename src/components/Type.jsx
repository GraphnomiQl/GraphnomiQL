import React from 'react';

const Type = (props) => {
  const { name, fields, possibleTypes } = props;
  if (fields !== null) {
    const fieldList = fields.map(field => (
    <tr>
      <td>{field.name}</td>
      <td>{ (field.type.kind === 'SCALAR') ? field.type.kind : (field.type.kind === 'LIST') ? `[${field.type.ofType.name}]` : field.type.name }</td>
    </tr>
  )) 
  return fieldList
}
  // if (!fields) {
  //   const possibleTypesList = possibleTypes.map(possibleTypes)
  // }

  return (
    <div className="nodeDisplay">
      <table className="table">
        <thead className="heading">{name}</thead>
        <tbody className="rows">{fieldList}</tbody>
      </table>
    </div>
  )
}

export default Type;
