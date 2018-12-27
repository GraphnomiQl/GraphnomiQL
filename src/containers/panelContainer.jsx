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
      <div className="panel">
        <div className="panelHeadingContainer">
          <h1 id="panelHeading">Welcome to GraphnomiQL!</h1>

        </div>

<div className='center'>
          <label>Select Your Schema Here!</label>
          <br />
          <br />
          <Button id="ChangeSchema" onClick={this.props.handleOpen}>Change Schema</Button>
        </div>
      </div>
    ) 
  }
}

export default Panel;