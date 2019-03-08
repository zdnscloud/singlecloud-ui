import { ucfirst } from '@gsmlg/utils';

const schema = [
  'name',
  'address',
  'role',
  'cpu',
  'memory',
  'operatingSystem',
  'operatingSystemImage',
  'pod',
  'dockerVersion',
  'creationTimestamp',
  'labels',
];

const tableSchema = schema.map(id => ({
  id,
  label: ucfirst(id),
}));

export default tableSchema;
