/**
 *
 * ClustersPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { makeSelectClusters, makeSelectTableList } from './selectors';
import * as actions from './actions';
import messages from './messages';
import styles from './styles';

/* eslint-disable react/prefer-stateless-function */
export class ClustersTable extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    tableList: PropTypes.object.isRequired,
    clusters: PropTypes.object.isRequired,
  };

  render() {
    const { classes, tableList, clusters } = this.props;

    return (
      <Paper className={classes.tableWrapper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>
                <FormattedMessage {...messages.tableTitleName} />
              </TableCell>
              <TableCell align="right">
                <FormattedMessage {...messages.tableTitleNodeCount} />
              </TableCell>
              <TableCell>
                <FormattedMessage {...messages.tableTitleVersion} />
              </TableCell>
              <TableCell>
                <FormattedMessage {...messages.tableTitleCreationTimestamp} />
              </TableCell>
              <TableCell>
                <FormattedMessage {...messages.tableTitleLinks} />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableList.map((id) => (
              <TableRow key={id}>
                <TableCell>{clusters.getIn([id, 'name'])}</TableCell>
                <TableCell align="right">
                  {clusters.getIn([id, 'nodeCount'])}
                </TableCell>
                <TableCell>{clusters.getIn([id, 'version'])}</TableCell>
                <TableCell>
                  {clusters.getIn([id, 'creationTimestamp'])}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    component={Link}
                    to={`/clusters/${id}/nodes`}
                    size="small"
                    className={classes.button}
                  >
                    Nodes
                  </Button>
                  <Button
                    variant="outlined"
                    component={Link}
                    to={`/clusters/${id}/namespaces`}
                    size="small"
                    className={classes.button}
                  >
                    Namespaces
                  </Button>
                  <Button
                    variant="outlined"
                    component={Link}
                    to={`/clusters/${id}/console`}
                    size="small"
                    className={classes.button}
                  >
                    Console
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  clusters: makeSelectClusters(),
  tableList: makeSelectTableList(),
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
)(ClustersTable);
