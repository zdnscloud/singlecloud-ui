/**
 *
 * UsersPage
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
import IconButton from '@material-ui/core/IconButton';

import AddIcon from 'components/Icons/Add';
import Menubar from 'components/Menubar';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';

import { makeSelectLocation } from 'ducks/app/selectors';
import * as actions from 'ducks/users/actions';

import messages from './messages';
import styles from './styles';
import UsersTable from './UsersTable';
import UsersPageHelmet from './helmet';

/* eslint-disable react/prefer-stateless-function */
export class UsersPage extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.props.loadUsers();
  }

  render() {
    const { classes, location, createUser } = this.props;

    return (
      <div className={classes.root}>
        <UsersPageHelmet />
        <CssBaseline />
        <div className={classes.content}>
          <Breadcrumbs
            data={[
              {
                name: <FormattedMessage {...messages.usersList} />,
              },
            ]}
          />
          <GridContainer className={classes.grid}>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader>
                  <h4>
                    <FormattedMessage {...messages.users} />
                  </h4>
                  <Link
                    to={`${location.get('pathname')}/create`}
                    className={classes.createBtnLink}
                  >
                    <IconButton
                      size="small"
                      color="default"
                      aria-label="create user"
                    >
                      <AddIcon />
                    </IconButton>
                  </Link>
                </CardHeader>
                <CardBody>
                  <UsersTable />
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
  location: makeSelectLocation(),
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
)(UsersPage);
