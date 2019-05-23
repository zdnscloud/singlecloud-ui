import _ from 'lodash';
import React, { Fragment } from 'react';
import { Field } from 'redux-form/immutable';
import { Map, List } from 'immutable';
import { FormattedMessage } from 'react-intl';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Button from 'components/CustomButtons/Button';

import messages from 'containers/UsersPage/messages';

const CustomCheckbox = ({
  label,
  cluster,
  namespace,
  onChange,
  onBlur,
  readOnly,
  value: val,
  ...rest
}) => {
  const value = val || List([]);
  const iv = Map({ cluster, namespace });

  return (
    <FormControlLabel
      control={
        <Checkbox
          {...rest}
          checked={value.includes(iv)}
          onChange={(evt) => {
            if (readOnly) {
              return evt.preventDefault();
            }
            const { checked } = evt.target;
            let newValue = value;
            const i = newValue.indexOf(iv);
            if (checked && i < 0) {
              newValue = newValue.push(iv);
            }
            if (!checked && i >= 0) {
              newValue = newValue.delete(i);
            }

            onChange(newValue);
          }}
        />
      }
      label={label}
    />
  );
}

const renderClusters = ({
  label,
  input,
  meta,
  clusters,
  ...custom
}) => {
  return (
    <Fragment>
      {clusters.toList().map((c, i) => {
        const name = c.get('name');
        const ns = c.get('namespaces');
        const { value, ...ipt } = input;
        return (
          <Fragment key={i}>
            <FormGroup row>
              <CustomCheckbox
                {...ipt}
                {...custom}
                label={<FormattedMessage {...messages.clusterAllNamespaces} values={{cluster: name}} />}
                value={value}
                cluster={name}
                namespace="_all"
              />
            </FormGroup>
            {ns.size > 0 ? (
              <FormGroup row>
                {ns.toList().map((n, ii) => {
                  const nname = n.get('name');
                  return (
                    <CustomCheckbox
                      key={ii}
                      {...ipt}
                      {...custom}
                      label={<FormattedMessage {...messages.clusterNamespace} values={{cluster: name, namespace: nname}} />}
                      value={value}
                      cluster={name}
                      namespace={nname}
                    />
                  );
                })}
              </FormGroup>
            ) : null}
          </Fragment>
        );
      })}
    </Fragment>
  )
};

const AuthField = (props) => {
  const { component, ...rest } = props;

  return <Field {...rest} component={renderClusters} />;
};

export default AuthField;
