import { fromJS } from 'immutable';

export const refactorWorklodaMetrics = (worklodMetrics) => {
  let metrics = fromJS([]);
  worklodMetrics &&
    worklodMetrics.forEach((item) => {
      if (item.metrics.length > 0) {
        item.metrics.forEach((child) => {
          metrics = metrics.push(
            fromJS({
              name: item.name,
              labels: child.labels,
              value: child.counter.value,
            })
          );
        });
      }
    });
  return metrics;
};
