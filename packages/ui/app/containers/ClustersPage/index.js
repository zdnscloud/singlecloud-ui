/**
 *
 * ClustersPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
// import { mainListItems, secondaryListItems } from './listItems';
// import SimpleLineChart from './SimpleLineChart';
// import SimpleTable from './SimpleTable';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectClustersPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import styles from './styles';

/* eslint-disable react/prefer-stateless-function */
export class ClustersPage extends React.PureComponent {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: false });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.menuButtonHidden,
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              <FormattedMessage {...messages.header} />
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        {/* <Drawer */}
        {/*   variant="permanent" */}
        {/*   classes={{ */}
        {/*     paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose), */}
        {/*   }} */}
        {/*   open={this.state.open} */}
        {/* > */}
        {/*   <div className={classes.toolbarIcon}> */}
        {/*     <IconButton onClick={this.handleDrawerClose}> */}
        {/*       <ChevronLeftIcon /> */}
        {/*     </IconButton> */}
        {/*   </div> */}
        {/*   <Divider /> */}
        {/*   {/\* <List>{mainListItems}</List> *\/} */}
        {/*   <Divider /> */}
        {/*   {/\* <List>{secondaryListItems}</List> *\/} */}
        {/* </Drawer> */}
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Typography variant="h4" gutterBottom component="h2">
            Clusters
          </Typography>
          <Typography component="div" className={classes.chartContainer}>
          </Typography>
        </main>
      </div>
    );
  }
}

ClustersPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  clustersPage: makeSelectClustersPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'clustersPage', reducer });
const withSaga = injectSaga({ key: 'clustersPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles),
)(ClustersPage);
