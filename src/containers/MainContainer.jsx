import React, { Component } from 'react';
import Modal from '../components/Modal.jsx';
import GraphContainer from './GraphContainer.jsx';
import PanelContainer from './PanelContainer.jsx';

// MainContainer wraps all container components
class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      uploadedText: '',
      currentSchema: '',
      selectedSchema: false,
    };
  }

  // handles selection of demo chema from the modal
  handleSelectSchema = (event) => {
    this.setState({ currentSchema: event.target.value });
  }

  // handles opening of modal
  handleOpen = () => {
    this.setState({ open: true });
  }

  // handles closing of modal
  handleClose = () => {
    this.setState({ open: false });
  }

  // handles uploaded schema
  handleUpload = (event) => {
    this.setState({ uploadedText: event.target.value });
  }

  // updates current schema to be the uploaded schema
  handleSchema = () => {
    this.setState({ currentSchema: uploadedText });
  }

  // changes schema from side panel 'change schema' button
  handleSelectedSchema = () => {
    this.setState({ selectedSchema: false });
    setTimeout(function() {this.setState({ selectedSchema: true })}.bind(this), 500);
  }

  render() {
    const {
      open,
      uploadedText,
      currentSchema,
      selectedSchema,
    } = this.state;
    return (
      <div>
        <Modal
          open={open}
          uploadedText={uploadedText}
          currentSchema={currentSchema}
          handleOpen={this.handleOpen}
          handleClose={this.handleClose}
          handleSchema={this.handleSchema}
          handleUpload={this.handleUpload}
          handleSelectSchema={this.handleSelectSchema}
          handleSelectedSchema={this.handleSelectedSchema}
        />
        {selectedSchema ? <GraphContainer /> : <div />}
        <PanelContainer handleOpen={this.handleOpen} />
      </div>
    );
  }
}


export default MainContainer;
