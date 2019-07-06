/**
 *
 * UserQuotaDetailPage
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
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput';

import {
  makeSelectClusterID,
  makeSelectNamespaceID,
} from 'ducks/app/selectors';
import {
  makeSelectCurrentUserQuota,
  makeSelectURL,
} from 'ducks/userQuotas/selectors';
import * as actions from 'ducks/userQuotas/actions';

import messages from './messages';
import UserQuotaDetailPageHelmet from './helmet';
import styles from './styles';
/* eslint-disable react/prefer-stateless-function */
export class UserQuotaDetailPage extends React.PureComponent {
  static propTypes = {
    initAction: PropTypes.func,
    classes: PropTypes.object.isRequired,
    match: PropTypes.object,
    location: PropTypes.object,
  };

  componentWillMount() {
    this.load();
  }

  load() {
    const { loadUserQuotas, url } = this.props;
    loadUserQuotas(url);
  }

  render() {
    const { classes, userQuota } = this.props;

    return (
      <div className={classes.root}>
        <UserQuotaDetailPageHelmet />
        <CssBaseline />
        <div className={classes.content}>
          <Breadcrumbs
            data={[
              {
                path: `/userQuotas`,
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
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>
                    <FormattedMessage {...messages.detail} />
                  </h4>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={3} sm={3} md={3}>
                      <ReadOnlyInput
                        labelText={
                          <FormattedMessage {...messages.formClusterName} />
                        }
                        fullWidth
                        value={userQuota.get('clusterName')}
                      />
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                      <ReadOnlyInput
                        labelText={
                          <FormattedMessage {...messages.formNamespace} />
                        }
                        fullWidth
                        value={userQuota.get('namespace')}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={3} sm={3} md={3}>
                      <ReadOnlyInput
                        labelText={<FormattedMessage {...messages.formCPU} />}
                        fullWidth
                        inputProps={{
                          endAdornment: (
                            <FormattedMessage
                              {...messages.formCPUEndAdornment}
                            />
                          ),
                        }}
                        value={userQuota.get('cpu')}
                      />
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                      <ReadOnlyInput
                        labelText={
                          <FormattedMessage {...messages.formMemory} />
                        }
                        fullWidth
                        inputProps={{
                          endAdornment: 'Gi',
                        }}
                        value={userQuota.get('memory')}
                      />
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                      <ReadOnlyInput
                        labelText={
                          <FormattedMessage {...messages.formStorage} />
                        }
                        fullWidth
                        inputProps={{
                          endAdornment: 'Gi',
                        }}
                        value={userQuota.get('storage')}
                      />
                    </GridItem>
                  </GridContainer>
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
  userQuota: makeSelectCurrentUserQuota(),
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
)(UserQuotaDetailPage);
