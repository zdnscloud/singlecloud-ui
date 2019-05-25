/**
 *
 * Pods Table
 *
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { SimpleTable } from '@gsmlg/com';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ShellIcon from 'components/Icons/Shell';
import LogIcon from 'components/Icons/Log';
import Chip from '@material-ui/core/Chip';
import ContainerTerminalDialog from 'containers/TerminalPage/ContainerTerminalDialog';

import {
  makeSelectClusterID,
  makeSelectNamespaceID,
} from 'containers/App/selectors';
import { openContainerTerminal } from 'containers/TerminalPage/actions';
import {
  makeSelectPods,
  makeSelectPodsList,
  makeSelectSTSPods,
  makeSelectSTSPodsList,
} from 'ducks/pods/selectors';
import * as actions from 'ducks/pods/actions';

import messages from './messages';
import styles from './styles';
import schema from './tableSchema';
import LogViewDialog from './LogViewDialog';

/* eslint-disable react/prefer-stateless-function */
export class PodsTable extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    pods: PropTypes.object,
  };

  render() {
    const {
      classes,
      clusterID,
      namespaceID,
      parentType,
      deployPodList,
      stsPodList,
      removePod,
      openPodLog,
      openContainerTerminal,
    } = this.props;
    const mergedSchema = schema.map((item) => {
      if (item.id === 'containers') {
        return {
          ...item,
          component(props) {
            return props.data
              .get('containers')
              .map((ctn, i) => (
                <Chip
                  key={i}
                  variant="outlined"
                  label={(
                    <Fragment>
                      {`${ctn.get('image')}    `}
                      <IconButton
                        aria-label="View Log"
                        className={classes.button}
                        size="small"
                        edge="end"
                        style={{ transform: 'scale(0.7)' }}
                        onClick={(evt) => {
                          openPodLog({
                            podID: props.data.get('id'),
                            containerName: ctn.get('name'),
                          }, {
                            clusterID,
                            namespaceID,
                          });
                        }}
                      >
                        <LogIcon />
                      </IconButton>
                      <IconButton
                        aria-label="Terminal"
                        className={classes.button}
                        size="small"
                        edge="end"
                        style={{ transform: 'scale(0.7)' }}
                        onClick={(evt) => {
                          openContainerTerminal({
                            podID: props.data.get('id'),
                            containerName: ctn.get('name'),
                          }, {
                            clusterID,
                            namespaceID,
                          })
                        }}
                      >
                        <ShellIcon />
                      </IconButton>
                    </Fragment>
                  )}
                />
              ));
          },
        };
      }
      return item;
    })
    .map((s) => ({
      ...s,
      label: <FormattedMessage {...messages[`tableTitle${s.label}`]} />,
    }));
    let data = [];
    switch(parentType) {
      case 'sts':
        data = stsPodList;
        break;
      default:
        data = deployPodList;
    }

    return (
      <Paper className={classes.tableWrapper}>
        <LogViewDialog />
        <ContainerTerminalDialog />
        <SimpleTable
          className={classes.table}
          schema={mergedSchema}
          data={data}
        />
      </Paper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectClusterID(),
  namespaceID: makeSelectNamespaceID(),
  deployPodList: makeSelectPodsList(),
  stsPodList: makeSelectSTSPodsList(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      openContainerTerminal,
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
)(PodsTable);
