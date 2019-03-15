/**
 *
 * Create DeploymentsPage
 *
 */

import React, { Fragment } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { fromJS } from 'immutable';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Menubar from 'components/Menubar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import injectSaga from 'utils/injectSaga';
import { makeSelectCreateFormData } from './selectors';
import reducer from './reducer';
import * as actions from './actions';
import saga from './saga';
import messages from './messages';
import DeploymentsPageHelmet from './helmet';
import styles from './styles';
import ContainerForm from './ContainerForm';
import configMapsSaga from '../ConfigMapsPage/saga';
import { initAction } from '../ConfigMapsPage/actions';
import { makeSelectConfigMaps } from '../ConfigMapsPage/selectors';

/* eslint-disable react/prefer-stateless-function */
export class CreateDeployment extends React.PureComponent {
  static propTypes = {
    initCreateForm: PropTypes.func,
    classes: PropTypes.object.isRequired,
    match: PropTypes.object,
    formData: PropTypes.object.isRequired,
    updateForm: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.initCreateForm(this.props.match);
    this.props.initConfigMaps(this.props.match);
  }

  render() {
    const {
      classes,
      formData,
      configMaps,
      updateForm,
      createDeployment,
    } = this.props;

    return (
      <div className={classes.root}>
        <DeploymentsPageHelmet />
        <CssBaseline />
        <Menubar headerText={<FormattedMessage {...messages.header} />} />
        <div className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Typography variant="h4" gutterBottom component="h2">
            <FormattedMessage {...messages.deployments} />
          </Typography>
          <Typography component="div" className={classes.chartContainer}>
            <div>
              <TextField
                className={classNames(classes.margin, classes.textField)}
                variant="outlined"
                label="name"
                value={formData.get('name')}
                onChange={(evt) => updateForm('name', evt.target.value)}
              />
              <TextField
                className={classNames(classes.margin, classes.textField)}
                variant="outlined"
                type="number"
                label="replicas"
                value={formData.get('replicas')}
                onChange={(evt) =>
                  updateForm('replicas', Number(evt.target.value))
                }
              />
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={(evt) => createDeployment()}
              >
                Create
              </Button>
              <GridList cellHeight="auto" cols="5">
                {formData.get('containers').map((item, index) => (
                  <GridListTile key={index}>
                    <ContainerForm
                      classes={classes}
                      index={index}
                      item={item}
                      configMaps={configMaps.toList()}
                      updateForm={updateForm}
                    />
                  </GridListTile>
                ))}
                <GridListTile>
                  <ListItemText primary="containers" />
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={(evt) => {
                      const { size } = formData.get('containers');
                      updateForm(
                        ['containers', size],
                        fromJS({
                          name: '',
                          image: '',
                          command: '',
                          args: '',
                          config_name: '',
                          mount_path: '',
                          exposed_ports: [],
                        }),
                      );
                    }}
                  >
                    more container
                  </Button>
                </GridListTile>
              </GridList>
            </div>
          </Typography>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  configMaps: makeSelectConfigMaps(),
  formData: makeSelectCreateFormData(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      initConfigMaps: initAction,
    },
    dispatch,
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'deploymentsPage', saga });
const withConigMapsSaga = injectSaga({
  key: 'configMapsPage',
  saga: configMapsSaga,
});

export default compose(
  withConigMapsSaga,
  withSaga,
  withConnect,
  withStyles(styles),
)(CreateDeployment);
