import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as errorAction from '../actions/errorActions';
import * as introspectionAction from '../actions/introspectionActions';
import * as svgAction from '../actions/svgActions';
import * as viewAction from '../actions/viewActions';

import panelContainer from './panelContainer.jsx';
import modalContainer from './modalContainer.jsx';
import TableDisplay from '../components/TableDisplay.jsx';
import { FormGroup } from '@material-ui/core';

const mapStateToProps = store => ({

})

const mapDispatchToProps = dispatch => ({

})

class GraphContainer extends Component {
  constructor(props) {
      super(props);
  }
  render() {
    return(
        <div className="tableDisplay">
            <TableDisplay />
        </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GraphContainer);