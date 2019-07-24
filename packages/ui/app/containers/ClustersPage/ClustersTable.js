/**
 *
 * ClustersPage
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
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ShellIcon from 'components/Icons/Shell';
import SuccessIcon from 'components/Icons/Success';
import FailureIcon from 'components/Icons/Failure';
import { openTerminal } from 'containers/TerminalPage/actions';
import ConfirmDelete from 'components/ConfirmDelete/ConfirmDelete';
import * as actions from 'ducks/clusters/actions';
import {
  makeSelectClusters,
  makeSelectClustersList,
} from 'ducks/clusters/selectors';

import messages from './messages';
import styles from './styles';
import schema from './tableSchema';

const ActionComponent = (props) => (
  <Fragment>
    <IconButton
      variant="outlined"
      size="small"
      onClick={(evt) => {
        props.openTerminal(props.data.get('id'));
      }}
    >
      <ShellIcon />
    </IconButton>

    <ConfirmDelete
      actionName={props.removeCluster}
      id={props.data.get('id')}
      url={props.data.getIn(['links', 'remove'])}
    />
  </Fragment>
);

/* eslint-disable react/prefer-stateless-function */
export class ClustersTable extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    clusters: PropTypes.object.isRequired,
  };

  render() {
    const {
      classes,
      data,
      clusters,
      // eslint-disable-next-line no-shadow
      openTerminal,
      removeCluster,
      theme,
    } = this.props;
    const mergedSchema = schema
      .concat([
        {
          id: 'actions',
          label: 'Actions',
          component: ActionComponent,
          props: {
            openTerminal,
            removeCluster,
          },
        },
      ])
      .map((sch) => {
        if (sch.id === 'status') {
          return {
            ...sch,
            component: (props) =>
              props.data.get('status') === 'Running' ? (
                <SuccessIcon style={{ color: theme.palette.icons.a }} />
              ) : (
                <FailureIcon style={{ color: theme.palette.icons.b }} />
              ),
          };
        }
        return sch;
      })
      .map((sch) => {
        if (sch.id === 'name') {
          return {
            ...sch,
            component: (props) => (
              <Button
                color="primary"
                to={`/clusters/${props.data.get('id')}`}
                component={Link}
              >
                {props.data.get('name')}
              </Button>
            ),
          };
        }
        return sch;
      })
      .map((s) => ({
        ...s,
        label: <FormattedMessage {...messages[`tableTitle${s.label}`]} />,
      }));

    return (
      <Paper className={classes.tableWrapper}>
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
  clusters: makeSelectClusters(),
  data: makeSelectClustersList(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      openTerminal,
    },
    dispatch
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  withStyles(styles, { withTheme: true })
)(ClustersTable);
