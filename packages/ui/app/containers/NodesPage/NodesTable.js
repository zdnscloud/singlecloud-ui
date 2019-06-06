/**
 *
 * NodesPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { SimpleTable } from '@gsmlg/com';

import { makeSelectClusterID } from 'containers/App/selectors';
import { makeSelectCurrentCluster } from 'containers/ClustersPage/selectors';
import { makeSelectNodes, makeSelectNodesList } from 'ducks/nodes/selectors';
import * as actions from 'ducks/nodes/actions';

import messages from './messages';
import styles from './styles';
import schema from './tableSchema';

/* eslint-disable react/prefer-stateless-function */
export class NodesTable extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    nodes: PropTypes.object,
  };

  render() {
    const { classes, data, nodes } = this.props;

    return (
      <Paper className={classes.tableWrapper}>
        <SimpleTable
          className={classes.table}
          schema={schema.map((sche) => ({
            ...sche,
            label: (
              <FormattedMessage {...messages[`tableTitle${sche.label}`]} />
            ),
          }))}
          data={data}
        />
      </Paper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  nodes: makeSelectNodes(),
  data: makeSelectNodesList(),
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
