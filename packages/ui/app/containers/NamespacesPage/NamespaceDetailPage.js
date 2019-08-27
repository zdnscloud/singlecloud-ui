/**
 *
 * NamespaceDetailPage
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
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import {
  makeSelectClusterID,
  makeSelectNamespaceID,
} from 'ducks/app/selectors';
import {
  makeSelectResourceQuotaID,
  makeSelectCurrentResourceQuota,
  makeSelectURL,
} from 'ducks/resourceQuotas/selectors';
import * as actions from 'ducks/resourceQuotas/actions';

import ResourceQuota from './ResourceQuota';
import messages from './messages';
import NamespaceDetailPageHelmet from './helmet';
import styles from './styles';
/* eslint-disable react/prefer-stateless-function */
export class NamespaceDetailPage extends React.PureComponent {
  static propTypes = {
    initAction: PropTypes.func,
    classes: PropTypes.object.isRequired,
    match: PropTypes.object,
    location: PropTypes.object,
  };

  componentWillMount() {
    const { clusterID, namespaceID, url, loadResourceQuota } = this.props;
    loadResourceQuota({ url, clusterID, namespaceID });
  }

  render() {
    const { classes, resourceQuota, clusterID, namespaceID } = this.props;
    return (
      <div className={classes.root}>
        <NamespaceDetailPageHelmet />
        <CssBaseline />
        <div className={classes.content}>
          <Breadcrumbs
            data={[
              {
                path: `/clusters/${clusterID}/namespaces`,
                name: <FormattedMessage {...messages.pageTitle} />,
              },
              {
                name: <FormattedMessage {...messages.namespaceDetail} />,
              },
            ]}
          />
          <GridContainer className={classes.grid}>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader>
                  <h4 className={classes.cardTitleWhite}>
                    <FormattedMessage {...messages.detail} />
                  </h4>
                </CardHeader>
                <CardBody>
                  <ResourceQuota resourceQuota={resourceQuota} />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectClusterID(),
  namespaceID: makeSelectNamespaceID(),
  url: makeSelectURL(),
  resourceQuota: makeSelectCurrentResourceQuota(),
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
)(NamespaceDetailPage);
