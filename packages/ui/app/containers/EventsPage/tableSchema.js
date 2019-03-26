import { ucfirst } from '@gsmlg/utils';

const schema = [
  'time',
  'namespace',
  'kind',
  'name',
  'type',
  'reason',
  'message',
  'source',
];

const tableSchema = schema.map((id) => ({
  id,
  label: ucfirst(id),
}));

export default tableSchema;
