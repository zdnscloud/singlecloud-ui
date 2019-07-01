import React, { PureComponent, Fragment, useState } from 'react';
import { fromJS, is } from 'immutable';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import {
  Field,
  Fields,
  FieldArray,
  reduxForm,
  FormSection,
} from 'redux-form/immutable';
import getByKey from '@gsmlg/utils/getByKey';
import AceEditor from 'react-ace';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import CardFooter from 'components/Card/CardFooter';
import CustomInput from 'components/CustomInput/CustomInput';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput';
import Danger from 'components/Typography/Danger';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputField from 'components/Field/InputField';
import SelectField from 'components/Field/SelectField';
import SwitchField from 'components/Field/SwitchField';
import RadioField from 'components/Field/RadioField';
import PlusIcon from 'components/Icons/Plus';
import MinusIcon from 'components/Icons/Minus';

// import AdvanceServices from './form/AdvanceServices';
// import Containers from './form/Containers';
import NodeTemplate from './form/NodeTemplate';
import messages from './messages';

class ClustersForm extends PureComponent {
  state = {};

  render() {
    const {
      clusters,
      handleSubmit,
      pristine,
      reset,
      submitting,
      error,
      classes,
      edit,
      initialValues,
      configMaps,
      secrets,
      storageClasses,
      formValues,
      theme,
    } = this.props;
    return (
      <form
        className={getByKey(classes, 'form')}
        onSubmit={handleSubmit}
      >
      
        <GridContainer className={classes.grid}>
          {error ? (
            <GridItem xs={12} sm={12} md={12}>
              <Danger>
                {getByKey(error, ['response', 'message'])}
              </Danger>
            </GridItem>
          ) : null}
           <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>
                  <FormattedMessage {...messages.formCreate} />
                </h4>
              </CardHeader>
              <CardBody>
              <GridItem xs={12} sm={12} md={12}>
                <GridContainer>
                  <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                    <InputField
                      label={<FormattedMessage {...messages.formClusterName} />}
                      name="name"
                      fullWidth
                      inputProps={{ type: 'text', autoComplete: 'off' }}
                      classes={classes}
                    />
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                    <InputField
                      label={<FormattedMessage {...messages.formClusterSuffix} />}
                      name="option"
                      fullWidth
                      inputProps={{ type: 'text', autoComplete: 'off' }}
                      classes={classes}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                      <SwitchField
                        name="enableAdvancedOptions"
                        label={<FormattedMessage {...messages.formAdvancedOptions} />}
                      />
                    </GridItem>
                  </GridContainer>
                  {formValues && formValues.get('enableAdvancedOptions') ? (
                      <Fragment>
                          <FormSection name="advancedOptions">
                              <GridContainer>
                                <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                                  <InputField
                                    label={<FormattedMessage {...messages.formSSHPort} />}
                                    normalize={(val) => Number(val)}
                                    fullWidth
                                    inputProps={{
                                      type: 'number',
                                      autoComplete: 'off',
                                      min: 1,
                                      max: 65535,
                                    }}
                                    classes={classes}
                                    name="option.sshKey"
                                  />
                                </GridItem>
                                <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                                  <InputField
                                    label={<FormattedMessage {...messages.formSSHUser} />}
                                    fullWidth
                                    inputProps={{ type: 'text', autoComplete: 'off' }}
                                    classes={classes}
                                    name="option.sshUser"
                                  />
                                </GridItem>
                              </GridContainer>
                              <GridContainer>
                                <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                                  <InputField
                                    label={<FormattedMessage {...messages.formServiceIP} />}
                                    fullWidth
                                    inputProps={{ type: 'text', autoComplete: 'off' }}
                                    classes={classes}
                                    name="option.serviceCidr"
                                  />
                                </GridItem>
                                <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                                  <InputField
                                    label={<FormattedMessage {...messages.formPodIP} />}
                                    fullWidth
                                    inputProps={{ type: 'text', autoComplete: 'off' }}
                                    classes={classes}
                                    name="option.clusterCidr"
                                  />
                                </GridItem>
                              </GridContainer>
                              <GridContainer>
                                <GridItem xs={12} sm={12} md={12} className={classes.formLine}>
                                  <RadioField
                                    name="network.plugin"
                                    label={<FormattedMessage {...messages.formClustersNet} />}
                                    classes={{
                                      formControl: classes.radioControl,
                                      formLabel: classes.radioLabel,
                                      group: classes.radioGroup,
                                    }}
                                    options={[
                                      { label: 'flannel', value: 'flannel' },
                                      { label: 'calico', value: 'calico' },
                                    ]}
                                    formControlComponent={'div'}
                                    formLabelComponent={'div'}
                                  />
                                </GridItem>
                              </GridContainer>
                              <GridContainer>
                                <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                                  <InputField
                                    label={<FormattedMessage {...messages.formClustersDNSIP} />}
                                    fullWidth
                                    inputProps={{ type: 'text', autoComplete: 'off' }}
                                    classes={classes}
                                    name="option.clusterDNSServiceIP"
                                  />
                                </GridItem>
                                <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                                  <InputField
                                    label={<FormattedMessage {...messages.formForwardDNS} />}
                                    fullWidth
                                    inputProps={{ type: 'text', autoComplete: 'off' }}
                                    classes={classes}
                                    name="option.clusterUpstreamDNS"
                                  />
                                </GridItem>
                              </GridContainer>
                              <GridContainer>
                                <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                                  <label><FormattedMessage {...messages.formPrivateWarehouses} /></label>
                                </GridItem>
                                </GridContainer>
                                <GridContainer>
                                <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                                  <InputField
                                    label={<FormattedMessage {...messages.formUrl} />}
                                    fullWidth
                                    inputProps={{ type: 'text', autoComplete: 'off' }}
                                    classes={classes}
                                    name="privateRegistry.url"
                                  />
                                </GridItem>
                                <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                                  <InputField
                                    label={<FormattedMessage {...messages.formCACertificate} />}
                                    fullWidth
                                    inputProps={{ type: 'text', autoComplete: 'off' }}
                                    classes={classes}
                                    name="privateRegistry.cacert"
                                  />
                                </GridItem>
                              </GridContainer>
                              <GridContainer>
                                <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                                  <InputField
                                    label={<FormattedMessage {...messages.formUser} />}
                                    fullWidth
                                    inputProps={{ type: 'text', autoComplete: 'off' }}
                                    classes={classes}
                                    name="privateRegistry.user"
                                  />
                                </GridItem>
                                <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                                  <InputField
                                    label={<FormattedMessage {...messages.formPwd} />}
                                    fullWidth
                                    inputProps={{ type: 'text', autoComplete: 'off' }}
                                    classes={classes}
                                    name="privateRegistry.password"
                                  />
                                </GridItem>
                              </GridContainer>
                              <GridContainer>
                                <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                                  <InputField
                                    label={<FormattedMessage {...messages.formSinglecloudUrl} />}
                                    fullWidth
                                    inputProps={{ type: 'text', autoComplete: 'off' }}
                                    classes={classes}
                                    name="singlecloudUrl"
                                  />
                                </GridItem>
                              </GridContainer>
                            </FormSection>
                      </Fragment>
                    ) : null}
              </GridItem>
            </CardBody>
          </Card>
          <Card style={{ margin: 0,marginTop: 20}}>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                <FormattedMessage {...messages.formNode} />
              </h4>
            </CardHeader>
            <CardBody>
              <FieldArray
                name="nodes"
                classes={classes}
                component={NodeTemplate}
                theme={theme}
                formValues={formValues}
                storageClasses={storageClasses}
              />
            </CardBody>
          </Card>
        </GridContainer>
      </form>
    );
  }
}

export default ClustersForm;
