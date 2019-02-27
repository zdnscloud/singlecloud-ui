import React from 'react';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {
  makeSelectCreateIsOpen,
  makeSelectCreateFormData,
} from './selectors';
import * as actions from './actions';

class CreateClusterDialog extends React.Component {
  render() {
    const {
      isOpen,
      formData,
      createCluster,
      closeCreateCluster,
      updateCreateForm,
    } = this.props;

    return (
      <Dialog
        open={isOpen}
        onClose={closeCreateCluster}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create a Cluster</DialogTitle>
        <DialogContent>
          <DialogContentText>
            add a cluster
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Cluster Name"
            type="text"
            value={formData.get('name')}
            onChange={(evt) => updateCreateForm('name', evt.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeCreateCluster} color="secondary">
            Cancel
          </Button>
          <Button onClick={createCluster} color="primary" variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isOpen: makeSelectCreateIsOpen(),
  formData: makeSelectCreateFormData(),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...actions,
}, dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateClusterDialog);
