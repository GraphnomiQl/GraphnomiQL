import React from 'react';
import { connect } from 'react-redux';
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

import * as actions from '../actions/introspectionActions';


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
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

const mapStateToProps = store => ({
  schema: store.root.schema
});
//mapDespacitoToProps
const mapDispatchToProps = dispatch => ({
  changeSchema: schema => dispatch(actions.changeSchema(schema)),
});

class ModalContainer extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   open: true,
    //   uploadedText: '',
    //   currentSchema: '',
    // };
    // this.handleSelectSchema = this.handleSelectSchema.bind(this);
    // this.handleClose = this.handleClose.bind(this);
    // this.handleOpen = this.handleOpen.bind(this);
    // this.handleUpload = this.handleUpload.bind(this);
    // this.handleSchema = this.handleSchema.bind(this);
  }

  // handleSelectSchema(event) {
  //   this.setState({ currentSchema: event.target.value });
  // }

  // handleOpen() {
  //   this.setState({ open: true });
  // }

  // handleClose() {
  //   this.setState({ open: false });
  // }

  // handleUpload(event) {
  //   this.setState({ uploadedText: event.target.value });
  // }

  // handleSchema() {
  //   this.setState({ currentSchema: uploadedText })
  // }



  render() {
    const { classes, open, currentSchema, uploadedText, handleClose, handleUpload, handleSelectSchema, changeSchema } = this.props;

    return (
      <div>
        {/* <Button id="ChangeSchema" onClick={this.handleOpen}>Change Schema</Button> */}
        <Modal id="ModalContainer"
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
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
                  value={currentSchema}
                  onChange={handleSelectSchema}
                  input={<Input name="schema" id="schema-helper" />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="shopify">Shopify</MenuItem>
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
                  onChange={handleUpload}
                />
                <br />
                <br />
                <textarea
                  placeholder="Insert Introspection Result Here"
                />
                <Button onClick={() => { changeSchema(currentSchema, uploadedText); handleClose(); }}>
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

const SimpleModalWrapped = withStyles(styles)(ModalContainer);

export default connect(mapStateToProps, mapDispatchToProps)(SimpleModalWrapped);

// SimpleModal.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// We need an intermediary variable for handling the recursive nesting.
// import React, { Component } from 'react';

// class ModalComponent extends Component {
//   render() {
//     return (
//       <div>Modal Component</div>
//     );
//   }
// }


// export default ModalComponent;
