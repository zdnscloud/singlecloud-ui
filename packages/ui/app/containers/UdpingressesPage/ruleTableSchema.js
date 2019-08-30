import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';

const schema = ['port', 'serviceName', 'servicePort'];

const ruleTableSchema = schema
  .map((id) => ({
    id,
    label: ucfirst(id),
  }))
  .concat([
    {
      id: 'serviceProtocol',
      label: 'ServiceProtocol',
      component: (props) => <span>udp</span>,
    },
  ]);
ruleTableSchema.splice(1, 0, {
  id: 'protocol',
  label: 'Protocol',
  component: (props) => <span>UDP</span>,
});
export default ruleTableSchema;
