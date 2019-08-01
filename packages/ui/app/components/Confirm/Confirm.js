import React,{Fragment,useState}from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// nodejs library to set properties for components
import PropTypes from 'prop-types';

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
  
  const { component,handleConfirm } = props;
  const [open, setOpen] = useState(false);

  const handleConfirmClick = () => { 
        handleConfirm();
        setOpen(false);
  }
    return (
      <Fragment>
        <div
          aria-label="Delete"
          onClick={() => {
            setOpen(true);
          }}
          style={{display: "inline"}}
        >
          {component}
        </div>
        <Dialog
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        >
          <DialogTitle id="alert-dialog-title">
            {<FormattedMessage {...messages.dialogTitle} />}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <img
                src={warningIcon}
                style={{marginRight: 11, verticalAlign: 'middle'}}
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
              // onClick={handleConfirm}
              onClick={handleConfirmClick}
              color="primary"
              variant="contained"
              style={{marginLeft: 16, marginRight: 8 }}
            >
              <FormattedMessage {...messages.sureButton} />
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }


export default Confirm;
