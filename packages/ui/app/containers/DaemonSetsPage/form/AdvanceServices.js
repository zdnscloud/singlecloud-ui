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

import messages from '../messages';

const AdvanceServices = ({
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

export default AdvanceServices;
