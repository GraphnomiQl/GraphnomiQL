import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as errorAction from '../actions/errorActions';
import * as introspectionAction from '../actions/introspectionActions';
import * as svgAction from '../actions/svgActions';
import * as viewAction from '../actions/viewActions';

import panelContainer from './panelContainer.jsx';
import modalContainer from './modalContainer.jsx';
import Type from '../components/Type.jsx';
import { FormGroup } from '@material-ui/core';

const mapStateToProps = store => ({
  schema: store.root.schema
})

const mapDispatchToProps = dispatch => ({

})

class GraphContainer extends Component {
  constructor(props) {
      super(props);
  }

  render() {
  // filter introspection query result to related type tables
    const typeList = this.props.schema.data.__schema.types.filter((type) => {
      return (type.name.charAt(0) !== "_" && type.name.charAt(1) !== "_" && type.kind !== "SCALAR" && type.kind !== "ENUM" && type.name.toLowerCase() !== "mutation")
    });

    const nodes = typeList.map(type => {
      return <Type fields={type.fields} name={type.name} />
    })

    return(
        <div className="nodes">
          {nodes}
        </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GraphContainer);