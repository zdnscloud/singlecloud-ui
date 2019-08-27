import React from 'react';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from 'components/Icons/Close';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import CardFooter from 'components/Card/CardFooter';
import Paper from '@material-ui/core/Paper';

import SockJS from 'sockjs-client';
import { withStyles } from '@material-ui/core/styles';
import List from 'react-virtualized/dist/es/List';
import { Observable } from 'rxjs';
import { map, scan, throttleTime, debounceTime } from 'rxjs/operators';

import {
  makeSelectPodLogIsOpening,
  makeSelectPodLog,
  makeSelectOpeningLogs,
  makeSelectLogURL,
} from 'ducks/pods/selectors';
import * as actions from 'ducks/pods/actions';
import styles from './styles';
import messages from './messages';

let socket = null;
let observer = null;

class LogViewDialog extends React.Component {
  render() {
    const {
      isOpen,
      logs,
      url,
      closePodLog,
      setOpeningLogs,
      classes,
    } = this.props;
    let t;

    return (
      <Dialog
        open={isOpen}
        onClose={closePodLog}
        onEnter={() => {
          socket = new SockJS(url, null, { transports: 'websocket' });
          const logSource = Observable.create((ob) => {
            observer = ob;
            socket.onmessage = (e) => {
              ob.next(e.data);
            };
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
            .pipe(
              scan((acc, val) => {
                const newAcc = acc.concat([val]);
                if (newAcc.length > 2000) return newAcc.slice(-2000);
                return newAcc;
              }, [])
            )
            /* .pipe(throttleTime(1000 / 60)) */
            .subscribe((l) => {
              setOpeningLogs(l);
            });
          socket.onclose = (e) => {
            observer.next(`${new Date().toISOString()} Pull log timeout!!!`);
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
        PaperProps={{ style: { overflow: 'hidden' } }}
      >
        <Card className={classes.dialogCard}>
          <CardHeader color="secondary" className={classes.dialogHeader}>
            <h4>
              <FormattedMessage {...messages.logTitle} />
            </h4>
            <IconButton onClick={closePodLog} style={{ padding: 0 }}>
              <CloseIcon style={{ color: '#fff' }} />
            </IconButton>
          </CardHeader>
          <CardBody className={classes.dialogCardBody}>
            <Paper className={classes.dialogCardBodyPaper}>
              <div className={classes.logsWrapper}>
                <pre className={classes.logs}>
                  {logs &&
                    logs.map((log, i) => (
                      <div key={i}>
                        <time className={classes.logTime}>
                          {log[0].toLocaleString()}
                        </time>
                        <span className={classes.log}>{log[1]}</span>
                      </div>
                    ))}
                </pre>
              </div>
            </Paper>
          </CardBody>
          <CardFooter>
            <Button onClick={closePodLog} color="primary" variant="contained">
              <FormattedMessage {...messages.logClose} />
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isOpen: makeSelectPodLogIsOpening(),
  podLog: makeSelectPodLog(),
  url: makeSelectLogURL(),
  logs: makeSelectOpeningLogs(),
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
