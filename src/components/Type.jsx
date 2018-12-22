import React from 'react';

const Type = (props) => {
  const { name, fields } = props;
  const fieldList = fields.map(field => (
    <tr>
      <td>{field.name}</td>
      <td>{ (field.type.kind === 'SCALAR') ? field.type.kind : (field.type.kind === 'LIST') ? `[${field.type.ofType.name}]` : field.type.name }</td>
    </tr>
  ))

  return (
    <div className="nodeDisplay">
      <table>
        <thead>{name}</thead>
        <tbody>{fieldList}</tbody>
      </table>
    </div>
  )
}

export default Type;
