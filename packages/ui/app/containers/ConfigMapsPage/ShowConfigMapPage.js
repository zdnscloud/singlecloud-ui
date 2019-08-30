/**
 *
 * ShowConfigMapPage
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector, createSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { fromJS } from 'immutable';
import { reduxForm, getFormValues } from 'redux-form/immutable';
import { SubmissionError, submit } from 'redux-form';

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
import Dialog from '@material-ui/core/Dialog';
import AttachmentIcon from '@material-ui/icons/Attachment';
import AceEditor from 'react-ace';
import 'brace/mode/yaml';
import 'brace/theme/github';
import 'brace/theme/tomorrow_night';

import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import CardFooter from 'components/Card/CardFooter';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput';

import { makeSelectCurrentID as makeSelectClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectNamespaceID } from 'ducks/namespaces/selectors';
import * as actions from 'ducks/configMaps/actions';
import {
  makeSelectCurrentID,
  makeSelectCurrent,
  makeSelectURL,
} from 'ducks/configMaps/selectors';

import messages from './messages';
import ConfigMapsPageHelmet from './helmet';
import styles from './styles';

export const ShowConfigMap = ({
  classes,
  clusterID,
  namespaceID,
  id,
  url,
  configMap,
  readConfigMap,
}) => {
  useEffect(() => {
    readConfigMap(id, { url: `${url}/${id}`, clusterID, namespaceID });
  }, [clusterID, id, namespaceID, readConfigMap, url]);
  const [isOpen, setIsOpen] = useState(false);
  const [fileIndex, setFileIndex] = useState(null);

  const configs = configMap.get('configs') || [];

  return (
    <div className={classes.root}>
      <ConfigMapsPageHelmet />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/configmaps`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
            {
              name: <FormattedMessage {...messages.showConfigMap} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.showConfigMap} />
                </h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                    <ReadOnlyInput
                      labelText={<FormattedMessage {...messages.formName} />}
                      value={configMap && configMap.get('name')}
                      formControlProps={{
                        className: classes.nameControl,
                      }}
                      fullWidth
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <GridContainer>
                      {configMap &&
                        configMap.get('configs') &&
                        configMap.get('configs').map((cfg, idx) => (
                          <GridItem
                            xs={3}
                            sm={3}
                            md={3}
                            key={`${idx}-${cfg.get('name')}`}
                          >
                            <ReadOnlyInput
                              labelText={
                                <FormattedMessage {...messages.formFileName} />
                              }
                              value={cfg.get('name')}
                              fullWidth
                              formControlProps={{
                                className: classes.nameControl,
                              }}
                              classes={{
                                input: classes.fileNameLink,
                              }}
                              inputProps={{
                                disabled: false,
                                readOnly: true,
                                onClick: (evt) => {
                                  setIsOpen(true);
                                  setFileIndex(idx);
                                },
                              }}
                            />
                          </GridItem>
                        ))}
                    </GridContainer>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <Dialog
          maxWidth="lg"
          fullWidth
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
            setFileIndex(null);
          }}
          PaperProps={{ style: { overflow: 'hidden' } }}
        >
          <Card className={classes.dialogCard}>
            <CardHeader color="secondary" className={classes.dialogHeader}>
              <h4>
                <FormattedMessage {...messages.formShowFile} />
              </h4>
            </CardHeader>
            <CardBody>
              <AceEditor
                focus
                mode="yaml"
                theme="tomorrow_night"
                value={
                  configMap && configMap.getIn(['configs', fileIndex, 'data'])
                }
                height="calc(100vh - 225px)"
                width="calc(100vw - 200px)"
                readOnly
              />
            </CardBody>
            <CardFooter>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  setIsOpen(false);
                  setFileIndex(null);
                }}
              >
                <FormattedMessage {...messages.formCloseFile} />
              </Button>
            </CardFooter>
          </Card>
        </Dialog>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectClusterID(),
  namespaceID: makeSelectNamespaceID(),
  id: makeSelectCurrentID(),
  configMap: makeSelectCurrent(),
  url: makeSelectURL(),
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
)(ShowConfigMap);
