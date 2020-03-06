/**
 *
 * GlobalConfigurationPage
 *
 */
import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { fromJS } from 'immutable';
import {
  reduxForm,
  getFormValues,
  SubmissionError,
  submit,
} from 'redux-form/immutable';
import { connect } from 'react-redux';

import Helmet from 'components/Helmet/Helmet';
import { FormattedMessage } from 'react-intl';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import ConfirmDialog from 'components/Confirm/ConfirmDialog';

import {
  makeSelectURL,
  makeSelectThresholdsList,
} from 'ducks/thresholds/selectors';
import * as actions from 'ducks/thresholds/actions';

import useStyles from './styles';
import messages from './messages';
import CreateThresholdForm, { formName } from './CreateForm';

const GlobalConfigurationPage = ({
  location,
  url,
  updateThreshold,
  loadThresholds,
  submitForm,
  values,
  list,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const current = list && list.first();
  useEffect(() => {
    if (url) {
      loadThresholds(url);
    }
    return () => {
      // try cancel something when unmount
    };
  }, [loadThresholds, url]);

  async function doSubmit(formValues) {
    try {
      const data = formValues.toJS();
      const { mailTo } = data;
      if (mailTo) {
        data.mailTo = mailTo.split(';');
      }
      const updateUrl = current.getIn(['links', 'update']);
      await new Promise((resolve, reject) => {
        updateThreshold(data, {
          resolve(res) {
            if (res.status === 200) {
              setOpen(true);
            }
          },
          reject,
          url: updateUrl,
        });
      });
    } catch (error) {
      throw new SubmissionError({ _error: error });
    }
  }

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              name: <FormattedMessage {...messages.pageTitle} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <CreateThresholdForm
              onSubmit={doSubmit}
              formValues={values}
              initialValues={
                current &&
                current.update((c) => {
                  const data = c.toJS();
                  let { mailTo } = data;
                  if (mailTo) {
                    mailTo = mailTo.join(';');
                  }
                  data.mailTo = mailTo;
                  return data;
                })
              }
            />
            <div className={classes.buttonGroup}>
              <Button variant="contained" color="primary" onClick={submitForm}>
                <FormattedMessage {...messages.save} />
              </Button>
            </div>
          </GridItem>
        </GridContainer>
        <ConfirmDialog
          open={!!open}
          onClose={() => {
            setOpen(false);
          }}
          title={<FormattedMessage {...messages.leftMenuDialogTitle} />}
          content={<FormattedMessage {...messages.leftMenuDialogContent} />}
          onAction={() => {
            window.location.reload();
            setOpen(false);
          }}
          hideCancleBtn
        />
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  url: makeSelectURL(),
  values: getFormValues(formName),
  list: makeSelectThresholdsList(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      submitForm: () => submit(formName),
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(GlobalConfigurationPage);
