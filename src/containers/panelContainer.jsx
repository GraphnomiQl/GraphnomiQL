import React, { Component } from 'react';
import { connect } from 'react-redux';

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
      <div>
      <label>Select Your Schema Here!</label>
      
      </div>
    )
  }
}

export default Panel;