/* eslint-disable no-unreachable */
/**
 *
 * User Quotas Table
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
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ShellIcon from 'components/Icons/Shell';
import SuccessIcon from 'components/Icons/Success';
import FailureIcon from 'components/Icons/Failure';
import { openTerminal } from 'containers/TerminalPage/actions';

import * as actions from 'ducks/userQuotas/actions';
import {
  makeSelectUserQuotas,
  makeSelectUserQuotasList,
} from 'ducks/userQuotas/selectors';

import messages from './messages';
import styles from './styles';
import schema from './tableSchema';

/* eslint-disable react/prefer-stateless-function */
export class AdminUserQuotasTable extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    userQuotas: PropTypes.object.isRequired,
  };

  render() {
    const {
      classes,
      data,
      // eslint-disable-next-line no-shadow
      removeUserQuota,
      filter,
      theme,
    } = this.props;
    const mergedSchema = schema
      .concat([
        {
          id: 'actions',
          label: 'Actions',
          component: (props) => (
            <Fragment>
              <IconButton
                aria-label="Delete"
                onClick={(evt) =>
                  removeUserQuota(props.data.get('id'), {
                    url: props.data.getIn(['links', 'remove']),
                  })
                }
              >
                <DeleteIcon />
              </IconButton>
            </Fragment>
          ),
        },
      ])
      .map((sch) => {
        if (sch.id === 'memory') {
          return {
            ...sch,
            component: (props) => `${props.data.get('memory')}Gi`,
          };
        }
        return sch;
      })
      .map((sch) => {
        if (sch.id === 'storage') {
          return {
            ...sch,
            component: (props) => `${props.data.get('storage')}Gi`,
          };
        }
        return sch;
      })
      .map((sch) => {
        if (sch.id === 'status') {
          return {
            ...sch,
            component: (props) => {
              switch (props.data.get('status')) {
                case 'processing':
                  return <FormattedMessage {...messages.tableProcessing} />;
                  break;
                case 'approval':
                  return <FormattedMessage {...messages.tableApproval} />;
                  break;
                case 'rejection':
                  return <FormattedMessage {...messages.tableRejection} />;
                  break;
                default:
                  return props.data.get('status');
                  break;
              }
            },
          };
        }
        return sch;
      })
      .map((sch) => {
        if (sch.id === 'name') {
          return {
            ...sch,
            component: (props) => (
              <Button
                color="primary"
                to={`/userQuotas/${props.data.get('id')}/request`}
                component={Link}
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
          data={data.filter((item) => {
            let flag = true;
            console.log(filter);
            if (filter.userName && filter.status) {
              if (filter.status === 'all') {
                flag = item.get('name') === filter.userName;
              }
              flag =
                item.get('name') === filter.userName &&
                item.get('status') === filter.status;
            }
            if (filter.status && !filter.userName) {
              if (filter.status === 'all') {
                flag = true;
              } else {
                flag = item.get('status') === filter.status;
              }
            }
            if (filter.userName && !filter.status) {
              flag = item.get('name') === filter.userName;
            }
            return flag;
          })}
        />
      </Paper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  userQuotas: makeSelectUserQuotas(),
  data: makeSelectUserQuotasList(),
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
  withStyles(styles, { withTheme: true })
)(AdminUserQuotasTable);
