// import React from 'react';
// import { DataSet, Network} from 'react-graph-vis';

// const Type = (props) => {
//   const { nodes, edges, typeList } = props;
//   typeList.forEach((type,i) => {
//     let typefield = new vis.DataSet() 
//     typefield.add([
//       {id:type.name, label: type.name, group: type.name}
//     ])   
//     type.fields.forEach((fields) => {
//       typefield.add([
//         {id: `${type.name}${type.fields.name}`, label: }
//       ])
//   })
  
  // const { name, fields, possibleTypes } = props;
  // if (fields !== null) {
  //   const fieldList = fields.map(field => (
  //     <tr className="rows"></tr>
  //       <td className="col1">{field.name}</td>
  //       <td className="col2">{ (field.type.kind === 'SCALAR') ? field.type.name : (field.type.kind === 'LIST') ? `[${field.type.ofType.name}]` : field.type.name }</td>
  //     </tr>
  //   ));
  //   return (
  //     <div className="node-containers">
  //       <table  className="table">
        
  //         <thead colSpan={2} className="heading" >{name}</thead>
        
  //         <tr>
  //         <tbody className="body">{fieldList}</tbody>
  //         </tr> 
  //       </table>
  //     </div>
  //   )
  // }
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
// }

// export default Type;
