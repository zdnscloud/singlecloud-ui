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
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import { openTerminal } from 'containers/TerminalPage/actions';

import { makeSelectNodesList, makeSelectCurrentCluster } from 'ducks/clusters/selectors';
import {
  makeSelectClusterID,
} from 'ducks/app/selectors';
import * as actions from 'ducks/clusters/actions';

import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import messages from './messages';
import styles from './styles';
import ClustersPageHelmet from './helmet';
import ClusterManageForm from './ClusterManageForm';

export const formName = 'createClusterForm';

const validate = (values) => {
  const errors = {};
  return errors;
};

const CreateClusterForm = reduxForm({
  form: formName,
  validate,
})(ClusterManageForm);

/* eslint-disable react/prefer-stateless-function */
export class ClusterManagePage extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  componentWillMount() {
    const { setNodes, cluster } = this.props;
    setNodes(cluster.get("nodes"));
  }

  render() {
    const { classes, submitForm, updateCluster, values, clusterID, cluster,nodeList} = this.props;
    const url = cluster.getIn(['links','update']);
    async function doSubmit(formValues) {
      try {
        const {
          nodes,
          ...formData
        } = formValues.toJS();
        const data = {
          nodes: nodeList.toJS(),
          ...formData,
        };
        await new Promise((resolve, reject) => {
          updateCluster(data, {
            resolve,
            reject,
            url,
            clusterID
          });
        });
      } catch (error) {
        throw new SubmissionError({ _error: error });
      }
    }

    return (
      <div className={classes.root}>
        <ClustersPageHelmet />
        <CssBaseline />
        <div className={classes.content}>
          <Breadcrumbs
            data={[
              {
                name: <FormattedMessage {...messages.clusterManage} />,
              },
            ]}
          />
          <GridContainer className={classes.grid}>
            <GridItem xs={12} sm={12} md={12}>
              <CreateClusterForm
                classes={classes}
                onSubmit={doSubmit}
                initialValues={cluster}
                formValues={values}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={submitForm}
              >
                <FormattedMessage {...messages.createClusterButton} />
              </Button>
              <Button
                variant="contained"
                className={classes.cancleBtn}
                component={Link}
                to="/clusters"
              >
                <FormattedMessage {...messages.cancleClustersButton} />
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  values: getFormValues(formName),
  cluster: makeSelectCurrentCluster(),
  clusterID: makeSelectClusterID(),
  nodeList: makeSelectNodesList(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
      openTerminal,
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
)(ClusterManagePage);