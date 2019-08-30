/**
 *
 * Create Application Page
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';

import { makeSelectURL,makeSelectApplicationID, makeSelectCurrentApplication } from 'ducks/applications/selectors';
import {
  makeSelectClusterID,
  makeSelectNamespaceID,
} from 'ducks/app/selectors';
import * as actions from 'ducks/applications/actions';

import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import messages from './messages';
import styles from './styles';
import ApplicationsPageHelmet from './helmet';
import ApplicationsTable from './ApplicationsTable';
import moment from 'moment';

/* eslint-disable react/prefer-stateless-function */
export class ApplicationDetailPage extends React.PureComponent {
  static propTypes = {
    initAction: PropTypes.func,
    classes: PropTypes.object.isRequired,
    match: PropTypes.object,
    location: PropTypes.object,
  };

  componentWillMount() {
    const { clusterID, namespaceID, url,loadApplications } = this.props;
    loadApplications({url, clusterID, namespaceID});
  }

  render() {
    const { classes, clusterID, namespaceID, application} = this.props;
 
    return (
      <div className={classes.root}>
        <ApplicationsPageHelmet />
        <CssBaseline />
        <div className={classes.content}>
          <Breadcrumbs
            data={[
              {
                path: `/clusters/${clusterID}/namespaces/${namespaceID}/applications`,
                name: <FormattedMessage {...messages.pageTitle} />,
              },
              {
                name: <FormattedMessage {...messages.applicationDetail} />,
              },
            ]}
          />
          <Typography component="div" className="">
            <GridContainer className={classes.tagWrap}>
                <GridItem xs={6} sm={6} md={6}>
                    <p className={classes.tag}>Version {application.get('chartVersion')}</p>
                </GridItem>
                <GridItem xs={6} sm={6} md={6}>
                    <p className={classes.tag}>Created at {moment(application.get('creationTimestamp')).format('YYYY-MM-DD HH:mm:ss')} </p>
                </GridItem>
            </GridContainer>
            <GridContainer className={classes.grid}>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader>
                    <h4>
                      <FormattedMessage {...messages.quotasList} />
                    </h4>
                  </CardHeader>
                  <CardBody>
                    <ApplicationsTable />
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </Typography>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  url: makeSelectURL(),
  clusterID: makeSelectClusterID(),
  namespaceID: makeSelectNamespaceID(),
  applicationID: makeSelectApplicationID(),
  application: makeSelectCurrentApplication(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      submitForm: () => submit(formName),
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
)(ApplicationDetailPage);
