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
    this.props.initAction(this.props.match);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <ApplicationsPageHelmet />
        <CssBaseline />
        <div>
          <SelectNamespace />
        </div>
        <div className={classes.content}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>
                    <FormattedMessage {...messages.applications} />
                    <Link to={`${this.props.location.pathname}/create`}>
                      <Fab
                        size="small"
                        color="primary"
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

const mapStateToProps = createStructuredSelector({});

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
