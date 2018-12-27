import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Edit from '../components/Edit.jsx';
import * as actions from '../actions/introspectionActions';

const mapStateToProps = store => ({
  // schema: store.root.schema
})

const mapDispatchToProps = dispatch => ({
  addNode: name => dispatch(actions.addNode(name)),
  deleteNode: name => dispatch(actions.deleteNode(name))
})
// entire side panel component
// top - schema selection
// middle - type info
// botton - editing area
class panelContainer extends Component {
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
        <Edit addNode={this.props.addNode} deleteNode={this.props.deleteNode} />
      </div>
    ) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(panelContainer);
