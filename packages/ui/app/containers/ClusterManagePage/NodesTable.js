/**
 *
 * NodesPage
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

import { makeSelectClusterID } from 'ducks/app/selectors';
import { makeSelectNodesList } from 'ducks/clusters/selectors';
import * as actions from 'ducks/clusters/actions';

import messages from './messages';
import styles from './styles';
import schema from './tableSchema';

/* eslint-disable react/prefer-stateless-function */
export class NodesTable extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    nodes: PropTypes.object.isRequired,
  };

  render() {
    const { classes, data, clusterID, setNodes, nodes } = this.props;
    const mapedSchema = schema
      .map((sche) => ({
        ...sche,
        label: <FormattedMessage {...messages[`tableTitle${sche.label}`]} />,
      }))
      .map((sch) => {
        if (sch.id === 'actions') {
          return {
            ...sch,
            props: { nodes, setNodes },
          };
        }
        return sch;
      });

    return (
      <Paper className={classes.tableWrapper}>
        <SimpleTable
          className={classes.table}
          schema={mapedSchema}
          data={nodes}
        />
      </Paper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectClusterID(),
  nodes: makeSelectNodesList(),
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
)(NodesTable);
