/* eslint-disable no-unreachable */
/**
 *
 * Applications Table
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

import * as actions from 'ducks/applications/actions';
import { makeSelectCurrentApplication } from 'ducks/applications/selectors';
import {
  makeSelectClusterID,
  makeSelectNamespaceID,
} from 'ducks/app/selectors';
import { Map, List } from 'immutable';

import messages from './messages';
import styles from './styles';
import schema from './tableSchema';

export class ApplicationsTable extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    application: PropTypes.object.isRequired,
  };

  render() {
    const { classes, theme, clusterID, namespaceID, application } = this.props;
    const data = application.get('appResources') || List([]);
    const mergedSchema = schema
      .map((sch) => {
        if (sch.id === 'name') {
          return {
            ...sch,
            props: { clusterID, namespaceID },
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
  application: makeSelectCurrentApplication(),
  clusterID: makeSelectClusterID(),
  namespaceID: makeSelectNamespaceID(),
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
  withStyles(styles, { withTheme: true })
)(ApplicationsTable);
