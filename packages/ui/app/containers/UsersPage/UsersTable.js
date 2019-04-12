/**
 *
 * UsersPage
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
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { SimpleTable } from '@gsmlg/com';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTerminal } from '@fortawesome/free-solid-svg-icons';

import { makeSelectUsers, makeSelectUsersList } from 'ducks/users/selectors';
import * as actions from 'ducks/users/actions';

import messages from './messages';
import styles from './styles';
import schema from './tableSchema';

/* eslint-disable react/prefer-stateless-function */
export class UsersTable extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    usersList: PropTypes.object.isRequired,
  };

  render() {
    const { classes, usersList, removeUser } = this.props;
    const mergedSchema = schema.concat([
      {
        id: 'actions',
        label: 'Actions',
        component: (props) => (
          <Fragment>
            <Link
              to={`/users/${props.data.get('id')}/edit`}
              className={classes.createBtnLink}
            >
              <IconButton aria-label="Edit User">
                <EditIcon />
              </IconButton>
            </Link>
            <IconButton
              aria-label="Delete"
              onClick={(evt) => removeUser(props.data.get('id'))}
            >
              <DeleteIcon />
            </IconButton>
          </Fragment>
        ),
      },
    ]);

    return (
      <Paper className={classes.tableWrapper}>
        <SimpleTable
          className={classes.table}
          schema={mergedSchema}
          data={usersList}
        />
      </Paper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  users: makeSelectUsers(),
  usersList: makeSelectUsersList(),
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
)(UsersTable);
