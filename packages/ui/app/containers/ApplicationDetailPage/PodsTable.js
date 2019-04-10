/**
 *
 * Pods Table
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
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTerminal } from '@fortawesome/free-solid-svg-icons';
import Chip from '@material-ui/core/Chip';

import { makeSelectPods, makeSelectTableList } from './selectors';
import * as actions from './actions';
import messages from './messages';
import styles from './styles';
import schema from './tableSchema';

/* eslint-disable react/prefer-stateless-function */
export class PodsTable extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    tableList: PropTypes.object.isRequired,
    pods: PropTypes.object,
  };

  render() {
    const { classes, tableList, pods, removePod, openLogView } = this.props;
    const mergedSchema = schema.concat([
      {
        id: 'showLogs',
        label: 'ShowLogs',
        component: (props) => (
          <Fragment>
            {props.data.get('containers').map((ctn) => (
              <Fab
                key={ctn.get('name')}
                variant="extended"
                aria-label="View Log"
                className={classes.button}
                size="small"
                onClick={(evt) =>
                  openLogView(props.data.get('id'), ctn.get('name'))
                }
              >
                <FontAwesomeIcon icon={faTerminal} />
                {ctn.get('name')}
              </Fab>
            ))}
          </Fragment>
        ),
      },
      {
        id: 'actions',
        label: 'Actions',
        component: (props) => (
          <Fragment>
            <IconButton
              aria-label="Delete"
              className={classes.button}
              onClick={(evt) => removePod(props.data.get('id'))}
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
          data={tableList.map((id) => pods.get(id))}
        />
      </Paper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  pods: makeSelectPods(),
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
)(PodsTable);