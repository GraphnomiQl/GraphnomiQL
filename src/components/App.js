import React, { Component } from 'react';
import MainContainer from '../containers/MainContainer.jsx';
import '../styles/App.css';

// main root component of the application; contains container of all components
class App extends Component {
  render() {
    return (
      <div className='main'>
        <MainContainer />
      </div>
    );
  }
}

export default App;
