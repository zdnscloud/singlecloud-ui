/**
 *
 * NamespacesPage
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

import { makeSelectNamespaces, makeSelectTableList } from './selectors';
import * as actions from './actions';
import messages from './messages';
import styles from './styles';
import schema from './tableSchema';

/* eslint-disable react/prefer-stateless-function */
export class NamespacesTable extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    tableList: PropTypes.object.isRequired,
    namespaces: PropTypes.object,
    location: PropTypes.object,
  };

  render() {
    const { classes, tableList, namespaces, removeNamespace } = this.props;
    const mergedSchema = schema.concat([
      {
        id: 'actions',
        label: 'Actions',
        component: (props) => (
          <Fragment>
            {/* <Button */}
            {/*   variant="outlined" */}
            {/*   component={Link} */}
            {/*   to={`${this.props.location.pathname}/${props.data.get( */}
            {/*     'id' */}
            {/*   )}/deployments`} */}
            {/*   size="small" */}
            {/*   className={classes.button} */}
            {/* > */}
            {/*   Show Deployments */}
            {/* </Button> */}
            {/* <Button */}
            {/*   variant="outlined" */}
            {/*   component={Link} */}
            {/*   to={`${this.props.location.pathname}/${props.data.get( */}
            {/*     'id' */}
            {/*   )}/configmaps`} */}
            {/*   size="small" */}
            {/*   className={classes.button} */}
            {/* > */}
            {/*   Show ConfigMaps */}
            {/* </Button> */}
            {/* <Button */}
            {/*   variant="outlined" */}
            {/*   component={Link} */}
            {/*   to={`${this.props.location.pathname}/${props.data.get( */}
            {/*     'id' */}
            {/*   )}/services`} */}
            {/*   size="small" */}
            {/*   className={classes.button} */}
            {/* > */}
            {/*   Show Services */}
            {/* </Button> */}
            {/* <Button */}
            {/*   variant="outlined" */}
            {/*   component={Link} */}
            {/*   to={`${this.props.location.pathname}/${props.data.get( */}
            {/*     'id' */}
            {/*   )}/ingresses`} */}
            {/*   size="small" */}
            {/*   className={classes.button} */}
            {/* > */}
            {/*   Show Ingresses */}
            {/* </Button> */}
            <IconButton
              aria-label="Delete"
              onClick={(evt) => removeNamespace(props.data.get('id'))}
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
          data={tableList.map((id) => namespaces.get(id))}
        />
      </Paper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  namespaces: makeSelectNamespaces(),
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
)(NamespacesTable);
