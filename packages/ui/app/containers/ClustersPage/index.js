/**
 *
 * ClustersPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import Menubar from 'components/Menubar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';

import { makeSelectURL } from 'ducks/clusters/selectors';
import * as actions from 'ducks/clusters/actions';

import messages from './messages';
import styles from './styles';
import ClustersTable from './ClustersTable';
import ClustersPageHelmet from './helmet';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import { injectIntl } from 'react-intl';
/* eslint-disable react/prefer-stateless-function */
export class ClustersPage extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.load();
    // this.timer = setInterval(() => this.load(), 3000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  load() {
    const {
      loadClusters,
      url,
    } = this.props;
    loadClusters(url);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <ClustersPageHelmet />
        <CssBaseline />
        <div className={classes.content}>
          <Breadcrumbs
            data={[
              {
                path:"/clusters",
                name: <FormattedMessage {...messages.clusters} />
              }
            ]}
          />
          <GridContainer className={classes.grid}>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>
                    <FormattedMessage {...messages.clusters} />
                  </h4>
                </CardHeader>
                <CardBody>
                  <ClustersTable />
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
)(ClustersPage);
