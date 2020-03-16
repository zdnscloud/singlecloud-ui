import React, { PureComponent, Fragment, useState,useEffect } from 'react';
import { fromJS } from 'immutable';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import {
  Field,
  Fields,
  FieldArray,
  FormSection,
  reduxForm,
} from 'redux-form/immutable';
import getByKey from '@gsmlg/utils/getByKey';

import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import Danger from 'components/Typography/Danger';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputField from 'components/Field/InputField';
import SelectField from 'components/Field/SelectField';
import SwitchField from 'components/Field/SwitchField';
import RadioField from 'components/Field/RadioField';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput';
import ConfirmDialog from 'components/Confirm/ConfirmDialog';

import useStyles from './styles';
import messages from './messages';

export const formName = 'createServiceForm';

const ExposedPortsComponent = ({ meta: { touched, error, invalid } }) => (
  <>
    <FormattedMessage {...messages.formExposedPorts} />
    {touched && typeof error === 'string' && <Danger>{error}</Danger>}
  </>
);

const ExposedPortsField = (props) => {
  const { component, ...rest } = props;

  return <Field {...rest} component={ExposedPortsComponent} />;
};

const validate = (values) => {
  const errors = {};
  const requiredFields = ['name'];
  requiredFields.forEach((field) => {
    if (!values.get(field)) {
      errors[field] = 'Required';
    }
  });
  const exposedPorts = values.get('exposedPorts') || [];
  const enabled = exposedPorts.reduce(
    (enable, p) => enable || p.get('enable'),
    false
  );
  exposedPorts.forEach((port, i) => {
    if (!enabled) {
      errors.exposedPorts = errors.exposedPorts || [];
      errors.exposedPorts[i] = {
        ...(errors.exposedPorts[i] || {}),
        enable: 'Required',
      };
    }
    if (!port.get('port')) {
      errors.exposedPorts = errors.exposedPorts || [];
      errors.exposedPorts[i] = {
        ...(errors.exposedPorts[i] || {}),
        port: 'Required',
      };
    }
  });
  if (exposedPorts.size === 0) {
    errors.exposedPorts = 'Required';
  }

  return errors;
};

