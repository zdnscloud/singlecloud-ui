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

import { makeSelectCreateIsOpen, makeSelectCreateFormData } from './selectors';
import * as actions from './actions';

class CreateNamespaceDialog extends React.Component {
  render() {
    const {
      isOpen,
      formData,
      createNamespace,
      closeCreateNamespace,
      updateCreateForm,
    } = this.props;

    return (
      <Dialog
        open={isOpen}
        onClose={closeCreateNamespace}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create a Namespace</DialogTitle>
        <DialogContent>
          <DialogContentText>add a namespace</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Namespace Name"
            type="text"
            value={formData.get('name')}
            onChange={(evt) => updateCreateForm('name', evt.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeCreateNamespace} color="secondary">
            Cancel
          </Button>
          <Button onClick={createNamespace} color="primary" variant="contained">
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

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateNamespaceDialog);
