/**
 *
 * MetricsDialog
 *
 */
import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';

import Helmet from 'components/Helmet/Helmet';
import { FormattedMessage } from 'react-intl';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import CButton from 'components/CustomButtons/Button';
import Button from '@material-ui/core/Button';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from 'components/Icons/Close';

import { makeSelectCurrentID as makeSelectClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectNamespaceID } from 'ducks/namespaces/selectors';
import * as actions from 'ducks/metrics/actions';

import useStyles from './styles';
import messages from './messages';
import MetricsTable from './Table';

const MetricsDialog = ({
  clusterID,
  namespaceID,
  location,
  loadMetrics,
  url,
  id,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null);
  useEffect(() => {
    if (url) {
      loadMetrics(url, {
        clusterID,
        namespaceID,
        id,
      });
    }
    return () => {
      // try cancel something when unmount
    };
  }, [clusterID, id, loadMetrics, namespaceID, url]);

  return (
    <Fragment>
      <CButton
        className={classes.logBtn}
        link
        onClick={() => {
          setCurrent(null);
          if (url && id) {
            loadMetrics(url, {
              clusterID,
              namespaceID,
              id,
              resolve({ response }) {
                setCurrent(response);
              },
              reject() {},
            });
          }
          setOpen(true);
        }}
      >
        <FormattedMessage {...messages.metricBtn} />
      </CButton>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={() => {
          setCurrent(null);
          setOpen(false);
        }}
        fullWidth
        maxWidth="md"
      >
        <div className={classes.root}>
          <div className={classes.content}>
            <GridContainer className={classes.grid}>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader>
                    <h4>
                      <FormattedMessage {...messages.metrics} />
                    </h4>
                  </CardHeader>
                  <CardBody>
                    <MetricsTable data={current} />
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </Dialog>
    </Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectClusterID(),
  namespaceID: makeSelectNamespaceID(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(MetricsDialog);
