import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';

const schema = ['host', 'path', 'serviceName', 'servicePort'];

const ruleTableSchema = schema
  .map((id) => ({
    id,
    label: ucfirst(id),
  }))
  .concat([
    {
      id: 'serviceProtocol',
      label: 'ServiceProtocol',
      component: (props) => <span>tcp</span>,
    },
  ]);
ruleTableSchema.splice(2, 0, {
  id: 'protocol',
  label: 'Protocol',
  component: (props) => <span>HTTP</span>,
});
export default ruleTableSchema;
