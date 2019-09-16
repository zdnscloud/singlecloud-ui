/* eslint-disable no-shadow */
import React, { Fragment, useEffect, useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import {
  reduxForm,
  getFormValues,
  SubmissionError,
  submit,
} from 'redux-form/immutable';
// @material-ui/core components

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import * as actions from 'ducks/app/actions';
import * as mActions from 'ducks/monitors/actions';
import * as rActions from 'ducks/registries/actions';
import { makeSelectRole } from 'ducks/role/selectors';
import { makeSelectCurrentCluster } from 'ducks/clusters/selectors';
import { makeSelectError } from 'ducks/monitors/selectors';
import {
  makeSelectClusterID,
  makeSelectShowMenuText,
} from 'ducks/app/selectors';

import Danger from 'components/Typography/Danger';
import ClusterWatchIcon from 'components/Icons/ClusterWatch';
import ImageRegistryIcon from 'components/Icons/ImageRegistry';
import ConfirmDialog from 'components/Confirm/ConfirmDialog';

import messages from './messages';
import useStyles from './LeftMenuStyle';
import RegistryForm, { formName } from './form/RegistryForm';

const inflection = require('inflection');

const OutLinks = ({
  showText,
  cluster,
  clusterID,
  loadMonitors,
  loadRegistries,
  role,
  submitForm,
  formValues,
  createMonitor,
  createRegistry,
  monitorsError,
  clearErrorInfo,
}) => {
  const menus = [
    {
      name: 'ImageRegistry',
      icon: ImageRegistryIcon,
      role: 'registries',
    },
    {
      name: 'ClusterWatch',
      icon: ClusterWatchIcon,
      role: 'monitors',
    },
  ];
  const classes = useStyles({ showText });
  const actions = {
    loadMonitors,
    loadRegistries,
    createMonitor,
    createRegistry,
  };
  const [open, setOpen] = useState(false);
  const [memuRole, setMemuRole] = useState('registries');
  const url = cluster.getIn(['links', memuRole]);

  const handleMemuClick = (role) => {
    setMemuRole(role);
    const loadAction = `load${inflection.camelize(role)}`;
    actions[loadAction](url, {
      clusterID,
      resolve(res) {
        if (res.response.data.length > 0) {
          window.open(res.response.data[0].redirectUrl);
        } else {
          setOpen(true);
        }
      },
      reject() {},
    });
  };

  async function doSubmit() {
    try {
      const data = formValues ? formValues.toJS() : {};
      await new Promise((resolve, reject) => {
        createRegistry(data, {
          resolve() {
            setOpen(false);
          },
          reject,
          url,
        });
      });
    } catch (error) {
      throw new SubmissionError({ _error: error });
    }
  }

  const handleMonitorInstall = () => {
    createMonitor(
      {},
      {
        url,
        clusterID,
        resolve() {
          setOpen(false);
        },
        reject() {},
      }
    );
  };

  const outLinks = (
    <List className={classes.list}>
      {menus.map((prop, key) => {
        const msgName = messages[`leftMenu${prop.name}`];
        return (
          <Fragment key={key}>
            <ListItem
              button
              className={classes.itemLink}
              onClick={() => handleMemuClick(prop.role)}
            >
              {prop.icon ? (
                <ListItemIcon className={classes.itemIcon}>
                  <prop.icon fontSize="small" />
                </ListItemIcon>
              ) : null}
              <ListItemText
                primary={<FormattedMessage {...msgName} />}
                className={classNames(classes.itemText)}
                disableTypography
              />
            </ListItem>
          </Fragment>
        );
      })}
    </List>
  );
  return (
    <Fragment>
      {outLinks}
      <ConfirmDialog
        open={!!open}
        onClose={() => {
          setOpen(false);
          clearErrorInfo();
        }}
        title={<FormattedMessage {...messages.leftMenusDialogTitle} />}
        content={
          memuRole === 'registries' ? (
            <RegistryForm role={role} onSubmit={doSubmit} />
          ) : (
            <>
              {monitorsError ? <Danger>{monitorsError}</Danger> : null}
              <FormattedMessage {...messages.leftMenusDialogContent} />
            </>
          )
        }
        onAction={() =>
          memuRole === 'registries' ? submitForm() : handleMonitorInstall()
        }
        sureButtonText={messages.leftMenusDialogButtonInstall}
      />
    </Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectClusterID(),
  showText: makeSelectShowMenuText(),
  cluster: makeSelectCurrentCluster(),
  role: makeSelectRole(),
  formValues: getFormValues(formName),
  monitorsError: makeSelectError(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      loadMonitors: mActions.loadMonitors,
      createMonitor: mActions.createMonitor,
      clearErrorInfo: mActions.clearErrorInfo,
      loadRegistries: rActions.loadRegistries,
      createRegistry: rActions.createRegistry,
      submitForm: () => submit(formName),
    },
    dispatch
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(OutLinks);
