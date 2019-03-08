/**
 *
 * Create DeploymentsPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

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

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectCreateFormData } from './selectors';
import reducer from './reducer';
import * as actions from './actions';
import saga from './saga';
import messages from './messages';
import DeploymentsPageHelmet from './helmet';
import styles from './styles';

/* eslint-disable react/prefer-stateless-function */
export class CreateDeployment extends React.PureComponent {
  static propTypes = {
    initCreateForm: PropTypes.func,
    classes: PropTypes.object.isRequired,
    match: PropTypes.object,
    formData: PropTypes.object.isRequired,
    updateForm: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.initCreateForm(this.props.match);
  }

  render() {
    const { classes, formData, updateForm, createDeployment } = this.props;

    return (
      <div className={classes.root}>
        <DeploymentsPageHelmet />
        <CssBaseline />
        <Menubar headerText={<FormattedMessage {...messages.header} />} />
        <div className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Typography variant="h4" gutterBottom component="h2">
            <FormattedMessage {...messages.deployments} />
          </Typography>
          <Typography component="div" className={classes.chartContainer}>
            <div>
              <TextField
                className={classNames(classes.margin, classes.textField)}
                variant="outlined"
                label="name"
                value={formData.get('name')}
                onChange={evt => updateForm('name', evt.target.value)}
              />
              <TextField
                className={classNames(classes.margin, classes.textField)}
                variant="outlined"
                label="replicas"
                value={formData.get('replicas')}
                onChange={evt =>
                  updateForm('replicas', Number(evt.target.value))
                }
              />
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={evt => createDeployment()}
              >
                Create
              </Button>
              <List component="ul">
                <ListItem>
                  <ListItemText primary="containers" />
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={evt => {
                      const { size } = formData.get('containers');
                      updateForm(['containers', size, 'name'], '');
                    }}
                  >
                    more container
                  </Button>
                </ListItem>
                {formData.get('containers').map((item, idx) => (
                  <ListItem>
                    <TextField
                      className={classNames(classes.margin, classes.textField)}
                      variant="outlined"
                      label="container name"
                      value={item.get('name')}
                      onChange={evt =>
                        updateForm(
                          ['containers', idx, 'name'],
                          evt.target.value,
                        )
                      }
                    />
                    <TextField
                      className={classNames(classes.margin, classes.textField)}
                      variant="outlined"
                      label="container image"
                      value={item.get('image')}
                      onChange={evt =>
                        updateForm(
                          ['containers', idx, 'image'],
                          evt.target.value,
                        )
                      }
                    />
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      onClick={evt => {
                        updateForm(['containers', idx], null);
                      }}
                    >
                      remove this container
                    </Button>
                  </ListItem>
                ))}
              </List>
            </div>
          </Typography>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  formData: makeSelectCreateFormData(),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch,
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'deploymentsPage', reducer });
const withSaga = injectSaga({ key: 'deploymentsPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles),
)(CreateDeployment);
