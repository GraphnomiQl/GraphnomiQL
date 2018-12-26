import React from 'react';
import styles from '../styles/App.css';

const Type = (props) => {
  const { name, fields, possibleTypes } = props;
  if (fields !== null) {
    const fieldList = fields.map(field => (
      <tr className="rows">
        <td className="col1">{field.name}</td>
        <td className="col2">{ (field.type.kind === 'SCALAR') ? field.type.name : (field.type.kind === 'LIST') ? `[${field.type.ofType.name}]` : field.type.name }</td>
      </tr>
    ));
    return (
      <div className="node-containers">
        <table className="table">
          <thead className="heading">{name}</thead>
          <tbody className="body">{fieldList}</tbody>
        </table>
      </div>
    )
  }
  // if (!fields) {
  //   const possibleTypesList = possibleTypes.map(possibleTypes)
  // }
  // return (
  //   <div className="nodeDisplay">
  //     <table className="table">
  //       <thead className="heading">{name}</thead>
  //       <tbody className="rows">{fieldList}</tbody>
  //     </table>
  //   </div>
  // )
}

export default Type;