const Form = ({
  changeFormValue,
  formValues,
  handleSubmit,
  error,
  deployments,
  daemonSets,
  statefulSets,
  target,
}) => {
  const classes = useStyles();
  const targetResourceType = formValues.get('targetResourceType');
  const targetNameOptions = {
    deployments,
    daemonSets,
    statefulSets,
  }[targetResourceType];
  const exposedPorts = formValues.get('exposedPorts');
  const serviceType = formValues.get('serviceType');
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, [error]);
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <GridContainer>
        {error ? <ConfirmDialog
          open={open}
          onClose={() => {
            setOpen(false)
          }}
          content={<p className={classes.saveFaildText}>{getByKey(error, ['response', 'message'])}</p>}
          hideActions
          type="save"
          showCloseIcon
        />: null}
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader>
              <h4>
                <FormattedMessage {...messages.createService} />
              </h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={3} sm={3} md={3}>
                  <SelectField
                    label={
                      <FormattedMessage {...messages.formTargetResourceType} />
                    }
                    name="targetResourceType"
                    options={['deployments', 'statefulSets', 'daemonSets']}
                    onChange={(evt) => {
                      changeFormValue('targetName', '');
                      changeFormValue('name', '');
                      changeFormValue('exposedPorts', fromJS([]));
                    }}
                    fullWidth
                  />
                </GridItem>
                <GridItem xs={3} sm={3} md={3}>
                  <SelectField
                    label={<FormattedMessage {...messages.formTargetName} />}
                    name="targetName"
                    options={targetNameOptions.map((t) => t.get('name')).toJS()}
                    onChange={(evt) => {
                      const name = evt.target.value;
                      changeFormValue('name', name);
                      const workload = targetNameOptions.find(
                        (t) => t.get('name') === name
                      );
                      const ports = workload
                        .get('containers')
                        .reduce(
                          (meno, c) =>
                            meno.concat(c.get('exposedPorts') || fromJS([])),
                          fromJS([])
                        )
                        .map((exposedPort) =>
                          exposedPort.set('targetPort', exposedPort.get('port'))
                        );
                      changeFormValue('exposedPorts', ports);
                    }}
                    fullWidth
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={3} sm={3} md={3}>
                  <InputField
                    label={<FormattedMessage {...messages.formName} />}
                    name="name"
                    fullWidth
                    inputProps={{
                      type: 'text',
                      autoComplete: 'off',
                      readOnly: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12} className={classes.formLine}>
                  <RadioField
                    name="serviceType"
                    label={<FormattedMessage {...messages.formServiceType} />}
                    classes={{
                      formControl: classes.radioControl,
                      formLabel: classes.radioLabel,
                      group: classes.radioGroup,
                    }}
                    options={[
                      { label: 'Cluster IP', value: 'clusterip' },
                      { label: 'Node Port', value: 'nodeport' },
                      { label: 'loadbalance', value: 'loadbalancer' },
                    ]}
                    formControlComponent="div"
                    formLabelComponent="div"
                  />
                </GridItem>
              </GridContainer>
              {serviceType && serviceType === 'loadbalancer' ? (
                <Fragment>
                  <GridContainer>
                    <GridItem xs={3} sm={3} md={3}>
                      <InputField
                        label={<FormattedMessage {...messages.formVip} />}
                        name="loadBalanceVip"
                        fullWidth
                        inputProps={{
                          type: 'text',
                          autoComplete: 'off',
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem
                      xs={12}
                      sm={12}
                      md={12}
                      className={classes.formLine}
                    >
                      <RadioField
                        name="loadBalanceMethod"
                        label={
                          <FormattedMessage
                            {...messages.formLoadBalanceMethod}
                          />
                        }
                        classes={{
                          formControl: classes.radioControl,
                          formLabel: classes.radioLabel,
                          group: classes.radioGroup,
                        }}
                        options={[
                          {
                            label: <FormattedMessage {...messages.formHash} />,
                            value: 'hash',
                          },
                          {
                            label: (
                              <FormattedMessage {...messages.formPolling} />
                            ),
                            value: 'rr',
                          },
                          {
                            label: (
                              <FormattedMessage {...messages.formMinNum} />
                            ),
                            value: 'lc',
                          },
                        ]}
                        formControlComponent="div"
                        formLabelComponent="div"
                      />
                    </GridItem>
                  </GridContainer>
                </Fragment>
              ) : null}
              <GridContainer>
                <GridItem xs={12} sm={12} md={12} className={classes.formLine}>
                  <ExposedPortsField name="exposedPorts" />
                </GridItem>
              </GridContainer>
              {exposedPorts.map((exposedPort, i) => (
                <GridContainer key={i}>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={12}
                    className={classes.formLine}
                  >
                    <SwitchField
                      name={`exposedPorts.${i}.enable`}
                      label={
                        <FormattedMessage {...messages.formExposedPortEnable} />
                      }
                    />
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                    <ReadOnlyInput
                      labelText={
                        <FormattedMessage {...messages.formExposedPortName} />
                      }
                      fullWidth
                      value={exposedPort.get('name')}
                    />
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                    <ReadOnlyInput
                      labelText={
                        <FormattedMessage {...messages.formExposedPortTarget} />
                      }
                      fullWidth
                      value={exposedPort.get('targetPort')}
                    />
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                    <ReadOnlyInput
                      labelText={
                        <FormattedMessage
                          {...messages.formExposedPortProtocol}
                        />
                      }
                      fullWidth
                      value={exposedPort.get('protocol')}
                    />
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3}>
                    <InputField
                      label={<FormattedMessage {...messages.formExposedPort} />}
                      name={`exposedPorts.${i}.port`}
                      normalize={(val) => (val ? Number(val) : val)}
                      fullWidth
                      inputProps={{ type: 'number' }}
                    />
                  </GridItem>
                </GridContainer>
              ))}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </form>
  );
};

const CreateServiceForm = reduxForm({
  form: formName,
  validate,
})(Form);

export default CreateServiceForm;
