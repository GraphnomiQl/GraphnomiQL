import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';

// styling for Material UI
const styles = theme => ({
  panelText: {
    color: 'white',
  },
  panelHelper: {
    color: 'lightsteelblue',
  },
});

// component for adding/deleting/editing fields
class EditField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldName: '',
      nodeName: '',
      typeKind: '',
      typeName: '',
      ofTypeKind: '',
      ofTypeName: '',
      dataTypeSelection: '',
    };
  }

  // event handler for recognizing inputted text into fieldName input and changing fieldName in state
  handleFieldName = (event) => {
    this.setState({ fieldName: event.target.value });
  }
  // event handler for recognizing inputted text into TypeName input and changing nodeName in state
  handleNodeName = (event) => {
    this.setState({ nodeName: event.target.value });
  }
  // event handler for checking selection of data type
  handleTypeOrOfType = (event) => {
    // if it is an object or a list, it would have an ofType relationship
    if (event.target.value === 'OBJECT' || event.target.value === 'LIST') {
      this.setState({
        dataTypeSelection: event.target.value,
        typeKind: event.target.value,
        ofTypeKind: 'OBJECT',
      });
    } else {
      const name = event.target.value.slice(7);
      this.setState({
        dataTypeSelection: event.target.value,
        typeKind: 'SCALAR',
        typeName: name,
      });
    }
  }

  // event handler for setting ofTypeName in state if the current field/type is an Object/List data type
  handleOfTypeName = (event) => {
    this.setState({
      ofTypeName: event.target.value,
    });
  }

  render() {
    const {
      addField,
      deleteField,
      renderNode,
      clearGraph,
    } = this.props;
    const {
      fieldName,
      nodeName,
      typeKind,
      typeName,
      ofTypeKind,
      ofTypeName,
      dataTypeSelection,
    } = this.state;
    return (
      <div className="center">
        <form>
          <br />
          <br />
          <br />
          <Typography
            variant="h6"
            className="panelText"
            id="panelFieldText"
          >
            Add/Delete Field
          </Typography>
          <br />
          <TextField
            label="Field Name"
            InputProps={{ id: 'panelFieldText' }}
            InputLabelProps={{ id: 'panelHelperText' }}
            onChange={this.handleFieldName}
          />
          <br />
          <br />
          <Typography
            variant="body1"
            className="panelText"
            id="panelFieldText"
          >
            to/from
          </Typography>
          <br />
          <TextField
            label="Type Name"
            InputProps={{ id: 'panelFieldText' }}
            InputLabelProps={{ id: 'panelHelperText' }}
            onChange={this.handleNodeName}
          />
          <br />
          <br />
          <Typography
            variant="body1"
            className="panelText"
            id="panelFieldText"
          >
            as (for addition only)
          </Typography>
          <br />
          <FormControl>
            <InputLabel htmlFor="data-type-helper" id="panelHelperText">Data Type</InputLabel>
            <Select
              value={dataTypeSelection}
              onChange={this.handleTypeOrOfType}
              id="panelHelperText"
              input={<Input name="data-type" id="panelHelperText" />}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="SCALAR/String">SCALAR/String</MenuItem>
              <MenuItem value="SCALAR/Boolean">SCALAR/Boolean</MenuItem>
              <MenuItem value="SCALAR/Float">SCALAR/Float</MenuItem>
              <MenuItem value="SCALAR/Int">SCALAR/Int</MenuItem>
              <MenuItem value="OBJECT">OBJECT</MenuItem>
              <MenuItem value="LIST">LIST</MenuItem>
            </Select>
            <FormHelperText id="panelHelperText">
              Enter relationship below if nonscalar
            </FormHelperText>
          </FormControl>
          <br />
          <br />
          <Typography
            variant="body1"
            className="panelText"
            id="panelFieldText"
          >
            of (OBJ/LIST only)
          </Typography>
          <br />
          <TextField
            label="Type Relation"
            InputProps={{ id: 'panelFieldText' }}
            InputLabelProps={{ id: 'panelHelperText' }}
            onChange={this.handleOfTypeName}
          />
          <br />
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              addField(fieldName, nodeName, typeKind, typeName, ofTypeKind, ofTypeName);
              clearGraph();
              renderNode();
            }}
          >
            Add Field
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              deleteField(fieldName, nodeName);
              clearGraph();
              renderNode();
            }}
          >
            Delete Field
          </Button>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(EditField);
