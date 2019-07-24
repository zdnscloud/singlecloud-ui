/**
 *
 * Storages Table
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

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from 'components/Icons/Edit';

import { makeSelectClusterID, makeSelectLocation } from 'ducks/app/selectors';
import * as actions from 'ducks/storages/actions';
import {
  makeSelectStorages,
  makeSelectStoragesList,
} from 'ducks/storages/selectors';

import ConfirmDelete from 'components/ConfirmDelete/ConfirmDelete';

import messages from './messages';
import styles from './styles';
import schema from './tableSchema';

/* eslint-disable react/prefer-stateless-function */
export class StoragesTable extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
  };

  render() {
    const {
      classes,
      clusterID,
      data,
      storages,
      removeStorage,
      location,
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
                aria-label="Edit"
                component={Link}
                to={`${pathname}/${props.data.get('id')}/edit`}
              >
                <EditIcon />
              </IconButton>

              <ConfirmDelete 
                  actionName={removeStorage}
                  id={props.data.get('id')}
                  url={props.data.getIn(['links', 'remove'])}
                  clusterID={clusterID}
                />
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
  storages: makeSelectStorages(),
  data: makeSelectStoragesList(),
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
)(StoragesTable);
