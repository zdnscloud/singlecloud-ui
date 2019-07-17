import { ucfirst } from '@gsmlg/utils';
import TimeCell from 'components/Cells/TimeCell';

const schema = [
  'status',
  'name',
  'cpu',
  'memory',
  'storage',
  'creationTimestamp',
];

const tableSchema = schema
  .map((id) => ({
    id,
    label: ucfirst(id),
  }))
  .map((item) => {
    if (item.id === 'creationTimestamp') {
      return {
        ...item,
        component: TimeCell,
      };
    }
    return item;
  });

export default tableSchema;
