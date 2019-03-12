/**
 *
 * Create ConfigMapsPage
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
import Dialog from '@material-ui/core/Dialog';
import AttachmentIcon from '@material-ui/icons/Attachment';
import AceEditor from 'react-ace';
import 'brace/mode/yaml';
import 'brace/theme/github';

import injectSaga from 'utils/injectSaga';
import { makeSelectCreateFormData } from './selectors';
import reducer from './reducer';
import * as actions from './actions';
import saga from './saga';
import messages from './messages';
import ConfigMapsPageHelmet from './helmet';
import styles from './styles';

/* eslint-disable react/prefer-stateless-function */
export class CreateConfigMap extends React.PureComponent {
  static propTypes = {
    initCreateForm: PropTypes.func,
    classes: PropTypes.object.isRequired,
    match: PropTypes.object,
    formData: PropTypes.object.isRequired,
    updateForm: PropTypes.func.isRequired,
  };

  state = { isOpen: false, currentID: null };

  componentWillMount() {
    this.props.initCreateForm(this.props.match);
  }

  render() {
    const { classes, formData, updateForm, createConfigMap } = this.props;

    return (
      <div className={classes.root}>
        <ConfigMapsPageHelmet />
        <CssBaseline />
        <Menubar headerText={<FormattedMessage {...messages.header} />} />
        <div className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Typography variant="h4" gutterBottom component="h2">
            <FormattedMessage {...messages.configMaps} />
          </Typography>
          <Dialog
            open={this.state.isOpen}
            onClose={() => {
              this.setState({ isOpen: false });
            }}
            aria-labelledby="form-dialog-title"
          >
            <AceEditor
              focus
              mode="yaml"
              theme="github"
              value={formData.getIn(['configs', this.state.currentID, 'data'])}
              onChange={(val, evt) => {
                updateForm(['configs', this.state.currentID, 'data'], val);
              }}
            />
          </Dialog>
          <Typography component="div" className={classes.chartContainer}>
            <div>
              <TextField
                className={classNames(classes.margin, classes.textField)}
                variant="outlined"
                label="name"
                value={formData.get('name')}
                onChange={evt => updateForm('name', evt.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={evt => createConfigMap()}
              >
                Create
              </Button>
              <List component="ul">
                <ListItem>
                  <ListItemText primary="Config Map" />
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={evt => {
                      const { size } = formData.get('configs');
                      updateForm(['configs', size, 'name'], '');
                    }}
                  >
                    more config
                  </Button>
                </ListItem>
                {formData.get('configs').map((item, idx) => (
                  <ListItem key={idx}>
                    <TextField
                      className={classNames(classes.margin, classes.textField)}
                      variant="outlined"
                      label="config name"
                      value={item.get('name')}
                      onChange={evt =>
                        updateForm(['configs', idx, 'name'], evt.target.value)
                      }
                    />
                    <Button
                      variant="contained"
                      size="small"
                      className={classes.button}
                      onClick={evt => {
                        this.setState({ isOpen: true, currentID: idx });
                      }}
                    >
                      <AttachmentIcon
                        className={classNames(
                          classes.leftIcon,
                          classes.iconSmall,
                        )}
                      />
                      Setup Config file
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      onClick={evt => {
                        updateForm(['configs', idx], null);
                      }}
                    >
                      remove this config
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

const withSaga = injectSaga({ key: 'configMapsPage', saga });

export default compose(
  withSaga,
  withConnect,
  withStyles(styles),
)(CreateConfigMap);
