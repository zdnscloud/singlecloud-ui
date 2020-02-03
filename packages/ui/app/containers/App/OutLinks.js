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
import getByKey from '@gsmlg/utils/getByKey';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Danger from 'components/Typography/Danger';
import ClusterWatchIcon from 'components/Icons/ClusterWatch';
import ImageRegistryIcon from 'components/Icons/ImageRegistry';
import ConfirmDialog from 'components/Confirm/ConfirmDialog';

import * as actions from 'ducks/app/actions';
import * as mActions from 'ducks/monitors/actions';
import * as rActions from 'ducks/registries/actions';
import * as eActions from 'ducks/efks/actions';
import { makeSelectRole, makeSelectIsAdmin } from 'ducks/role/selectors';
import { makeSelectShowMenuText } from 'ducks/app/selectors';
import {
  makeSelectCurrentID as makeSelectCurrentClusterID,
  makeSelectCurrent as makeSelectCurrentCluster,
} from 'ducks/clusters/selectors';

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
  loadEfks,
  role,
  submitForm,
  formValues,
  createMonitor,
  createRegistry,
  createEfk,
  isAdmin,
  handleClose,
  setHidden,
}) => {
  let menus = [
    {
      name: 'ImageRegistry',
      icon: ImageRegistryIcon,
      role: 'registries',
      adminOnly: true,
    },
    {
      name: 'ClusterWatch',
      icon: ClusterWatchIcon,
      role: 'monitors',
    },
    {
      name: 'LogAnalysis',
      role: 'efks',
    },
  ];
  if (!isAdmin) {
    menus = menus.filter((m) => m.adminOnly === undefined);
  }
  const classes = useStyles({ showText });
  const actions = {
    loadMonitors,
    loadRegistries,
    loadEfks,
    createMonitor,
    createRegistry,
    createEfk,
  };
  const [open, setOpen] = useState(false);
  const [memuRole, setMemuRole] = useState(null);
  const [error, setError] = useState(null);

  const handleMemuClick = (role) => {
    setMemuRole(role);
    const loadAction = `load${inflection.camelize(role)}`;
    const url = cluster.getIn(['links', role]);
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
    setHidden('hidden');
  };

  async function doSubmit() {
    try {
      const data = formValues ? formValues.toJS() : {};
      const url = cluster.getIn(['links', memuRole]);
      const createAction = `create${inflection.camelize(
        inflection.singularize(memuRole)
      )}`;
      await new Promise((resolve, reject) => {
        actions[createAction](data, {
          resolve() {
            setOpen(false);
            setHidden('inherit');
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
    const url = cluster.getIn(['links', memuRole]);
    createMonitor(
      {},
      {
        url,
        clusterID,
        resolve() {
          setOpen(false);
        },
        reject(e) {
          setError(e);
        },
      }
    );
  };

  const outLinks = (
    <List component="div" disablePadding>
      {menus.map((prop, key) => {
        const msgName = messages[`leftMenu${prop.name}`];
        return (
          <Fragment key={key}>
            <ListItem
              button
              className={classNames(classes.itemLink, classes.nested)}
              onClick={() => handleMemuClick(prop.role)}
            >
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
          setError(null);
          handleClose();
        }}
        title={<FormattedMessage {...messages.leftMenuDialogTitle} />}
        content={
          memuRole === 'monitors' ? (
            <>
              {error ? (
                <Danger>{getByKey(error, ['response', 'message'])}</Danger>
              ) : null}
              <FormattedMessage {...messages.leftMenuDialogContent} />
            </>
          ) : (
            <RegistryForm role={role} onSubmit={doSubmit} memuRole={memuRole} />
          )
        }
        onAction={() =>
          memuRole === 'monitors' ? handleMonitorInstall() : submitForm()
        }
        sureButtonText={messages.leftMenuDialogButtonInstall}
      />
    </Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectCurrentClusterID(),
  cluster: makeSelectCurrentCluster(),
  showText: makeSelectShowMenuText(),
  role: makeSelectRole(),
  formValues: getFormValues(formName),
  isAdmin: makeSelectIsAdmin(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      loadMonitors: mActions.loadMonitors,
      createMonitor: mActions.createMonitor,
      loadRegistries: rActions.loadRegistries,
      createRegistry: rActions.createRegistry,
      loadEfks: eActions.loadEfks,
      createEfk: eActions.createEfk,
      submitForm: () => submit(formName),
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(OutLinks);
