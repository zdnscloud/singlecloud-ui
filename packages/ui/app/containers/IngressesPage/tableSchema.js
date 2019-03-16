import { ucfirst } from '@gsmlg/utils';

const schema = ['name', 'rules', 'creationTimestamp'];

const tableSchema = schema.map((id) => ({
  id,
  label: ucfirst(id),
}));

export default tableSchema;
