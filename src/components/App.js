import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import MainContainer from '../containers/MainContainer.jsx';
import '../styles/App.css';


class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='main'>
        <h1>My React App! TESTING!</h1>
        <MainContainer />
      </div>
    );
  }
}

export default App;
