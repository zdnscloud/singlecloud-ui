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
import CardFooter from 'components/Card/CardFooter';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput';
import ReadOnlyTextarea from 'components/CustomTextarea/ReadOnlyTextarea';

import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

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
    const reg = /^(\d+)([a-zA-Z]+)?$/;
    const memory = userQuota.get('memory');
    const storage = userQuota.get('storage');
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
                name: <FormattedMessage {...messages.detail} />,
              },
            ]}
          />
          <GridContainer className={classes.grid}>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader>
                  <h4>
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
                          endAdornment: (reg.exec(memory) || [])[2],
                        }}
                        value={(reg.exec(memory) || [])[1]}
                      />
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                      <ReadOnlyInput
                        labelText={
                          <FormattedMessage {...messages.formStorage} />
                        }
                        fullWidth
                        inputProps={{
                          endAdornment: (reg.exec(storage) || [])[2],
                        }}
                        value={(reg.exec(storage) || [])[1]}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={9} sm={9} md={9} className={classes.formLine}>
                      <ReadOnlyTextarea
                        name="purpose"
                        label={<FormattedMessage {...messages.formPurpose} />}
                        formControlProps={{
                          className: classes.textareaControl,
                        }}
                        inputProps={{
                          type: 'text',
                          autoComplete: 'off',
                          rows: '4',
                        }}
                        value={userQuota.get('purpose')}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={9} sm={9} md={9} className={classes.formLine}>
                      <ReadOnlyTextarea
                        name="purpose"
                        label={
                          <FormattedMessage {...messages.formRejectionReason} />
                        }
                        formControlProps={{
                          className: classes.textareaControl,
                        }}
                        inputProps={{
                          type: 'text',
                          autoComplete: 'off',
                          rows: '4',
                        }}
                        value={userQuota.get('rejectionReason')}
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
