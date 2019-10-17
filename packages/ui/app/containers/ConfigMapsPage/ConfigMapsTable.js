/**
 *
 * ConfigMaps Table
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
import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/theme-github';

import { makeSelectCurrentID as makeSelectCurrentClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectCurrentNamespaceID } from 'ducks/namespaces/selectors';
import * as actions from 'ducks/configMaps/actions';
import {
  makeSelectURL,
  makeSelectConfigMaps,
  makeSelectConfigMapsList,
} from 'ducks/configMaps/selectors';

import messages from './messages';
import useStyles from './styles';
import schema from './tableSchema';

/* eslint-disable react/prefer-stateless-function */
const ConfigMapsTable = ({
  data,
  configMaps,
  clusterID,
  namespaceID,
  removeConfigMap,
}) => {
  const classes = useStyles();
  const [openID, setOpenID] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);

  const mergedSchema = schema
    .map((s) => ({
      ...s,
      label: <FormattedMessage {...messages[`tableTitle${s.label}`]} />,
    }))
    .map((sch) => {
      if (sch.id === 'actions') {
        return {
          ...sch,
          props: { removeConfigMap, clusterID, namespaceID },
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
        open={openID != null}
        onClose={() => {
          setOpenID(null);
          setOpenIndex(null);
        }}
        aria-labelledby="form-dialog-title"
      >
        <AceEditor
          focus
          mode="yaml"
          theme="github"
          value={configMaps.getIn([openID, 'configs', openIndex, 'data'])}
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
};

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectCurrentClusterID(),
  namespaceID: makeSelectCurrentNamespaceID(),
  configMaps: makeSelectConfigMaps(),
  data: makeSelectConfigMapsList(),
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

export default compose(withConnect)(ConfigMapsTable);
