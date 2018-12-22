import React, { Component } from 'react';
import ModalComponent from '../components/ModalComponent.jsx';
import GraphContainer from './graphContainer.jsx';

class MainContainer extends Component {
  render() {
    return (
      <div>
        Main Container is made here
        <ModalComponent />
        <GraphContainer />
      </div>
    );
  }
}


export default MainContainer;
