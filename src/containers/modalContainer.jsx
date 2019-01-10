import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import { introspectionQuery } from 'graphql/utilities';

import * as actions from '../actions/introspectionActions';

// styling for material ui: lines 20 - 50;
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
// grabbing schema from the store
const mapStateToProps = store => ({
  schema: store.root.schema,

});
// add connection of actions onto the components
const mapDispatchToProps = dispatch => ({
  changeSchema: (introspection, text) => dispatch(actions.changeSchema(introspection, text)),
  renderNode: () => dispatch(actions.renderNode()),
  clearGraph: () => dispatch(actions.clearGraph()),
});

class ModalContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      classes,
      open,
      currentSchema,
      uploadedText,
      handleClose,
      handleUpload,
      handleSelectSchema,
      changeSchema,
      handleSelectedSchema,
      renderNode,
      clearGraph,
    } = this.props;

    return (
      <div>
        {/* <Button id="ChangeSchema" onClick={this.handleOpen}>Change Schema</Button> */}
        {/* render modal here */}
        <Modal
          className="model-container"
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
                  <MenuItem value="pokemon">Pokemon</MenuItem>
                  <MenuItem value="shopify">Shopify</MenuItem>
                  <MenuItem value="starwars">Star Wars</MenuItem>
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
                  onChange={handleUpload}
                />
                <Button onClick={() => { changeSchema(currentSchema, uploadedText); handleClose(); handleSelectedSchema(); clearGraph(); renderNode(); }}>
                  Visualize Schema
                </Button>
              </FormControl>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}
// material ui - wrapping modal container with the material ui styling
const SimpleModalWrapped = withStyles(styles)(ModalContainer);

export default connect(mapStateToProps, mapDispatchToProps)(SimpleModalWrapped);
