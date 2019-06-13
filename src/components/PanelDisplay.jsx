import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// styling for material UI from line 10 - 36
const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#171E25',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    width: '100%',
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

// component to display the current selected type table and display all fields related to the type
const PanelDisplay = (props) => {
  const { selectedNode } = props;
  return (
    <Paper className="panelDisplay">
      <Table className="displayTable">
        <TableHead>
          <TableRow>
            <CustomTableCell>{(selectedNode.typeObject) ? selectedNode.typeObject.name : <span />}</CustomTableCell>
            <CustomTableCell align="right">Kind</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(selectedNode.typeObject) ? selectedNode.typeObject.fields.map((row) => {
            let ofType;
            if (row.type.ofType) {
              ofType = row.type.ofType;
              while (ofType.ofType) {
                ofType = ofType.ofType;
              }
            }
            return (
              <TableRow className="displayTableRow">
                <CustomTableCell component="th" scope="row">
                  {row.name}
                </CustomTableCell>
                <CustomTableCell align="right">{(row.type.kind === 'SCALAR') ? row.type.name : (row.type.kind === 'LIST') ? `[${row.type.ofType.name}]` : (row.type.kind === 'OBJECT') ? row.type.name : (ofType) ? ofType.name : ''}</CustomTableCell>
              </TableRow>
            );
          }) : <span />}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default withStyles(styles)(PanelDisplay);
