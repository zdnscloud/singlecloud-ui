/**
 *
 * ApplicationsPage
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

import { makeSelectApplications, makeSelectTableList } from './selectors';
import * as actions from './actions';
import messages from './messages';
import styles from './styles';
import schema from './tableSchema';

/* eslint-disable react/prefer-stateless-function */
export class ApplicationsTable extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    tableList: PropTypes.object.isRequired,
    applications: PropTypes.object,
  };

  render() {
    const { classes, tableList, applications, removeApplication } = this.props;
    console.log(schema);
    let mergedSchema = schema.concat([
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
              onClick={(evt) => removeApplication(props.data.get('id'))}
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
          data={tableList.map((id) => applications.get(id))}
        />
      </Paper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  applications: makeSelectApplications(),
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
)(ApplicationsTable);