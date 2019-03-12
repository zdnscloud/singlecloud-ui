/**
 *
 * ConfigMapsPage
 *
 */

import React, { Fragment } from 'react';
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

import { makeSelectConfigMaps, makeSelectTableList, makeSelectOpening } from './selectors';
import * as actions from './actions';
import messages from './messages';
import styles from './styles';
import schema from './tableSchema';

/* eslint-disable react/prefer-stateless-function */
export class ConfigMapsTable extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    tableList: PropTypes.object.isRequired,
    configMaps: PropTypes.object,
  };

  render() {
    const {
      classes,
      tableList,
      configMaps,
      opening,
      removeConfigMap,
      showConfigMapData,
      hideConfigMapData,
    } = this.props;
    const mergedSchema = schema.concat([
      {
        id: 'configs',
        label: 'Configs',
        component: props => (
          <Fragment>
            {props.data.get('configs').map((conf, idx) => (
              <Button
                variant="outlined"
                size="small"
                className={classes.button}
                onClick={evt => showConfigMapData(props.data.get('id'), idx)}
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
        component: props => (
          <Fragment>
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={evt => removeConfigMap(props.data.get('id'))}
            >
              Delete this
            </Button>
          </Fragment>
        ),
      },
    ]);

    return (
      <Paper className={classes.tableWrapper}>
        <Dialog
          open={opening != null}
          onClose={() => {
            hideConfigMapData();
          }}
          aria-labelledby="form-dialog-title"
        >
          <AceEditor
            focus
            mode="yaml"
            theme="github"
            value={configMaps.getIn([getByKey(opening, 'id'), 'configs', getByKey(opening, 'index'), 'data'])}
            readOnly
          />
        </Dialog>
        <SimpleTable
          className={classes.table}
          schema={mergedSchema}
          data={tableList.map(id => configMaps.get(id))}
        />
      </Paper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  configMaps: makeSelectConfigMaps(),
  tableList: makeSelectTableList(),
  opening: makeSelectOpening(),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch,
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withStyles(styles),
)(ConfigMapsTable);
