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

import AdvanceServices from './form/AdvanceServices';
import Containers from './form/Containers';
import VolumeClaimTemplate from './form/VolumeClaimTemplate';
import messages from './messages';

class StatefulSetForm extends PureComponent {
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
    const getPorts = (formData) => {
      if (formData && formData.get) {
        const containers = formData.get('containers');
        if (containers && containers.map) {
          return containers.map((ctn) => {
            const exposedPorts = ctn && ctn.get && ctn.get('exposedPorts');
            if (exposedPorts) {
              return ctn.get('exposedPorts').filter((p) => {
                const port = p && (p.get && p.get('port') || p.port);
                return typeof port === 'number';
              });
            }
            return fromJS([]);
          }).flatten(true);
        }
        return fromJS([]);
      }
      return fromJS([]);
    };
    const ports = getPorts(formValues);

    return (
      <form
        className={getByKey(classes, 'form')}
        onSubmit={handleSubmit}
      >
        <GridContainer>
          {error ? (
            <GridItem xs={12} sm={12} md={12}>
              <Danger>
                {getByKey(error, ['response', 'message'])}
              </Danger>
            </GridItem>
          ) : null}
          <GridItem xs={12} sm={12} md={12}>
            <GridContainer style={{ margin: 0 }}>
              <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                <InputField
                  label={<FormattedMessage {...messages.formName} />}
                  name="name"
                  fullWidth
                  inputProps={{ type: 'text', autoComplete: 'off' }}
                  classes={classes}
                />
                
              </GridItem>
              <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                <InputField
                  label={<FormattedMessage {...messages.formReplicas} />}
                  name="replicas"
                  normalize={(val) => Number(val)}
                  fullWidth
                  inputProps={{
                    type: 'number',
                    autoComplete: 'off',
                    min: 1,
                    max: 255,
                  }}
                  classes={classes}
                />
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <FieldArray
              name="containers"
              classes={classes}
              component={Containers}
              configMaps={configMaps}
              secrets={secrets}
              theme={theme}
              formValues={formValues}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <Card style={{ marginTop: 0, marginBottom: 0 }}>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>
                  <FormattedMessage {...messages.formServiceConfig} />
                </h4>
              </CardHeader>
              <CardBody>
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
                        <GridItem xs={12} sm={12} md={12} className={classes.formLine}>
                          <SwitchField
                            name="reloadWhenConfigChange"
                            label={<FormattedMessage {...messages.formReloadWhenConfigChange} />}
                          />
                        </GridItem>
                      </GridContainer>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12} className={classes.formLine}>
                          <RadioField
                            name="exposedServiceType"
                            label={<FormattedMessage {...messages.formExposedServiceType} />}
                            classes={{
                              formControl: classes.radioControl,
                              formLabel: classes.radioLabel,
                              group: classes.radioGroup,
                            }}
                            options={[
                              { label: 'Cluster IP', value: 'clusterip' },
                              { label: 'Node Port', value: 'nodeport' },
                            ]}
                            formControlComponent={'div'}
                            formLabelComponent={'div'}
                          />
                        </GridItem>
                      </GridContainer>
                      <Field
                        name="exposedServices"
                        label="Exposed Services"
                        ports={fromJS(ports.toJS())}
                        component={AdvanceServices}
                      />
                      <GridContainer>
                        <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                          <InputField
                            label={<FormattedMessage {...messages.formExposedMetricPath} />}
                            fullWidth
                            inputProps={{ type: 'text', autoComplete: 'off' }}
                            classes={classes}
                            name="exposedMetric.path"
                          />
                        </GridItem>
                        <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                          <InputField
                            label={<FormattedMessage {...messages.formExposedMeticPort} />}
                            normalize={(val) => Number(val)}
                            fullWidth
                            inputProps={{
                              type: 'number',
                              autoComplete: 'off',
                              min: 1,
                              max: 65535,
                            }}
                            classes={classes}
                            name="exposedMetric.port"
                          />
                        </GridItem>
                      </GridContainer>
                    </FormSection>
                  </Fragment>
                ) : null}
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <Card style={{ marginTop: 20, marginBottom: 0 }}>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>
                  <FormattedMessage {...messages.formVolumeClaimTemplate} />
                </h4>
              </CardHeader>
              <CardBody>
                <FieldArray
                  name="persistentVolumes"
                  classes={classes}
                  component={VolumeClaimTemplate}
                  theme={theme}
                  formValues={formValues}
                  storageClasses={storageClasses}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </form>
    );
  }
}

export default StatefulSetForm;
