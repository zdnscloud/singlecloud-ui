/**
 *
 * TerminalPage
 *
 */

import React from 'react';
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

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectTerminalPage from './selectors';
import reducer from './reducer';
import * as actions from './actions';
import saga from './saga';
import messages from './messages';
import styles from './styles';
import TerminalPageHelmet from './helmet';

Terminal.applyAddon(fit);

/* eslint-disable react/prefer-stateless-function */
export class TerminalPage extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const term = new Terminal();
    const socket = new SockJS(
      `http://${window.location.hostname}:${
        window.location.port
      }/apis/ws.zcloud.cn/v1/clusters/${this.props.match.params.cluster_id}`,
    );

    term.on('data', data => {
      if (socket.readyState === 1) socket.send(data);
    });

    term.on('title', title => {
      document.title = title;
    });

    term.open(findDOMNode(this.termEl)); // eslint-disable-line
    term.focus();
    term.fit();
    term.write('\x1b[31mWelcome to Terminal!\x1b[m\r\n');

    socket.onopen = () => {
      socket.send(JSON.stringify({ cols: term.cols, rows: term.rows }));
    };

    socket.onmessage = e => {
      term.write(e.data);
    };

    socket.onclose = () => {
      term.write('session is close');
      // term.destroy();
    };

    this.socket = socket;
    window.addEventListener('resize', (evt) => {
      term.fit();
      socket.send(JSON.stringify({ cols: term.cols, rows: term.rows }));
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize');
    this.socket.close();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <TerminalPageHelmet />
        <CssBaseline />
        <Menubar headerText={<FormattedMessage {...messages.header} />} />
        <div className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Typography variant="h4" gutterBottom component="h2">
            <FormattedMessage {...messages.header} />
          </Typography>
          <Paper
            ref={el => {
              this.termEl = el;
            }}
            className={classes.tableContainer}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  terminalPage: makeSelectTerminalPage(),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch,
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'terminalPage', reducer });
const withSaga = injectSaga({ key: 'terminalPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles),
)(TerminalPage);
