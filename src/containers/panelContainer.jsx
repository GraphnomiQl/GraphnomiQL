import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

// entire side panel component
  // top - schema selection
  // middle - type info
  // botton - editing area
class Panel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="panel">
        <label>Select Your Schema Here!</label>
        <Button id="ChangeSchema" onClick={this.props.handleOpen}>Change Schema</Button>
      </div>
    )
  }
}

export default Panel;