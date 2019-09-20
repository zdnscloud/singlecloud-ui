/**
 * Confirm Dialog
 */
import React, { Fragment, useState } from 'react';
import classNames from 'classnames';

// @material-ui/core components
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

const ConfirmDialog = ({
  open,
  onClose,
  onCancel,
  onAction,
  children,
  title,
  content,
  sureButtonText,
}) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>{content || children}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel || onClose} variant="contained">
        <FormattedMessage {...messages.cancleButton} />
      </Button>
      <Button
        onClick={onAction}
        color="primary"
        variant="contained"
        style={{ marginLeft: 16, marginRight: 8 }}
      >
        <FormattedMessage {...(sureButtonText || messages.sureButton)} />
      </Button>
    </DialogActions>
  </Dialog>
);

ConfirmDialog.defaultProps = {
  open: false,
  children: '',
  title: '',
  content: '',
  sureButtonText: '',
};

export default ConfirmDialog;
