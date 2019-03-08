import { ucfirst } from '@gsmlg/utils';

const schema = ['name', 'replicas', 'containers'];

const tableSchema = schema.map(id => ({
  id,
  label: ucfirst(id),
}));

export default tableSchema;
