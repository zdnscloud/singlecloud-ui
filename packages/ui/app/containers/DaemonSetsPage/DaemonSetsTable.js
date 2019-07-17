/**
 *
 * DaemonSetsPage
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
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import {
  makeSelectClusterID,
  makeSelectNamespaceID,
  makeSelectLocation,
} from 'ducks/app/selectors';
import {
  makeSelectDaemonSets,
  makeSelectDaemonSetsList,
} from 'ducks/daemonSets/selectors';
import * as actions from 'ducks/daemonSets/actions';

import messages from './messages';
import styles from './styles';
import schema from './tableSchema';

/* eslint-disable react/prefer-stateless-function */
export class DaemonSetsTable extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  render() {
    const {
      classes,
      location,
      data,
      daemonSets,
      clusterID,
      namespaceID,
      removeDaemonSet,
    } = this.props;
    const pathname = location.get('pathname');
    const mergedSchema = schema
      .concat([
        {
          id: 'actions',
          label: 'Actions',
          component: (props) => (
            <Fragment>
              <IconButton
                aria-label="Delete"
                onClick={(evt) =>
                  removeDaemonSet(props.data.get('id'), {
                    clusterID,
                    namespaceID,
                    url: props.data.getIn(['links', 'remove']),
                  })
                }
              >
                <DeleteIcon />
              </IconButton>
            </Fragment>
          ),
        },
      ])
      .map((sch) => {
        if (sch.id === 'name') {
          return {
            ...sch,
            component: (props) => (
              <Button
                color="primary"
                component={Link}
                to={`${pathname}/${props.data.get('id')}/show`}
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
  location: makeSelectLocation(),
  clusterID: makeSelectClusterID(),
  namespaceID: makeSelectNamespaceID(),
  daemonSets: makeSelectDaemonSets(),
  data: makeSelectDaemonSetsList(),
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
)(DaemonSetsTable);
