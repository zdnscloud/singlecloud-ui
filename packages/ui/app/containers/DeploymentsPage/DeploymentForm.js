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
          v.get('containerPortName') === port.get('name')
        ));
        const checked = idx !== -1;
        if (checked) {
          const it = value.get(idx);
          if (it.get('containerPortName') !== port.get('name')) {
            onChange(value.setIn([idx, 'containerPortName'], port.get('name')));
          }
        }
        const isUDP = port.get('protocol') === 'udp';

        return (
          <ListItem key={i}>
            <ListItemText>
              <div>
                <ReadOnlyInput
                  labelText={<FormattedMessage {...messages.formPortName} />}
                  value={port.get('name')}
                />
                &nbsp;&nbsp;
                <ReadOnlyInput
                  labelText={<FormattedMessage {...messages.formPortProtocol} />}
                  value={port.get('protocol')}
                />
                &nbsp;&nbsp;
                <ReadOnlyInput
                  labelText={<FormattedMessage {...messages.formPort} />}
                  value={port.get('port')}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                <Checkbox
                  style={{ paddingBottom: 0 }}
                  checked={checked}
                  onChange={(evt) => {
                    if (checked) {
                      onChange(value.delete(idx));
                    } else {
                      onChange(value.push(port.set('containerPortName', port.get('name'))));
                    }
                  }}
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
                <Checkbox
                  style={{ paddingBottom: 0 }}
                  disabled={!checked}
                  checked={value.getIn([idx, 'autoCreateIngress'])}
                  onChange={(evt) => {
                    const ingress = value.getIn([idx, 'autoCreateIngress']);
                    onChange(value.setIn([idx, 'autoCreateIngress'], !ingress));
                  }}
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
                    {value.getIn([idx, 'ingressProtocol']) === 'TCP' ? (
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
                    ) : (
                      <Fragment>
                        <TextField
                          label={<FormattedMessage {...messages.formIngressDomain} />}
                          disabled={!value.getIn([idx, 'autoCreateIngress'])}
                          value={value.getIn([idx, 'ingressHost'])}
                          onChange={(evt) => {
                            onChange(value.setIn([idx, 'ingressHost'], evt.target.value));
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
                  </Fragment>
                )}
              </div>
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
        <ListItemText>
          <Button
            color="secondary"
            onClick={(evt) => fields.push({ protocol: 'tcp' })}
          >
            <FormattedMessage {...messages.formExposedPorts} />
            <PlusIcon />
          </Button>
        </ListItemText>
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
            onClick={(evt) => fields.remove(i)}
          >
            <MinusIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

const renderVolumes = ({
  configMapsOptions,
  containerIndex,
  fields,
  formValues,
  meta: { error, submitFailed },
}) => {

  return (
    <List component="ul">
      <ListItem>
        <ListItemText>
          <Button color="secondary" onClick={(evt) => fields.push({})}>
            <FormattedMessage {...messages.formVolumes} />
            <PlusIcon />
          </Button>
        </ListItemText>
      </ListItem>
      {fields.map((f, i) => {
        let names = [];
        const type = formValues && formValues.getIn([
          'containers',
          containerIndex,
          'volumes',
          i,
          'type',
        ]);
        switch(type) {
          case 'configmap':
            names = configMapsOptions;
            break;
          case 'secret':
            break;
          case 'persistentvolume':
            break;
        }
        return (
          <ListItem key={i}>
            <ListItemText>
              <SelectField
                name={`${f}.type`}
                label={<FormattedMessage {...messages.formVolumeType} />}
                options={[
                  {
                    label: <FormattedMessage {...messages.formVolumeTypeConfigMap} />,
                    value: 'configmap',
                  },
                  {
                    label: <FormattedMessage {...messages.formVolumeTypeSecret} />,
                    value: 'secret',
                  },
                  {
                    label: <FormattedMessage {...messages.formVolumeTypePersistentVolume} />,
                    value: 'persistentVolume',
                  },
                ]}
                formControlProps={{
                  style: {
                    marginTop: 10,
                    width: 146,
                  },
                }}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <SelectField
                name={`${f}.name`}
                label={<FormattedMessage {...messages.formVolumeName} />}
                options={names}
                formControlProps={{
                  style: {
                    marginTop: 10,
                    width: 146,
                  },
                }}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <InputField
                name={`${f}.mountPath`}
                label={<FormattedMessage {...messages.formMountPath} />}
              />
            </ListItemText>
            <IconButton
              variant="contained"
              onClick={(evt) => fields.remove(i)}
            >
              <MinusIcon />
            </IconButton>
          </ListItem>
        );
      })}
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
        <ListItemText>
          <Button color="secondary" onClick={(evt) => fields.push({})}>
            <FormattedMessage {...messages.formENV} />
            <PlusIcon />
          </Button>
        </ListItemText>
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
            onClick={(evt) => fields.remove(i)}
          >
            <MinusIcon />
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
  classes,
  formValues,
}) => {
  const configMapsOptions = configMaps.toList().map((m) => ({
    label: m.get('name'),
    value: m.get('id'),
  })).unshift({
    label: <FormattedMessage {...messages.formNone} />,
    value: '',
  });

  return (
    <Card style={{ padding: 0, marginBottom: 0 }}>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>
          <FormattedMessage {...messages.formContainers} />
        </h4>
      </CardHeader>
      <CardBody>
        <List component="ul">
          <ListItem>
            <ListItemText>
              <Button color="secondary" onClick={(evt) => fields.push({})}>
                <FormattedMessage {...messages.formAddContainer} />
                <PlusIcon />
              </Button>
            </ListItemText>
          </ListItem>
          {submitFailed && error && (
            <ListItem>
              <Danger>{error}</Danger>
            </ListItem>
          )}
          {fields.map((f, i) => (
            <ListItem key={i}>
              <Card key={i}>
                <CardBody>
                  <ListItemText>
                    <GridContainer>
                      <GridItem xs={3} sm={3} md={3}>
                        <InputField
                          name={`${f}.name`}
                          label={<FormattedMessage {...messages.formContainerName} />}
                          fullWidth
                        />
                      </GridItem>
                      <GridItem xs={3} sm={3} md={3}>
                        <InputField
                          name={`${f}.image`}
                          label={<FormattedMessage {...messages.formImage} />}
                          fullWidth
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={3} sm={3} md={3}>
                        <InputField
                          name={`${f}.command`}
                          label={<FormattedMessage {...messages.formCommand} />}
                          fullWidth
                        />
                      </GridItem>
                      <GridItem xs={3} sm={3} md={3}>
                        <InputField
                          name={`${f}.args`}
                          label={<FormattedMessage {...messages.formArgs} />}
                          fullWidth
                        />
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
                      <GridItem xs={8} sm={8} md={8}>
                        <FieldArray
                          name={`${f}.volumes`}
                          component={renderVolumes}
                          containerIndex={i}
                          configMapsOptions={configMapsOptions}
                          formValues={formValues}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={8} sm={8} md={8}>
                        <FieldArray
                          name={`${f}.exposedPorts`}
                          component={renderPorts}
                        />
                      </GridItem>
                    </GridContainer>
                  </ListItemText>
                </CardBody>
              </Card>
              {fields.length > 1 ? (
                <IconButton
                  variant="contained"
                  onClick={(evt) => fields.remove(i)}
                >
                  <MinusIcon />
                </IconButton>
              ) : null}
            </ListItem>
          ))}
        </List>
      </CardBody>
    </Card>
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
              component={renderContainers}
              configMaps={configMaps}
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
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </form>
    );
  }
}

export default DeploymentForm;
