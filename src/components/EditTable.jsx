import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class EditTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typeNameText: '',
    };
    this.handleNameText = this.handleNameText.bind(this);
  }

  handleNameText(event) {
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
              floatingLabelStyle={{ color: 'white' }}
              onChange={this.handleNameText}
              // className="typeNameText"
            />
            <br />
            <br />
            <div className="btn-EditTable">
              <Button
                variant="contained"
                color="primary"
                onClick={() => { addNode(this.state.typeNameText); clearGraph(); renderNode(); }}
              >
                Add Type
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => { deleteNode(this.state.typeNameText); clearGraph(); renderNode(); }}
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
