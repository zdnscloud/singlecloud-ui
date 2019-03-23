import React from 'react';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SockJS from 'sockjs-client';
import { withStyles } from '@material-ui/core/styles';
import List from 'react-virtualized/dist/es/List';

import {
  makeSelectLogViewIsOpen,
  makeSelectLogs,
  makeSelectLogsURL,
} from './selectors';
import * as actions from './actions';
import styles from './styles';

let socket = null;

class LogViewDialog extends React.Component {
  render() {
    const { isOpen, logs, url, closeLogView, addLog, classes } = this.props;
    let t;

    return (
      <Dialog
        open={isOpen}
        onClose={closeLogView}
        onEnter={() => {
          socket = new SockJS(url);
          socket.onmessage = (e) => setTimeout(() => addLog(e.data), 1);
          socket.onclose = (e) => {
            addLog('Pull log timeout!!!');
          };
        }}
        onExit={() => {
          socket.close();
          socket.onclose = null;
          socket = null;
        }}
        aria-labelledby="form-dialog-title"
        maxWidth="lg"
      >
        <DialogTitle id="form-dialog-title">Contianer Log</DialogTitle>
        <DialogContent>
          <pre className={classes.logs}>
            {logs.join('\n')}
          </pre>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeLogView} color="primary" variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isOpen: makeSelectLogViewIsOpen(),
  logs: makeSelectLogs(),
  url: makeSelectLogsURL(),
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
)(withStyles(styles)(LogViewDialog));
