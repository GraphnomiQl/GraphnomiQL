import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';


class EditField extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fieldName: "",
            nodeName: "",
            typeKind: "",
            typeName: "",
            ofTypeKind: "",
            ofTypeName: "",
            dataTypeSelection: "",
        }
        this.handleFieldName = this.handleFieldName.bind(this);
        this.handleNodeName = this.handleNodeName.bind(this);
        this.handleTypeOrOfType = this.handleTypeOrOfType.bind(this);
        this.handleOfTypeName = this.handleOfTypeName.bind(this);
    }

    handleFieldName() {

    }

    handleNodeName() {

    }

    handleTypeOrOfType() {

    }

    handleOfTypeName() {

    }

    render() {
        return (
            <div className="center">
                <form>
                    <br/>
                    <br/>
                    <br/>
                    <Typography variant='h6'>
                        Add/Delete Field
                  </Typography>
                    <TextField
                        label='Field Name'
                        onChange={this.handleFieldName}
                    />
                    <br />
                    <Typography variant='body1'>
                <br/>
                        to/from
                    </Typography>
                    <br />
                    <TextField
                        label='Type Name'
                        onChange={this.handleNodeName}
                    />
                    <br />
                    <Typography variant='body1'>
                    <br/>
                        as (for addition only)
                    </Typography>
                    <FormControl>
                        <InputLabel htmlFor="data-type-helper">Data Type</InputLabel>
                        <Select
                            value={this.state.dataTypeSelection}
                            onChange={this.handleTypeOrOfType}
                            input={<Input name="data-type" id="data-type-helper" />}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="SCALAR/String">SCALAR/String</MenuItem>
                            <MenuItem value="SCALAR/Boolean">SCALAR/Boolean</MenuItem>
                            <MenuItem value="SACLAR/Float">SACLAR/Float</MenuItem>
                            <MenuItem value="SCALAR/Int">SCALAR/Int</MenuItem>
                            <MenuItem value="OBJECT">OBJECT</MenuItem>
                            <MenuItem value="LIST">LIST</MenuItem>
                        </Select>
                        <FormHelperText>Enter relationship below if nonscalar</FormHelperText>
                    </FormControl>
                </form>
            </div>
        )
    }
}

export default EditField;
