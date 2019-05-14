import React from 'react';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import messages from './messages';
import {
  makeSelectCreateIsOpen,
  makeSelectCreateFormData,
} from './selectors';
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
        <DialogTitle id="form-dialog-title">
          <FormattedMessage {...messages.dialogTitle} />
        </DialogTitle>
        <DialogContent style={{ minWidth: '500px' }}>
          <DialogContentText>
            <FormattedMessage {...messages.dialogContent} />
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={<FormattedMessage {...messages.dialogName} />}
            type="text"
            value={formData.get('name')}
            onChange={(evt) => updateCreateForm('name', evt.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeCreateNamespace} color="secondary">
            <FormattedMessage {...messages.dialogCancel} />
          </Button>
          <Button onClick={createNamespace} color="primary" variant="contained">
            <FormattedMessage {...messages.dialogCreate} />
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
