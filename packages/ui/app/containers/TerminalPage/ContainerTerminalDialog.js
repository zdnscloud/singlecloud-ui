/**
 *
 * Terminal Dialog
 *
 */

import React, { createRef } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { Terminal } from 'xterm';
import * as fit from 'xterm/dist/addons/fit/fit';
import 'xterm/dist/xterm.css';
import SockJS from 'sockjs-client';

import { withStyles } from '@material-ui/core/styles';
import Menubar from 'components/Menubar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import CardFooter from 'components/Card/CardFooter';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from 'components/Icons/Close';

import {
  makeSelectClusterID,
  makeSelectNamespaceID,
} from 'ducks/app/selectors';

import { makeSelectContainerTermIsOpen } from './selectors';
import * as actions from './actions';
import messages from './messages';
import styles from './styles';
import TerminalPageHelmet from './helmet';

Terminal.applyAddon(fit);

/* eslint-disable react/prefer-stateless-function */
export class TerminalDialog extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  termEl = createRef();

  render() {
    const {
      classes,
      open,
      clusterID,
      namespaceID,
      closeContainerTerminal,
    } = this.props;
    const { protocol, hostname, port } = window.location;

    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        fullWidth
        maxWidth="lg"
        open={Boolean(open)}
        onEnter={() => {
          const term = new Terminal();
          // /apis/ws.zcloud.cn/v1//clusters/%s/namespaces/%s/pods/%s/containers/%s/shell
          const { podID, containerName } = open;
          const socket = new SockJS(
            `${protocol}//${hostname}:${port}/apis/ws.zcloud.cn/v1/clusters/${clusterID}/namespaces/${namespaceID}/pods/${podID}/containers/${containerName}/shell`
          );

          term.on('data', (data) => {
            if (socket.readyState === 1) socket.send(data);
          });

          term.on('title', (title) => {
            document.title = title;
          });

          term.open(findDOMNode(this.termEl.current)); // eslint-disable-line
          term.focus();
          term.fit();

          socket.onopen = () => {
            socket.send(JSON.stringify({ cols: term.cols, rows: term.rows }));
          };

          socket.onmessage = (e) => {
            term.write(e.data);
          };

          socket.onclose = () => {
            term.write('session is close');
            // term.destroy();
          };

          this.socket = socket;
          this.resizeListener = () => {
            term.fit();
            socket.send(JSON.stringify({ cols: term.cols, rows: term.rows }));
          };
          window.addEventListener('resize', this.resizeListener);
          setTimeout(() => this.resizeListener(), 300);
        }}
        onExit={() => {
          window.removeEventListener('resize', this.resizeListener);
          this.socket.close();
        }}
        PaperProps={{ style: { overflow: 'hidden' } }}
      >
        <Card className={classes.dialogCard}>
          <CardHeader color="secondary" className={classes.dialogHeader}>
            <h4 className={classes.cardTitleWhite}>
              <FormattedMessage {...messages.header} />
            </h4>
            <IconButton onClick={closeContainerTerminal} style={{ padding: 0 }}>
              <CloseIcon style={{ color: '#fff' }} />
            </IconButton>
          </CardHeader>
          <CardBody className={classes.dialogCardBody}>
            <Paper className={classes.dialogCardBodyPaper} ref={this.termEl} />
          </CardBody>
        </Card>
      </Dialog>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectClusterID(),
  namespaceID: makeSelectNamespaceID(),
  open: makeSelectContainerTermIsOpen(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  withStyles(styles)
)(TerminalDialog);
