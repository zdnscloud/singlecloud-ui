/**
 *
 * NamespacesPage
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import Menubar from 'components/Menubar';
import AddIcon from 'components/Icons/Add';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';

import { makeSelectClusterID } from 'ducks/app/selectors';
import { makeSelectCurrentCluster } from 'ducks/clusters/selectors';
import * as actions from 'ducks/namespaces/actions';

import messages from './messages';
import styles from './styles';
import NamespacesTable from './NamespacesTable';
import NamespacesPageHelmet from './helmet';

/* eslint-disable react/prefer-stateless-function */
export class NamespacesPage extends React.PureComponent {
  static propTypes = {
    initAction: PropTypes.func,
    classes: PropTypes.object.isRequired,
    match: PropTypes.object,
    location: PropTypes.object,
  };

  componentWillMount() {
    // this.props.initAction();
    this.load();
  }

  load() {
    const { cluster, clusterID, loadNamespaces } = this.props;
    const url = cluster.getIn(['links', 'namespaces']);
    if (url) {
      loadNamespaces(url, clusterID);
    }
  }

  render() {
    const { classes, clusterID } = this.props;
    return (
      <div className={classes.root}>
        <NamespacesPageHelmet />
        <CssBaseline />
        <div className={classes.content}>
          <Breadcrumbs
            data={[
              {
                path: `/clusters/${clusterID}/namespaces`,
                name: <FormattedMessage {...messages.pageTitle} />,
              },
            ]}
          />
          <Typography component="div">
            <GridContainer className={classes.grid}>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>
                      <FormattedMessage {...messages.namespaces} />
                      <IconButton
                        aria-label={
                          <FormattedMessage {...messages.namespaces} />
                        }
                        className={classes.menuButton}
                        component={Link}
                        to={`/clusters/${clusterID}/namespaces/create`}
                      >
                        <AddIcon style={{ color: '#fff' }} />
                      </IconButton>
                    </h4>
                  </CardHeader>
                  <CardBody>
                    <NamespacesTable location={this.props.location} />
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
)(NamespacesPage);
