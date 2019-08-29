/**
 *
 * SecretsPage
 *
 */

import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { SimpleTable } from '@gsmlg/com';
import Dialog from '@material-ui/core/Dialog';
import AceEditor from 'react-ace';
import 'brace/mode/yaml';
import 'brace/theme/github';

import { makeSelectCurrentID as makeSelectClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectNamespaceID } from 'ducks/namespaces/selectors';
import * as actions from 'ducks/secrets/actions';
import {
  makeSelectURL,
  makeSelectSecrets,
  makeSelectSecretsList,
} from 'ducks/secrets/selectors';

import messages from './messages';
import styles from './styles';
import schema from './tableSchema';

/* eslint-disable react/prefer-stateless-function */
export class SecretsTable extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    secrets: PropTypes.object,
  };

  state = { openID: null, openIndex: null };

  render() {
    const {
      classes,
      data,
      secrets,
      clusterID,
      namespaceID,
      removeSecret,
    } = this.props;

    const mergedSchema = schema
      .map((s) => ({
        ...s,
        label: <FormattedMessage {...messages[`tableTitle${s.label}`]} />,
      }))
      .map((sch) => {
        if (sch.id === 'actions') {
          return {
            ...sch,
            props: { removeSecret, clusterID, namespaceID },
          };
        }
        if (sch.id === 'name') {
          return {
            ...sch,
            props: { clusterID, namespaceID },
          };
        }
        return sch;
      });

    return (
      <Paper className={classes.tableWrapper}>
        <Dialog
          open={this.state.openID != null}
          onClose={() => this.setState({ openID: null, openIndex: null })}
          aria-labelledby="form-dialog-title"
        >
          <AceEditor
            focus
            mode="yaml"
            theme="github"
            value={secrets.getIn([
              this.state.openID,
              'configs',
              this.state.openIndex,
              'data',
            ])}
            readOnly
          />
        </Dialog>
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
  clusterID: makeSelectClusterID(),
  namespaceID: makeSelectNamespaceID(),
  secrets: makeSelectSecrets(),
  data: makeSelectSecretsList(),
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
)(SecretsTable);
