import React,{Fragment}from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// nodejs library to set properties for components
import PropTypes from 'prop-types';

// @material-ui/core components
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

class ConfirmDelete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleOpenClick = () => {
    this.setState({ open: true });
  };

  handleCloseClick = () => {
    this.setState({ open: false });
  };

  handleDelete = () => {
    const { id, actionName, url, clusterID, namespaceID } = this.props;
    actionName(id, { url, clusterID, namespaceID});
    this.setState({ open: false });
  }

  render() {
    const { open } = this.state;
    return (
      <Fragment>
        <IconButton
          aria-label="Delete"
          onClick={this.handleOpenClick}
        >
          <DeleteIcon />
        </IconButton>
        <Dialog
          open={open}
          onClose={this.handleCloseClick}
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
                style={{marginRight: 11, verticalAlign: 'middle'}}
              />
              <FormattedMessage {...messages.dialogContentText} />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleCloseClick}
              variant="contained"
            >
              <FormattedMessage {...messages.cancleButton} />
            </Button>
            <Button
              onClick={this.handleDelete}
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
}

export default ConfirmDelete;
