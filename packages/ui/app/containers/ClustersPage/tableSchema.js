import { ucfirst } from '@gsmlg/utils';

const schema = ['status', 'name', 'nodeCount', 'creationTimestamp'];

const tableSchema = schema.map((id) => ({
  id,
  label: ucfirst(id),
}));

export default tableSchema;
