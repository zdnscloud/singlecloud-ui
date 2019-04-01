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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { SimpleTable } from '@gsmlg/com';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTerminal } from '@fortawesome/free-solid-svg-icons';
import IconButton from '@material-ui/core/IconButton';

import { makeSelectClusters, makeSelectTableList } from './selectors';
import * as actions from './actions';
import messages from './messages';
import styles from './styles';
import schema from './tableSchema';

/* eslint-disable react/prefer-stateless-function */
export class ClustersTable extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    tableList: PropTypes.object.isRequired,
    clusters: PropTypes.object.isRequired,
  };

  render() {
    const { classes, tableList, clusters } = this.props;
    const mergedSchema = schema
      .concat([
        {
          id: 'actions',
          label: 'Actions',
          component: (props) => (
            <Fragment>
              <IconButton
                variant="outlined"
                component={Link}
                to={`/clusters/${props.data.get('id')}/console`}
                size="small"
                className={classes.button}
              >
                <FontAwesomeIcon icon={faTerminal} />
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
                variant="outlined"
                color="primary"
                component={Link}
                to={`/clusters/${props.data.get('id')}`}
              >
                {props.data.get('name')}
              </Button>
            ),
          };
        }
        return sch;
      });

    return (
      <Paper className={classes.tableWrapper}>
        <SimpleTable
          className={classes.table}
          schema={mergedSchema}
          data={tableList.map((id) => clusters.get(id))}
        />
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
