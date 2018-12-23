import React, { Component } from 'react';
import ModalContainer from './ModalContainer.jsx';
import GraphContainer from './GraphContainer.jsx';

class MainContainer extends Component {
  render() {
    return (
      <div>
        Main Container is made here
        <ModalContainer />
        <GraphContainer />
      </div>
    );
  }
}


export default MainContainer;
