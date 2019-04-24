/**
 *
 * DeploymentsPage
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
} from 'containers/App/selectors';
import { makeSelectDeployments, makeSelectDeploymentsList } from 'ducks/deployments/selectors';
import * as actions from 'ducks/deployments/actions';

import messages from './messages';
import styles from './styles';
import schema from './tableSchema';

/* eslint-disable react/prefer-stateless-function */
export class DeploymentsTable extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  render() {
    const {
      classes,
      location,
      data,
      deployments,
      removeDeployment,
    } = this.props;
    const pathname = location.get('pathname');
    const mergedSchema = schema
      .concat([
        {
          id: 'actions',
          label: 'Actions',
          component: (props) => (
            <Fragment>
              <IconButton aria-label="Edit">
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="Delete"
                onClick={(evt) => removeDeployment(props.data.get('id'))}
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
                variant="outlined"
                color="primary"
                component={Link}
                to={`${pathname}/${props.data.get('id')}`}
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
          data={data}
        />
      </Paper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
  deployments: makeSelectDeployments(),
  data: makeSelectDeploymentsList(),
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
)(DeploymentsTable);
