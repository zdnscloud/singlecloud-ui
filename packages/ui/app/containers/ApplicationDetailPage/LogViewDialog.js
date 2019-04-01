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
import { Observable } from 'rxjs';
import { map, scan, throttleTime } from 'rxjs/operators';

import {
  makeSelectLogViewIsOpen,
  makeSelectLogs,
  makeSelectLogsURL,
} from './selectors';
import * as actions from './actions';
import styles from './styles';

let socket = null;
let observer = null;

class LogViewDialog extends React.Component {
  render() {
    const { isOpen, logs, url, closeLogView, setLogs, classes } = this.props;
    let t;

    return (
      <Dialog
        open={isOpen}
        onClose={closeLogView}
        onEnter={() => {
          socket = new SockJS(url);
          const logSource = Observable.create((ob) => {
            observer = ob;
            socket.onmessage = (e) => ob.next(e.data);
          });
          logSource
            .pipe(
              map((log) => {
                const i = log.indexOf(' ');
                const tt = new Date(log.slice(0, i));
                const l = log.slice(i + 1);
                return [tt, l];
              })
            )
            .pipe(scan((acc, val) => acc.concat([val]).slice(-2000), []))
            .pipe(throttleTime(500))
            .subscribe((l) => {
              setLogs(l);
            });
          socket.onclose = (e) => {
            setLogs(logs.concat([[new Date(), 'Pull log timeout!!!']]));
            if (observer) observer.complete();
            observer = null;
          };
        }}
        onExit={() => {
          socket.close();
          socket.onclose = null;
          socket = null;
          if (observer) observer.complete();
          observer = null;
        }}
        aria-labelledby="form-dialog-title"
        maxWidth="lg"
      >
        <DialogTitle id="form-dialog-title">Contianer Log</DialogTitle>
        <DialogContent>
          <div className={classes.logsWrapper}>
            <pre className={classes.logs}>
              {logs.map((log, i) => (
                <div key={i}>
                  <time className={classes.logTime}>
                    {log[0].toLocaleString()}
                  </time>
                  <span className={classes.log}>{log[1]}</span>
                </div>
              ))}
            </pre>
          </div>
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
