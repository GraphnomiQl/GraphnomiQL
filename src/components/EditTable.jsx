import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

// edit table component; includes input for inputting type name and add / delete button to delete or add type table
class EditTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typeNameText: '',
    };
  }

  // event handler for updating local state with inputted type name
  handleNameText = (event) => {
    this.setState({ typeNameText: event.target.value });
  }

  render() {
    const {
      addNode,
      deleteNode,
      renderNode,
      clearGraph,
      selectedNode,
    } = this.props;
    const { typeNameText } = this.state;
    return (
      <div className="edit">
        <br />
        <br />
        <br />
        <form>
          <div className="center">
            <Typography id="panelTypeText">
              Add/Delete Table
            </Typography>
            <br />
            <br />
            <TextField
              label="Type"
              id="panelTypeText"
              InputLabelProps={{ id: 'panelTypeText' }}
              InputProps
              floatingLabelStyle={{ color: 'white' }}
              onChange={this.handleNameText}
            />
            <br />
            <br />
            <div className="btn-EditTable">
              <Button
                variant="contained"
                color="primary"
                onClick={() => { addNode(typeNameText); clearGraph(); renderNode(); }}
              >
                Add Type
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => { deleteNode(typeNameText); clearGraph(); renderNode(); }}
              >
                Delete Type
              </Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default EditTable;
