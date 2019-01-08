import React, { Component } from 'react';
import ModalContainer from './ModalContainer.jsx';
import GraphContainer from './GraphContainer.jsx';
import PanelContainer from './PanelContainer.jsx';

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      uploadedText: '',
      currentSchema: '',
      selectedSchema: false,
    };
    this.handleSelectSchema = this.handleSelectSchema.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleSchema = this.handleSchema.bind(this);
    this.handleSelectedSchema = this.handleSelectedSchema.bind(this);
  }
  handleSelectSchema(event) {
    this.setState({ currentSchema: event.target.value });
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleUpload(event) {
    this.setState({ uploadedText: event.target.value });
  }

  handleSchema() {
    this.setState({ currentSchema: uploadedText })
  }
/**
 * changes schema from side panel 'change schema' button  
 */
  handleSelectedSchema() {
    this.setState({ selectedSchema: false });
    setTimeout(function() {this.setState({ selectedSchema: true })}.bind(this), 500)
  }

  render() {
    return (
      <div>
        <ModalContainer open={this.state.open} uploadedText={this.state.uploadedText} currentSchema={this.state.currentSchema} handleOpen={this.handleOpen} handleClose={this.handleClose} handleSchema={this.handleSchema} handleUpload={this.handleUpload} handleSelectSchema={this.handleSelectSchema} handleSelectedSchema={this.handleSelectedSchema} />
        {this.state.selectedSchema ? <GraphContainer /> : <div />}
        <PanelContainer handleOpen={this.handleOpen} />
      </div>
    );
  }
}


export default MainContainer;
