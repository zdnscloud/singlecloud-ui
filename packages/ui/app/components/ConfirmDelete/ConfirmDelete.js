import React, { Fragment, useState } from 'react';
import IconButton from 'components/CustomIconButtons/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import CButton from 'components/CustomButtons/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormattedMessage, injectIntl } from 'react-intl';
import removeICon from 'images/icons/remove.svg';
import warningIcon from 'images/warning.png';
import messages from './messages';

const ConfirmDelete = ({
  id,
  actionName,
  url,
  clusterID,
  namespaceID,
  resolve,
  reject,
  disabled,
}) => {
  const [open, setOpen] = useState(false);
  const handleDelete = () => {
    actionName(id, { url, clusterID, namespaceID, resolve, reject });
    setOpen(false);
  };

  return (
    <Fragment>
      <CButton
        action 
        onClick={() => {
          setOpen(true);
        }}
        disabled={disabled}
      >
        <FormattedMessage {...messages.deleteButton} />
      </CButton>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <FormattedMessage {...messages.dialogTitle} />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <img
              src={warningIcon}
              style={{ marginRight: 11, verticalAlign: 'middle' }}
            />
            <FormattedMessage {...messages.dialogContentText} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
            style={{ backgroundColor: '#fff', border: '1px solid #D9D9D9' }}
            variant="contained"
          >
            <FormattedMessage {...messages.cancleButton} />
          </Button>
          <Button
            onClick={handleDelete}
            color="primary"
            variant="contained"
            style={{ marginLeft: 16, marginRight: 8 }}
          >
            <FormattedMessage {...messages.sureButton} />
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default ConfirmDelete;
