/**
 *
 * UserQuotasPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Menubar from 'components/Menubar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from 'components/Icons/Add';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';

import { makeSelectClusterID } from 'ducks/app/selectors';
import { makeSelectCurrentCluster } from 'ducks/clusters/selectors';
import * as actions from 'ducks/userQuotas/actions';

import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import messages from './messages';
import UserQuotasPageHelmet from './helmet';
import styles from './styles';
// import UserQuotasTable from './UserQuotasTable';
/* eslint-disable react/prefer-stateless-function */
export class UserQuotasPage extends React.PureComponent {
  static propTypes = {
    initAction: PropTypes.func,
    classes: PropTypes.object.isRequired,
    match: PropTypes.object,
  };

  componentWillMount() {
    this.load();
  }

  load() {
    const { cluster, clusterID, loadUserQuotas } = this.props;
    const url = cluster.getIn(['links', 'loadUserQuotas']);
    loadUserQuotas(url, clusterID);
  }

  render() {
    const { classes, clusterID } = this.props;

    return (
      <div className={classes.root}>
        <UserQuotasPageHelmet />
        <CssBaseline />
        <div className={classes.content}>
          <Breadcrumbs
            data={[
              {
                path: `/clusters/${clusterID}/userQuotas`,
                name: <FormattedMessage {...messages.pageTitle} />,
              },
            ]}
          />
          <GridContainer className={classes.grid}>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>
                    <FormattedMessage {...messages.userQuotas} />
                    <IconButton
                      aria-label={<FormattedMessage {...messages.userQuotas} />}
                      className={classes.menuButton}
                      component={Link}
                      to={`/clusters/${clusterID}/userQuotas/create`}
                    >
                      <AddIcon style={{ color: '#fff' }} />
                    </IconButton>
                  </h4>
                </CardHeader>
                <CardBody>
                  {/* <UserQuotasTable location={this.props.location} /> */}
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
  cluster: makeSelectCurrentCluster(),
  clusterID: makeSelectClusterID(),
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
)(UserQuotasPage);
