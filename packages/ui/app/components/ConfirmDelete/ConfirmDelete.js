import React, { Fragment, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormattedMessage, injectIntl } from 'react-intl';
import warningIcon from 'images/warning.png';
import messages from './messages';

const ConfirmDelete = (props) => {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    const { id, actionName, url, clusterID, namespaceID } = props;
    actionName(id, { url, clusterID, namespaceID });
    setOpen(false);
  };

  return (
    <Fragment>
      <IconButton
        aria-label="Delete"
        onClick={() => {
          setOpen(true);
        }}
      >
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {<FormattedMessage {...messages.dialogTitle} />}
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
