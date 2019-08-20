/**
 *
 * StatefulSetsPage
 *
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { SimpleTable } from '@gsmlg/com';

import {
  makeSelectClusterID,
  makeSelectNamespaceID,
  makeSelectLocation,
} from 'ducks/app/selectors';
import {
  makeSelectStatefulSets,
  makeSelectStatefulSetsList,
} from 'ducks/statefulSets/selectors';
import * as actions from 'ducks/statefulSets/actions';

import messages from './messages';
import styles from './styles';
import schema from './tableSchema';

/* eslint-disable react/prefer-stateless-function */
export class StatefulSetsTable extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  render() {
    const {
      classes,
      location,
      data,
      statefulSets,
      clusterID,
      namespaceID,
      removeStatefulSet,
    } = this.props;
    const pathname = location.get('pathname');
    const mergedSchema = schema

      .map((sch) => {
        if (sch.id === 'actions') {
          return {
            ...sch,
            props: { removeStatefulSet, clusterID, namespaceID },
          };
        }
        if (sch.id === 'name') {
          return {
            ...sch,
            props: { pathname },
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
  statefulSets: makeSelectStatefulSets(),
  data: makeSelectStatefulSetsList(),
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
)(StatefulSetsTable);
