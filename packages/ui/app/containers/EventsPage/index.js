/**
 *
 * EventsPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector, createSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { reduxForm, getFormValues } from 'redux-form/immutable';
import { fromJS } from 'immutable';

import { withStyles } from '@material-ui/core/styles';
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
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';

import { makeSelectEvents } from 'ducks/events/selectors';
import * as actions from 'ducks/events/actions';

import messages from './messages';
import useStyles from './styles';
import EventsTable from './Table';
import EventsPageHelmet from './helmet';
import FilterForm from './EventsFilterForm';

export const formName = 'eventsFilterForm';

const EventsFilterForm = reduxForm({
  form: formName,
})(FilterForm);

const formInitialValues = fromJS({
  type: '__all__',
  namespace: '__all__',
  kind: '__all__',
  name: '__all__',
});

const EventsPage = ({ clusterID, events, filters }) => {
  const classes = useStyles();
  const options = events.reduce(
    ({ types, namespaces, kinds, names }, { type, namespace, kind, name }) => ({
      types: types.includes(type) ? types : types.concat([type]),
      namespaces: namespaces.includes(namespace)
        ? namespaces
        : namespaces.concat([namespace]),
      kinds: kinds.includes(kind) ? kinds : kinds.concat([kind]),
      names: names.includes(name) ? names : names.concat([name]),
    }),
    {
      types: [],
      namespaces: [],
      kinds: [],
      names: [],
    }
  );

  return (
    <div className={classes.root}>
      <EventsPageHelmet />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/events`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
          ]}
        />
        <Typography component="div">
          <GridContainer className={classes.grid}>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader>
                  <h4>
                    <FormattedMessage {...messages.events} />
                  </h4>
                </CardHeader>
                <CardBody>
                  <EventsFilterForm
                    classes={classes}
                    initialValues={formInitialValues}
                    {...options}
                  />
                  <EventsTable filters={filters} />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </Typography>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  events: makeSelectEvents(),
  filters: createSelector(
    getFormValues(formName),
    (v) => v || formInitialValues
  ),
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

export default compose(withConnect)(EventsPage);
