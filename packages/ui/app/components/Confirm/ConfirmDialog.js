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
  hideCancleBtn,
  ...rest
}) => (
  <Dialog open={open} onClose={onClose} {...rest}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent style={{ minWidth: 300 }}>
      {content || children}
    </DialogContent>
    <DialogActions>
      {hideCancleBtn ? null : (
        <Button
          variant="contained"
          onClick={onCancel || onClose}
          style={{ backgroundColor:'#fff', border:'1px solid #D9D9D9' }}
        >
          <FormattedMessage {...messages.cancleButton} />
        </Button>
      )}
      <Button
        onClick={onAction}
        color="primary"
        variant="contained"
        style={{ marginLeft: 16, marginRight: 8}}
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
