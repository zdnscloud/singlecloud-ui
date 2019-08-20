/**
 *
 * Registries
 *
 */
import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Helmet from 'components/Helmet/Helmet';
import { FormattedMessage } from 'react-intl';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from 'components/Icons/Edit';

import { makeSelectURL ,makeSelectRegistriesList} from 'ducks/registries/selectors';
import * as actions from 'ducks/registries/actions';
import { makeSelectRole } from 'ducks/role/selectors';

import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput';

import useStyles from './styles';
import messages from './messages';

const Registries = ({
  url,
  loadRegistries,
  list,
  role
}) => {
  const classes = useStyles();
  useEffect(() => {
    if (url) {
      loadRegistries(url);
    }
    return () => {
      // try cancel something when unmount
    };
  }, [url]);

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <Breadcrumbs
            data={[
              {
                path: '/registries',
                name: <FormattedMessage {...messages.pageTitle} />,
              },
            ]}
          />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>
                    <FormattedMessage {...messages.registries} />
                    <IconButton
                      className={classes.menuButton}
                      component={Link}
                      to="/registries/update"
                    >
                      <EditIcon style={{ color: '#fff' }} />
                    </IconButton>
                  </h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                    <ReadOnlyInput
                      label={<FormattedMessage {...messages.formIngressDomain} />}
                      value={list && list.getIn([0,'ingressDomain'])}
                      fullWidth                    
                    />
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                    <ReadOnlyInput
                      label={<FormattedMessage {...messages.formCluster} />}
                      value={list && list.getIn([0,'cluster'])}
                      fullWidth                    
                    />
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                    <ReadOnlyInput
                      label={<FormattedMessage {...messages.formUser} />}
                      value={role.get('user')}
                      fullWidth                    
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  url: makeSelectURL(),
  list: makeSelectRegistriesList(),
  role: makeSelectRole(),
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
  memo
)(Registries);
