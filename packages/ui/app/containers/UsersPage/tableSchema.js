import { ucfirst } from '@gsmlg/utils';

const schema = ['name', 'projects', 'creationTimestamp'];

const tableSchema = schema.map((id) => ({
  id,
  label: ucfirst(id),
}));

export default tableSchema;
