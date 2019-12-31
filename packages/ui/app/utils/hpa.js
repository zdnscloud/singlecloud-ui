import { fromJS } from 'immutable';

export const refactorWorklodaMetrics = (worklodMetrics) => {
  let metrics = fromJS([]);
  worklodMetrics &&
    worklodMetrics.forEach((item) => {
      const { type } = item;
      if (item.metrics.length > 0) {
        item.metrics.forEach((child) => {
          metrics = metrics.push(
            fromJS({
              name: item.name,
              labels: child.labels,
              name_labels: `${item.name} ${JSON.stringify(child.labels)}`,
              value:
                type === 'COUNTER' ? child.counter.value : child.gauge.value,
            })
          );
        });
      }
    });
  return metrics;
};
