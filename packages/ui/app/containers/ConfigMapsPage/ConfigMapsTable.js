/**
 *
 * ConfigMapsPage
 *
 */

import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import getByKey from '@gsmlg/utils/getByKey';

import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { SimpleTable } from '@gsmlg/com';
import Dialog from '@material-ui/core/Dialog';
import AceEditor from 'react-ace';
import 'brace/mode/yaml';
import 'brace/theme/github';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import {
  makeSelectClusterID,
  makeSelectNamespaceID,
} from 'containers/App/selectors';
import * as actions from 'ducks/configMaps/actions';
import {
  makeSelectURL,
  makeSelectConfigMaps,
  makeSelectConfigMapsList,
} from 'ducks/configMaps/selectors';

import messages from './messages';
import styles from './styles';
import schema from './tableSchema';

/* eslint-disable react/prefer-stateless-function */
export class ConfigMapsTable extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    configMaps: PropTypes.object,
  };

  state = { openID: null, openIndex: null };

  render() {
    const {
      classes,
      data,
      configMaps,
      removeConfigMap,
    } = this.props;

    const mergedSchema = schema.concat([
      {
        id: 'configs',
        label: 'Configs',
        component: (props) => (
          <Fragment>
            {(props.data.get('configs') || []).map((conf, idx) => (
              <Button
                key={idx}
                variant="outlined"
                size="small"
                className={classes.button}
                onClick={(evt) => this.setState({ openID: props.data.get('id'), openIndex: idx })}
              >
                show `{conf.get('name')}` Config
              </Button>
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
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={(evt) => removeConfigMap(props.data.get('id'))}
            >
              <DeleteIcon />
            </IconButton>
          </Fragment>
        ),
      },
    ]);

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
            value={configMaps.getIn([
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

export default compose(
  withConnect,
  withStyles(styles)
)(ConfigMapsTable);
