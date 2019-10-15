/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Fragment, useState } from 'react';
// @material-ui/core components
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormattedMessage, injectIntl } from 'react-intl';
import warningIcon from 'images/warning.png';
import messages from './messages';

const Confirm = (props) => {
  const { component, handleConfirm, dialogContentText } = props;
  const [open, setOpen] = useState(false);

  const handleConfirmClick = () => {
    handleConfirm();
    setOpen(false);
  };
  return (
    <Fragment>
      <div
        onClick={() => {
          setOpen(true);
        }}
        style={{ display: 'inline' }}
      >
        {component}
      </div>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ marginTop: 15 }}
          >
            <img
              src={warningIcon}
              style={{ marginRight: 11, verticalAlign: 'middle' }}
            />
            <FormattedMessage {...dialogContentText} />
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
            // onClick={handleConfirm}
            onClick={handleConfirmClick}
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

export default Confirm;
