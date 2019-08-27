/**
 *
 * Create Namespace Page
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { fromJS } from 'immutable';
import { reduxForm, getFormValues } from 'redux-form/immutable';
import { SubmissionError, submit } from 'redux-form';

import { withStyles } from '@material-ui/core/styles';
import Menubar from 'components/Menubar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from 'components/Icons/Add';
import Button from '@material-ui/core/Button';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';

import {
  makeSelectClusterID,
  makeSelectNamespaceID,
} from 'ducks/app/selectors';
import { makeSelectCurrentCluster } from 'ducks/clusters/selectors';
import * as actions from 'ducks/resourceQuotas/actions';

import {
  makeSelectResourceQuotaID,
  makeSelectCurrentResourceQuota,
  makeSelectURL,
} from 'ducks/resourceQuotas/selectors';

import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import messages from './messages';
import styles from './styles';
import NamespacesPageHelmet from './helmet';
import NamespaceForm from './NamespaceForm';

export const formName = 'createNamespaceForm';

const validate = (values) => {
  const errors = {};
  const requiredFields = ['name'];
  requiredFields.forEach((field) => {
    if (!values.get(field)) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

const CreateNamespaceForm = reduxForm({
  form: formName,
  validate,
})(NamespaceForm);

/* eslint-disable react/prefer-stateless-function */
export class EditNamespacePage extends React.PureComponent {
  static propTypes = {
    initAction: PropTypes.func,
    classes: PropTypes.object.isRequired,
    match: PropTypes.object,
    location: PropTypes.object,
  };

  componentWillMount() {
    const { clusterID, namespaceID, url, loadResourceQuota } = this.props;
    loadResourceQuota({ url, clusterID, namespaceID });
  }

  render() {
    const {
      classes,
      cluster,
      clusterID,
      submitForm,
      updateResourceQuota,
      resourceQuota,
      namespaceID,
    } = this.props;
    const rs = {
      cpu: resourceQuota.getIn(['limits', 'limits.cpu']),
      memory: resourceQuota.getIn(['limits', 'limits.memory']),
      storage: resourceQuota.getIn(['limits', 'requests.cpu']),
    };
    const url = resourceQuota.getIn(['links', 'self']);
    async function doSubmit(formValues) {
      try {
        const { name, cpu, memory, storage } = formValues.toJS();
        const data = {
          name,
          limits: {
            'limits.cpu': cpu,
            'limits.memory': memory,
            'requests.cpu': storage,
          },
        };
        await new Promise((resolve, reject) => {
          updateResourceQuota({ data }, { resolve, reject, clusterID, url });
        });
      } catch (error) {
        throw new SubmissionError({ _error: error });
      }
    }

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
              {
                name: <FormattedMessage {...messages.editNamespace} />,
              },
            ]}
          />
          <Typography component="div" className="">
            <GridContainer className={classes.grid}>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader>
                    <h4 className={classes.cardTitleWhite}>
                      <FormattedMessage {...messages.edit} />
                    </h4>
                  </CardHeader>
                  <CardBody>
                    <CreateNamespaceForm
                      classes={classes}
                      onSubmit={doSubmit}
                      initialValues={rs}
                      namespaceID={namespaceID}
                      type="edit"
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={submitForm}
                    >
                      <FormattedMessage {...messages.createNamespaceButton} />
                    </Button>
                  </CardFooter>
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
  clusterID: makeSelectClusterID(),
  cluster: makeSelectCurrentCluster(),
  url: makeSelectURL(),
  namespaceID: makeSelectNamespaceID(),
  resourceQuota: makeSelectCurrentResourceQuota(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      submitForm: () => submit(formName),
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
)(EditNamespacePage);
