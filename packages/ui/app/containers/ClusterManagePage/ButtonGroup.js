import React, { PureComponent, Fragment, useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import { FormattedMessage } from 'react-intl';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Button from '@material-ui/core/Button';
import ShellIcon from 'components/Icons/Shell';
import Confirm from 'components/Confirm/Confirm';

import checkIcon from 'images/clusters/check.png';
import failIcon from 'images/clusters/fail.png';
import loadingIcon from 'images/clusters/loading.png';
import logIcon from 'images/clusters/log.png';
import stopIcon from 'images/clusters/stop.png';
import unableStopIcon from 'images/clusters/unableStop.png';

import {
  makeSelectURL,
  makeSelectCurrent,
  makeSelectCurrentID,
} from 'ducks/clusters/selectors';
import * as actions from 'ducks/clusters/actions';
import * as appActions from 'ducks/app/actions';

import LogViewDialog from './LogViewDialog';
import messages from './messages';

import styles from './styles';

export const ButtonGroup = ({
  classes,
  clusterID,
  cluster,
  openTerminal,
  openClusterLog,
  executeClusterAction,
  loadClusters,
  url,
}) => {
  const [logOpen, setLogOpen] = useState(false);
  const status = cluster.get('status');
  let clusterStatus = null;

  const handleConfirm = () => {
    executeClusterAction('cancel', null, {
      url: cluster.getIn(['links', 'self']),
    });
  };

  switch (status) {
    case 'Running':
      clusterStatus = (
        <Button className={classes.runningBtn}>
          <img src={checkIcon} alt="checkIcon" className={classes.buttonIcon} />
          <FormattedMessage {...messages.runningStatus} />
        </Button>
      );
      break;
    case 'Updating':
      clusterStatus = (
        <Button className={classes.loadingBtn}>
          <img
            src={loadingIcon}
            alt="loadingIcon"
            className={classes.buttonIcon}
          />
          <FormattedMessage {...messages.updatingStatus} />
        </Button>
      );
      break;
    case 'Connecting':
      clusterStatus = (
        <Button className={classes.loadingBtn}>
          <img
            src={loadingIcon}
            alt="loadingIcon"
            className={classes.buttonIcon}
          />
          <FormattedMessage {...messages.connectingStatus} />
        </Button>
      );
      break;
    case 'Creating':
      clusterStatus = (
        <Button className={classes.loadingBtn}>
          <img
            src={loadingIcon}
            alt="loadingIcon"
            className={classes.buttonIcon}
          />
          <FormattedMessage {...messages.creatingStatus} />
        </Button>
      );
      break;
    case 'Unavailable':
      clusterStatus = (
        <Button className={classes.failBtn}>
          <img src={failIcon} alt="checkIcon" className={classes.buttonIcon} />
          <FormattedMessage {...messages.unavailableStatus} />
        </Button>
      );
      break;
    case 'Unreachable':
      clusterStatus = (
        <Button className={classes.failBtn}>
          <img src={failIcon} alt="checkIcon" className={classes.buttonIcon} />
          <FormattedMessage {...messages.unreachableStatus} />
        </Button>
      );
      break;
    default:
      break;
  }

  return (
    <Fragment>
      <LogViewDialog isOpen={logOpen} closeDialog={() => setLogOpen(false)} />
      <GridContainer className={classes.btnGroup}>
        <GridItem xs={12} sm={12} md={12} className={classes.formLine}>
          {clusterStatus}
          {status === 'Running' ? (
            <Button
              className={classes.handleBtn}
              onClick={(evt) => {
                openTerminal('cluster', { clusterID });
              }}
            >
              <ShellIcon className={classes.shellIcon} />
              <FormattedMessage {...messages.shellButton} />
            </Button>
          ) : (
            <Button className={classes.unableBtn}>
              <ShellIcon className={classes.shellIcon} />
              <FormattedMessage {...messages.shellButton} />
            </Button>
          )}

          {status === 'Updating' ||
          status === 'Creating' ||
          status === 'Unavailable' ? (
            <Button
              className={classes.handleBtn}
              onClick={(evt) => {
                setLogOpen(true);
              }}
            >
              <img src={logIcon} alt="logIcon" className={classes.buttonIcon} />
              <FormattedMessage {...messages.updateLogButton} />
            </Button>
          ) : (
            <Button className={classes.unableBtn}>
              <img src={logIcon} alt="logIcon" className={classes.buttonIcon} />
              <FormattedMessage {...messages.updateLogButton} />
            </Button>
          )}

          {status === 'Updating' ||
          status === 'Connecting' ||
          status === 'Creating' ? (
            <Confirm
              handleConfirm={handleConfirm}
              dialogContentText={messages.stopPromptText}
              component={
                <Button className={classes.handleBtn}>
                  <img
                    src={stopIcon}
                    alt="stopIcon"
                    className={classes.buttonIcon}
                  />
                  <FormattedMessage {...messages.stopButton} />
                </Button>
              }
            />
          ) : (
            <Button className={classes.unableBtn}>
              <img
                src={unableStopIcon}
                alt="stopIcon"
                className={classes.buttonIcon}
              />
              <FormattedMessage {...messages.stopButton} />
            </Button>
          )}
        </GridItem>
      </GridContainer>
    </Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  url: makeSelectURL(),
  cluster: makeSelectCurrent(),
  clusterID: makeSelectCurrentID(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      ...appActions,
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
)(ButtonGroup);
