/**
 *
 * IngressesPage
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

import { makeSelectIngresses, makeSelectTableList } from './selectors';
import * as actions from './actions';
import messages from './messages';
import styles from './styles';
import schema from './tableSchema';

/* eslint-disable react/prefer-stateless-function */
export class IngressesTable extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    tableList: PropTypes.object.isRequired,
    ingresses: PropTypes.object,
    location: PropTypes.object,
  };

  render() {
    const { classes, tableList, ingresses, removeIngress } = this.props;
    const mergedSchema = schema.concat([
      {
        id: 'actions',
        label: 'Actions',
        component: (props) => (
          <Fragment>
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={(evt) => {
                removeIngress(props.data.get('id'));
              }}
            >
              Delete this ingress
            </Button>
          </Fragment>
        ),
      },
    ]);

    return (
      <Paper className={classes.tableWrapper}>
        <SimpleTable
          className={classes.table}
          schema={mergedSchema}
          data={tableList.map((id) => ingresses.get(id))}
        />
      </Paper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  ingresses: makeSelectIngresses(),
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
)(IngressesTable);
