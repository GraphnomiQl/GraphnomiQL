import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import Clipboard from 'react-clipboard.js';
import { introspectionQuery } from 'graphql/utilities';


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
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmptpy: {
    marginTop: theme.spacing.unit * 2,
  },
});

class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      currentSchema: '',
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
        <Button onClick={this.handleOpen}>Change Schema</Button>
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
            <form>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="schema-helper">Schema</InputLabel>
                <Select
                  value={this.state.currentSchema}
                  input={<Input name="schema" id="schema-helper" />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="yelp">Yelp</MenuItem>
                  <MenuItem value="custom">Custom</MenuItem>
                </Select>
                <FormHelperText>Select Custom to visualize your own schema</FormHelperText>
                <Typography variant="body1" id="custom-schema-instruction-1">
                  If you have custom schema selected, please copy and send introspection to server, then paste result into text box
                </Typography>
                <textarea
                  value={introspectionQuery}
                  readOnly
                />
                <br />
                <br />
                <textarea
                  placeholder="Insert Introspection Result Here"
                />
                <Button>
                  Visualize Schema
                </Button>
                {/* <Clipboard
                  component="a"
                  className="copy-button"
                  data-clipboard-text={introspectionQuery}
                >
                  {introspectionQuery}
                </Clipboard> */}
              </FormControl>
            </form>
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
