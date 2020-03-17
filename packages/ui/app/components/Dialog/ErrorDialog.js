/**
 * Error Dialog
 */
import React, { Fragment, useState } from 'react';
import classNames from 'classnames';

// @material-ui/core components
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import warningIcon from 'images/warning.png';

const ErrorDialog = ({
  open,
  onClose,
  children,
  title,
  content,
}) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>
      <IconButton onClick={onClose} style={{ float: 'right', padding: 5 }}>
        <CloseIcon fontSize="small" />
      </IconButton>
      <div>
        <img
          src={warningIcon}
          style={{ marginRight: 11}}
        />
        {title}
      </div>
    </DialogTitle>
    <DialogContent style={{ minWidth: 300 }}>
      {content || children}
    </DialogContent>
  </Dialog>
);

ErrorDialog.defaultProps = {
  open: false,
  children: null,
  content: '',
};

export default ErrorDialog;
