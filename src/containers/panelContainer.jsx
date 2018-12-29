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
  deleteNode: name => dispatch(actions.deleteNode(name)),
  addField: (fieldName, nodeName, typeKind, typeName, ofTypeKind, ofTypeName) => dispatch(actions.addField(fieldName, nodeName, typeKind, typeName, ofTypeKind, ofTypeName)),
  deleteField: (nodeName, fieldName) => dispatch(actions.deleteField(nodeName, fieldName))
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
        {/* <div className="panelHeadingContainer"> */}
        {/* <h1 id="panelHeading">Welcome to GraphnomiQL!</h1> */}
        <div id="panelHeading">
        <div className="glitch" data-text="Strobocops">

          <span className="glitch__color glitch__color--red">GraphnomiQL</span>


          <span className="glitch__line glitch__line--first"></span>
          <span className="glitch__line glitch__line--second"></span>
        </div>
        
        <br />
       
        </div>
        {/* </div> */}
        <br />
        <br />
        <div className='center'>
          <label>Select Your Schema Here!</label>
          <br />
          <br />
          <Button id="ChangeSchema" onClick={this.props.handleOpen}>Change Schema</Button>
        </div>
        <Edit addNode={this.props.addNode} deleteNode={this.props.deleteNode} addField={this.props.addField} deleteField={this.props.deleteField} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(panelContainer);
