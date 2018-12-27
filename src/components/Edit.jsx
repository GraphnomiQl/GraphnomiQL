import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typeNameText: '',
    };
    this.handleNameText = this.handleNameText.bind(this);
  }

  handleNameText(event) {
    this.setState({ typeNameText: event.target.value })
  }

  render() {
    const { addNode, deleteNode } = this.props;
    return (
      <div className="edit">
        <form>
          <Typography variant="h6">
            Add/Delete Table
          </Typography>
          <TextField
            label="Type"
            onChange={this.handleNameText}
            className="fieldNameText"
          />
          <Button
            onClick={() => { addNode(this.state.typeNameText); }}
          >
            Add Type
          </Button>
          <Button
            onClick={() => { deleteNode(this.state.typeNameText); }}
          >
            Delete Type
          </Button>
        </form>
      </div>
    );
  }
}

export default Edit;
