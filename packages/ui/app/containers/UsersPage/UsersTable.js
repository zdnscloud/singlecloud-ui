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

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { SimpleTable } from '@gsmlg/com';

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
    console.log('usersList',usersList)
    const mergedSchema = schema
        .map((sch) => {
        if (sch.id === 'actions') {
          return {
            ...sch,
            props: { classes, removeUser},
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
