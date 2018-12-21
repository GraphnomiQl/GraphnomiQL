import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';


function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }


  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Typography gutterBottom>Click to get the full Modal experience!</Typography>
        <Button onClick={this.handleOpen}>Open Modal</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h3" id="modal-title">
              GraphnomiQL
            </Typography>
            <Typography variant="h6" id="simple-modal-description">
              Select Demo or Custom Schema
            </Typography>
            <SimpleModalWrapped />
          </div>
        </Modal>
      </div>
    );
  }
}

// SimpleModal.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(ModalComponent);

export default SimpleModalWrapped;
// import React, { Component } from 'react';

// class ModalComponent extends Component {
//   render() {
//     return (
//       <div>Modal Component</div>
//     );
//   }
// }


// export default ModalComponent;
