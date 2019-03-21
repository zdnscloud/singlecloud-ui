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

import { makeSelectLogViewIsOpen, makeSelectLogs, makeSelectLogsURL } from './selectors';
import * as actions from './actions';

let socket = null;

class LogViewDialog extends React.Component {
  render() {
    const {
      isOpen,
      logs,
      url,
      closeLogView,
      addLog,
    } = this.props;

    return (
      <Dialog
        open={isOpen}
        onClose={() => {
          closeLogView();
          socket.close();
          socket = null;
        }}
        onEnter={() => {
          socket = new SockJS(url);
          socket.onmessage = (e) => addLog(e.data);
        }}
        aria-labelledby="form-dialog-title"
        maxWidth="lg"
      >
        <DialogTitle id="form-dialog-title">Contianer Log</DialogTitle>
        <DialogContent>
          <pre>
            {logs.map((log) => (
              <div>{log}</div>
            ))}
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
)(LogViewDialog);
