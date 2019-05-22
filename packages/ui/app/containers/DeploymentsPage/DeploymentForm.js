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
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import Button from 'components/CustomButtons/Button';
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

import messages from './messages';

const renderAdvanceServices = ({
  input,
  ports,
  meta: { error, submitFailed },
}) => {
  const { onChange } = input;
  let { value } = input;
  if (!value) value = fromJS([]);

  return (
    <List component="ul">
      {ports.map((port, i) => {
        const idx = value.findIndex((v) => (
          v.get('port') === port.get('port') && v.get('protocol') === port.get('protocol')
        ));
        const checked = idx !== -1;
        if (checked) {
          const it = value.get(idx);
          if (it.get('name') !== port.get('name')) {
            onChange(value.setIn([idx, 'name'], port.get('name')));
          }
        }
        const isUDP = port.get('protocol') === 'udp';

        return (
          <ListItem key={i}>
            <ListItemText>
              {port.get('name') ? (
                <Fragment>
                  <ReadOnlyInput
                    labelText={<FormattedMessage {...messages.formPortName} />}
                    value={port.get('name')}
                  />
                  &nbsp;&nbsp;
                </Fragment>
              ) : null}
              <ReadOnlyInput
                labelText={<FormattedMessage {...messages.formPortProtocol} />}
                value={port.get('protocol')}
              />
              &nbsp;&nbsp;
              <ReadOnlyInput
                labelText={<FormattedMessage {...messages.formPort} />}
                value={port.get('port')}
              />
              <br />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={(evt) => {
                      if (checked) {
                        onChange(value.delete(idx));
                      } else {
                        onChange(value.push(port));
                      }
                    }}
                  />
                }
                label={<FormattedMessage {...messages.formAutoCreateService} />}
              />
              &nbsp;&nbsp;
              <TextField
                type="number"
                label={<FormattedMessage {...messages.formServicePort} />}
                disabled={!checked}
                value={value.getIn([idx, 'servicePort'])}
                onChange={(evt) => {
                  const val = Number(evt.target.value);
                  onChange(value.setIn([idx, 'servicePort'], val));
                }}
              />
              &nbsp;&nbsp;
              <FormControlLabel
                control={
                  <Checkbox
                    disabled={!checked}
                    checked={value.getIn([idx, 'autoCreateIngress'])}
                    onChange={(evt) => {
                      const ingress = value.getIn([idx, 'autoCreateIngress']);
                      onChange(value.setIn([idx, 'autoCreateIngress'], !ingress));
                    }}
                  />
                }
                label={<FormattedMessage {...messages.formAutoCreateIngress} />}
              />
              &nbsp;&nbsp;
              {isUDP ? (
                <Fragment>
                  <SelectField
                    disabled={!value.getIn([idx, 'autoCreateIngress'])}
                    value={value.getIn([idx, 'ingressProtocol'])}
                    onChange={(evt) => {
                      const dn = value.getIn([idx, 'ingressProtocol']);
                      const protocol = evt.target.value;
                      onChange(value.setIn([idx, 'ingressProtocol'], protocol));
                    }}
                    label={<FormattedMessage {...messages.formPortProtocol} />}
                    options={[{ label: 'UDP', value: 'UDP' }]}
                    formControlProps={{
                      style: {
                        width: '146px',
                      },
                    }}
                  />
                  &nbsp;&nbsp;
                  <TextField
                    label={<FormattedMessage {...messages.formIngressPort} />}
                    disabled={!value.getIn([idx, 'autoCreateIngress'])}
                    value={value.getIn([idx, 'ingressPort'])}
                    onChange={(evt) => {
                      const dn = value.getIn([idx, 'ingressPort']);
                      const portVal = Number(evt.target.value);
                      onChange(value.setIn([idx, 'ingressPort'], portVal));
                    }}
                    inputProps={{
                      type: 'number',
                    }}
                  />
                </Fragment>
              ) : (
                <Fragment>
                  <SelectField
                    disabled={!value.getIn([idx, 'autoCreateIngress'])}
                    value={value.getIn([idx, 'ingressProtocol'])}
                    onChange={(evt) => {
                      const dn = value.getIn([idx, 'ingressProtocol']);
                      const protocol = evt.target.value;
                      onChange(value.setIn([idx, 'ingressProtocol'], protocol));
                    }}
                    label={<FormattedMessage {...messages.formPortProtocol} />}
                    options={[
                      { label: 'TCP', value: 'TCP' },
                      { label: 'HTTP', value: 'HTTP' },
                    ]}
                    formControlProps={{
                      style: {
                        width: '146px',
                      },
                    }}
                  />
                  &nbsp;&nbsp;
                  <TextField
                    label={<FormattedMessage {...messages.formIngressDomain} />}
                    disabled={!value.getIn([idx, 'autoCreateIngress'])}
                    value={value.getIn([idx, 'ingressDomainName'])}
                    onChange={(evt) => {
                      const dn = value.getIn([idx, 'ingressDomainName']);
                      onChange(value.setIn([idx, 'ingressDomainName'], evt.target.value));
                    }}
                  />
                  &nbsp;&nbsp;
                  <TextField
                    label={<FormattedMessage {...messages.formIngressPath} />}
                    disabled={!value.getIn([idx, 'autoCreateIngress'])}
                    value={value.getIn([idx, 'ingressPath'])}
                    onChange={(evt) => {
                      onChange(value.setIn([idx, 'ingressPath'], evt.target.value));
                    }}
                  />
                </Fragment>
              )}
            </ListItemText>
          </ListItem>
        );
      })}
    </List>
  );
};

