/**
 *
 * ShowConfigMapPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector, createSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { fromJS } from 'immutable';
import { reduxForm, getFormValues } from 'redux-form/immutable';
import { SubmissionError, submit } from 'redux-form';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Menubar from 'components/Menubar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AttachmentIcon from '@material-ui/icons/Attachment';
import AceEditor from 'react-ace';
import 'brace/mode/yaml';
import 'brace/theme/github';

import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import CardFooter from 'components/Card/CardFooter';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput';

import {
  makeSelectClusterID,
  makeSelectNamespaceID,
} from 'containers/App/selectors';
import * as actions from 'ducks/configMaps/actions';
import {
  makeSelectCurrentConfigMap,
  makeSelectURL,
} from 'ducks/configMaps/selectors';

import messages from './messages';
import ConfigMapsPageHelmet from './helmet';
import styles from './styles';

/* eslint-disable react/prefer-stateless-function */
export class ShowConfigMap extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  render() {
    const {
      classes,
      clusterID,
      namespaceID,
      configMap,
    } = this.props;

    return (
      <div className={classes.root}>
        <ConfigMapsPageHelmet />
        <CssBaseline />
        <div className={classes.content}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                <FormattedMessage {...messages.showConfigMap} />
              </h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12} className={classes.formLine}>
                  <ReadOnlyInput
                    labelText={<FormattedMessage {...messages.formName} />}
                    value={configMap.get('name')}
                    formControlProps={{
                      className: classes.nameControl,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <GridContainer>
                    {configMap.get('configs').map((cfg) => (
                      <GridItem xs={3} sm={3} md={3}>
                        <ReadOnlyInput
                          labelText={<FormattedMessage {...messages.formFileName} />}
                          value={cfg.get('name')}
                          fullWidth
                          formControlProps={{
                            className: classes.nameControl,
                          }}
                        />
                      </GridItem>
                    ))}
                  </GridContainer>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectClusterID(),
  namespaceID: makeSelectNamespaceID(),
  configMap: makeSelectCurrentConfigMap(),
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
)(ShowConfigMap);
