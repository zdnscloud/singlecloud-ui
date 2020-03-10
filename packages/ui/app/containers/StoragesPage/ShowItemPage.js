/**
 *
 * ConfigMapsPage
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import Helmet from 'components/Helmet/Helmet';
import { Link } from 'react-router-dom';
import Menubar from 'components/Menubar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Table from 'components/Table/Table';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';

import { makeSelectCurrentID as makeSelectClusterID } from 'ducks/clusters/selectors';
import * as actions from 'ducks/storages/actions';
import {
  makeSelectURL,
  makeSelectCurrent,
  makeSelectCurrentID,
} from 'ducks/storages/selectors';

import messages from './messages';
import useStyles from './styles';
import Node from './Node';
import PVTable from './PVTable';

/* eslint-disable react/prefer-stateless-function */
export const StoragePage = ({
  clusterID,
  readStorage,
  id,
  url,
  storage,
}) => {
  const classes = useStyles();
  useEffect(() => {
    if (url && id) {
      readStorage(id, { clusterID, url: `${url}/${id}` });
    }
  }, [clusterID, url, id, readStorage]);
  const [checkedNode, setCheckedNode] = useState(null);

  const type = storage.get('type');
  const totalSize = storage.get('size');
  const freeSize = storage.get('freeSize');
  const usedSize = storage.get('usedSize');
  const nodes = storage.get('nodes');
  const pvs = storage.get('pvs');
  const enableFilter = storage.get('type') === 'lvm';

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/storages`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
            {
              name: <FormattedMessage {...messages.storageDetail} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <Card className={classes.cardMargin}>
              <CardHeader>
                <h4>{type}</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={2} sm={2} md={2}>
                    <ReadOnlyInput
                      labelText={<FormattedMessage {...messages.size} />}
                      value={`${totalSize}`}
                      inputProps={{
                        endAdornment: <span className={classes.text}>G</span>,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={2} sm={2} md={2}>
                    <ReadOnlyInput
                      labelText={<FormattedMessage {...messages.freeSize} />}
                      value={`${freeSize}`}
                      inputProps={{
                        endAdornment: <span className={classes.text}>G</span>,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={2} sm={2} md={2}>
                    <ReadOnlyInput
                      labelText={<FormattedMessage {...messages.usedSize} />}
                      value={`${usedSize}`}
                      inputProps={{
                        endAdornment: <span className={classes.text}>G</span>,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  {nodes &&
                    nodes.map((node, i) => (
                      <GridItem key={i} xs={3} sm={3} md={3}>
                        <Node
                          node={node}
                          checkedNode={checkedNode}
                          onClick={
                            enableFilter
                              ? (evt) => {
                                const nodeName = node.get('name');
                                if (nodeName === checkedNode) {
                                  setCheckedNode(null);
                                } else {
                                  setCheckedNode(nodeName);
                                }
                              }
                              : null
                          }
                        />
                      </GridItem>
                    ))}
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.pvList} />
                </h4>
              </CardHeader>
              <CardBody>
                {pvs ? (
                  <PVTable
                    data={pvs.filter((pv) => {
                      if (checkedNode) {
                        return pv.get('node') === checkedNode;
                      }
                      return true;
                    })}
                  />
                ) : null}
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectClusterID(),
  id: makeSelectCurrentID(),
  url: makeSelectURL(),
  storage: makeSelectCurrent(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(StoragePage);