const renderPorts = ({
  fields,
  meta: { error, submitFailed },
}) => {
  const options = [
    { label: 'TCP', value: 'tcp' },
    { label: 'UDP', value: 'udp' },
  ];

  return (
    <List component="ul">
      <ListItem>
        <ListItemText primary={<FormattedMessage {...messages.formExposedPorts} />} />
        <IconButton onClick={(evt) => fields.push({ protocol: 'tcp' })}>
          <AddIcon />
        </IconButton>
      </ListItem>
      {fields.map((f, i) => (
        <ListItem key={i}>
          <ListItemText>
            <InputField
              label={<FormattedMessage {...messages.formPortName} />}
              name={`${f}.name`}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <SelectField
              name={`${f}.protocol`}
              label={<FormattedMessage {...messages.formPortProtocol} />}
              options={options}
              formControlProps={{
                style: {
                  marginTop: '10px',
                  width: '146px',
                },
              }}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <InputField
              name={`${f}.port`}
              label={<FormattedMessage {...messages.formPort} />}
              normalize={(val) => Number(val)}
              inputProps={{
                type: 'number',
              }}
            />
          </ListItemText>
          <IconButton
            variant="contained"
            color="secondary"
            onClick={(evt) => fields.remove(i)}
          >
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

const renderEnvs = ({
  fields,
  meta: { error, submitFailed },
}) => {

  return (
    <List component="ul">
      <ListItem>
        <ListItemText primary={<FormattedMessage {...messages.formENV} />} />
        <IconButton onClick={(evt) => fields.push({})}>
          <AddIcon />
        </IconButton>
      </ListItem>
      {fields.map((f, i) => (
        <ListItem key={i}>
          <ListItemText>
            <InputField
              name={`${f}.name`}
              label={<FormattedMessage {...messages.formENVName} />}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <InputField
              name={`${f}.value`}
              label={<FormattedMessage {...messages.formENVValue} />}
            />
          </ListItemText>
          <IconButton
            variant="contained"
            color="secondary"
            onClick={(evt) => fields.remove(i)}
          >
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

const renderContainers = ({
  fields,
  meta: { error, submitFailed },
  configMaps,
}) => {
  const options = configMaps.toList().map((m) => ({
    label: m.get('name'),
    value: m.get('id'),
  })).unshift({
    label: <FormattedMessage {...messages.formNone} />,
    value: '',
  });

  return (
    <List component="ul">
      <ListItem>
        <ListItemText primary={<FormattedMessage {...messages.formContainers} />} />
        <IconButton onClick={(evt) => fields.push({})}>
          <AddIcon />
        </IconButton>
      </ListItem>
      {submitFailed && error && (
        <ListItem>
          <Danger>{error}</Danger>
        </ListItem>
      )}
      {fields.map((f, i) => (
        <Card key={i}>
          <CardBody>
            <ListItem key={i}>
              <ListItemText>
                <GridContainer>
                  <GridItem xs={3} sm={3} md={3}>
                    <InputField name={`${f}.name`} label={<FormattedMessage {...messages.formContainerName} />} fullWidth />
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3}>
                    <InputField name={`${f}.image`} label={<FormattedMessage {...messages.formImage} />} fullWidth />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={3} sm={3} md={3}>
                    <InputField name={`${f}.command`} label={<FormattedMessage {...messages.formCommand} />} fullWidth />
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3}>
                    <InputField name={`${f}.args`} label={<FormattedMessage {...messages.formArgs} />} fullWidth />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={6} sm={6} md={6}>
                    <FieldArray
                      name={`${f}.env`}
                      component={renderEnvs}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={3} sm={3} md={3}>
                    <SelectField
                      name={`${f}.configName`}
                      label={<FormattedMessage {...messages.formConfigName} />}
                      options={options}
                      formControlProps={{
                        style: {
                          marginTop: '10px',
                          width: '100%',
                        },
                      }}
                    />
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3}>
                    <InputField
                      name={`${f}.mountPath`}
                      label={<FormattedMessage {...messages.formMountPath} />}
                      fullWidth
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem>
                    <FieldArray
                      name={`${f}.exposedPorts`}
                      component={renderPorts}
                    />
                  </GridItem>
                </GridContainer>
              </ListItemText>
              <IconButton
                variant="contained"
                color="secondary"
                onClick={(evt) => fields.remove(i)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          </CardBody>
        </Card>
      ))}
    </List>
  );
};

class DeploymentForm extends PureComponent {
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
      formValues,
    } = this.props;
    const getPorts = (formData) => {
      if (formData && formData.get) {
        const containers = formData.get('containers');
        if (containers && containers.map) {
          return containers.map((ctn) => {
            if (ctn && ctn.get && ctn.get('exposedPorts')) {
              return ctn.get('exposedPorts')
                .filter((p) => typeof p.get('port') === 'number');
            }
            if (ctn && ctn.exposedPorts && ctn.exposedPorts.filter) {
              return ctn.exposedPorts
                .filter((p) => typeof p.port === 'number');
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
      <form className={getByKey(classes, 'form')} onSubmit={handleSubmit}>
        <GridContainer>
          {error ? (
            <GridItem xs={12} sm={12} md={12}>
              <Danger>
                {getByKey(error, ['response', 'message'])}
              </Danger>
            </GridItem>
          ) : null}
          <GridItem xs={12} sm={12} md={12}>
            <GridContainer>
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
              component={renderContainers}
              configMaps={configMaps}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <SwitchField
              name="enableAdvancedOptions"
              label={<FormattedMessage {...messages.formAdvancedOptions} />}
            />
            {formValues && formValues.get('enableAdvancedOptions') ? (
              <Fragment>
                <br />
                <br />
                <FormSection name="advancedOptions">
                  <RadioField
                    name="exposedServiceType"
                    label={<FormattedMessage {...messages.formExposedServiceType} />}
                    options={[
                      { label: 'Cluster IP', value: 'clusterip' },
                      { label: 'Node Port', value: 'nodeport' },
                    ]}
                  />
                  <Field
                    name="exposedServices"
                    label="Exposed Services"
                    ports={fromJS(ports.toJS())}
                    component={renderAdvanceServices}
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
          </GridItem>
        </GridContainer>
      </form>
    );
  }
}

export default DeploymentForm;
