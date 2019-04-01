/**
 *
 * ApplicationsPage
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
import AddIcon from '@material-ui/icons/Add';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';

import injectSaga from 'utils/injectSaga';
import { makeSelectClusterID, makeSelectNamespaceID } from '../App/selectors';
import { makeSelectNamespaces } from '../NamespacesPage/selectors';
import makeSelectApplicationsPage from './selectors';
import reducer from './reducer';
import * as actions from './actions';
import saga from './saga';
import messages from './messages';
import ApplicationsPageHelmet from './helmet';
import styles from './styles';
import ApplicationsTable from './ApplicationsTable';
import SelectNamespace from './SelectNamespace';

/* eslint-disable react/prefer-stateless-function */
export class ApplicationsPage extends React.PureComponent {
  static propTypes = {
    initAction: PropTypes.func,
    classes: PropTypes.object.isRequired,
    match: PropTypes.object,
    location: PropTypes.object,
  };

  componentWillMount() {
    const { clusterID, namespaces, namespaceID, history } = this.props;
    if (!namespaceID) {
      const ns = namespaces.get('default') || namespaces.fisrt();
      history.replace(
        `/clusters/${clusterID}/namespaces/${ns.get('id')}/applications`
      );
    }
    this.props.initAction(this.props.match);
  }

  componentDidUpdate(prevProps) {
    const { clusterID, namespaces, namespaceID, history } = this.props;
    const {
      clusterID: prevClusterID,
      namespaces: prevNamespaces,
      namespaceID: prevNamespaceID,
      history: prevHistory,
    } = prevProps;
    if (!namespaceID) {
      const ns = namespaces.get('default') || namespaces.fisrt();
      history.replace(
        `/clusters/${clusterID}/namespaces/${ns.get('id')}/applications`
      );
    }
    if (namespaceID !== prevNamespaceID) {
      this.props.initAction(this.props.match);
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <ApplicationsPageHelmet />
        <CssBaseline />
        <div className={classes.select}>
          <SelectNamespace />
        </div>
        <div className={classes.content}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="customBlue">
                  <h4 className={classes.cardTitleWhite}>
                    <FormattedMessage {...messages.applications} />
                    <Link
                      to={`${this.props.location.pathname}/create`}
                      className={classes.createBtnLink}
                    >
                      <Fab
                        size="small"
                        color="default"
                        aria-label="create application"
                        className={classes.menuButton}
                      >
                        <AddIcon />
                      </Fab>
                    </Link>
                  </h4>
                </CardHeader>
                <CardBody>
                  <ApplicationsTable location={this.props.location} />
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
  namespaces: makeSelectNamespaces(),
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

const withSaga = injectSaga({ key: 'applicationsPage', saga });

export default compose(
  withSaga,
  withConnect,
  withStyles(styles)
)(ApplicationsPage);
