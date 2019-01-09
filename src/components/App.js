import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import MainContainer from '../containers/MainContainer.jsx';
import '../styles/App.css';
import Wrapper from '../containers/GraphContainer.jsx'



class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='main'>
        {/* <h1>My React App! TESTING!</h1> */}
        {/* <div className='center'>
        <div className="glitch" data-text="Strobocops">

<span className="glitch__color glitch__color--red">GraphnomiQL</span>


<span className="glitch__line glitch__line--first"></span>
<span className="glitch__line glitch__line--second"></span>
</div>
        </div> */}
        <MainContainer />
      </div>
    );
  }
}

export default App;
