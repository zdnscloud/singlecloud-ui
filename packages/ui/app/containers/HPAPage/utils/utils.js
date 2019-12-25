import React, { PureComponent, Fragment, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { fromJS, is } from 'immutable';

import InputField from 'components/Field/InputField';
import SelectField from 'components/Field/SelectField';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput';
import Chip from '@material-ui/core/Chip';

import messages from '../messages';

export const renderNumerical = (f, i, formValues) => {
  const targetType =
    formValues && formValues.getIn(['metrics', i, 'targetType']);
  let endAdornment;
  const metricsType =
    formValues && formValues.getIn(['metrics', i, 'metricsType']);
  if (metricsType === 'resourceMetrics' && targetType === 'AverageValue') {
    const resourceName = formValues.getIn(['metrics', i, 'resourceName']);
    switch (resourceName) {
      case 'cpu':
        endAdornment = messages.formCPUSuffix;
        break;
      case 'memory':
        endAdornment = 'Gi';
        break;
      default:
        break;
    }
  } else {
    endAdornment = undefined;
  }
  switch (targetType) {
    case 'Utilization':
      return (
        <InputField
          label={<FormattedMessage {...messages.formNumerical} />}
          normalize={(val) => (val ? Number(val) : val)}
          name={`${f}.averageUtilization`}
          fullWidth
          inputProps={{
            type: 'number',
            autoComplete: 'off',
            endAdornment: '%',
            min: 1,
            max: 255,
          }}
        />
      );
    case 'AverageValue':
      return (
        <InputField
          label={<FormattedMessage {...messages.formNumerical} />}
          name={`${f}.averageValue`}
          fullWidth
          inputProps={{
            type: 'text',
            autoComplete: 'off',
            endAdornment:
              endAdornment && typeof endAdornment === 'object' ? (
                <FormattedMessage {...endAdornment} />
              ) : (
                endAdornment
              ),
          }}
        />
      );

    default:
      break;
  }
};

export const renderMetricsName = (f, i, formValues, worklodMetrics) => {
  const metricNameOptions = worklodMetrics.toList().map((st) => ({
    label: `${st.get('name')} ${JSON.stringify(st.get('labels'))}`,
    value: `${st.get('name')} ${JSON.stringify(st.get('labels'))}`,
  }));
  const metricsType =
    formValues && formValues.getIn(['metrics', i, 'metricsType']);
  switch (metricsType) {
    case 'resourceMetrics':
      return (
        <SelectField
          label={<FormattedMessage {...messages.formMetricName} />}
          name={`${f}.resourceName`}
          formControlProps={{
            style: {
              width: '100%',
            },
          }}
          options={[
            {
              label: <FormattedMessage {...messages.formCpu} />,
              value: 'cpu',
            },
            {
              label: <FormattedMessage {...messages.formMemory} />,
              value: 'memory',
            },
          ]}
        />
      );
    case 'customMetrics':
      return (
        <SelectField
          label={<FormattedMessage {...messages.formMetricName} />}
          name={`${f}.metricName`}
          formControlProps={{
            style: {
              width: '100%',
            },
          }}
          options={metricNameOptions}
        />
      );
    default:
      break;
  }
};

export const renderMetricsItem = (metricsType) => {
  const metricsName = renderInputMetricsName(metricsType);
  let targetType;
  let metricsNameValue;
  switch (metricsType) {
    case 'resourceMetrics':
      targetType = 'Utilization';
      metricsNameValue = 'cpu';
      break;
    case 'customMetrics':
      targetType = 'AverageValue';
      metricsNameValue = '';
      break;
    default:
      break;
  }
  return fromJS({
    metricsType,
    [metricsName]: metricsNameValue,
    targetType,
  });
};

export const renderInputMetricsName = (metricsType) => {
  let metricsName;
  switch (metricsType) {
    case 'resourceMetrics':
      metricsName = 'resourceName';
      break;
    case 'customMetrics':
      metricsName = 'metricName';
      break;
    default:
      break;
  }
  return metricsName;
};

export const renderTargetTypeOptions = (metricsType) => {
  let targetTypeOptions = [
    {
      label: <FormattedMessage {...messages.formUtilization} />,
      value: 'Utilization',
    },
    {
      label: <FormattedMessage {...messages.formAverageValue} />,
      value: 'AverageValue',
    },
  ];
  switch (metricsType) {
    case 'resourceMetrics':
      targetTypeOptions;
      break;
    case 'customMetrics':
      targetTypeOptions = targetTypeOptions.filter(
        (p) => p.value === 'AverageValue'
      );
      break;
    default:
      break;
  }
  return targetTypeOptions;
};

export const renderMetricsTypeValue = (metricsType) => {
  let metricsTypeValue;
  switch (metricsType) {
    case 'resourceMetrics':
      metricsTypeValue = messages.formResourceMetrics;
      break;
    case 'customMetrics':
      metricsTypeValue = messages.formCustomMetrics;
      break;
    default:
      break;
  }
  return metricsTypeValue;
};

export const renderSubmitData = (formValues) => {
  const { metrics, ...formData } = formValues.toJS();
  const resourceMetrics =
    metrics.filter((r) => r.metricsType === 'resourceMetrics') || [];
  const customMetrics =
    metrics.filter((r) => r.metricsType === 'customMetrics') || [];
  if (resourceMetrics.length > 0) {
    resourceMetrics.forEach((item) => {
      if (item.resourceName === 'memory' && item.averageValue) {
        item.averageValue = `${item.averageValue}Gi`;
      }
    });
  }
  const data = {
    resourceMetrics,
    customMetrics,
    ...formData,
  };
  return data;
};

export const refactorMetrics = (data, intl) => {
  const { resourceMetrics, customMetrics, ...formData } = data;
  let arr = [];
  data.resourceMetrics =
    resourceMetrics &&
    resourceMetrics.map((item) => {
      item.metricsType = 'resourceMetrics';
      if (item.targetType === 'AverageValue' && item.averageValue) {
        if (item.resourceName === 'cpu') {
          item.averageValue = `${(item.averageValue / 1000).toFixed(
            2
          )} ${intl.formatMessage(messages.formCPUSuffix)}`;
        } else if (item.resourceName === 'memory') {
          item.averageValue = `${(item.averageValue / 1024 ** 3).toFixed(2)}Gi`;
        }
      }
      return item;
    });
  data.customMetrics =
    customMetrics &&
    customMetrics.map((item) => {
      item.metricsType = 'customMetrics';
      item.targetType = 'AverageValue';
      return item;
    });
  arr = arr.concat(data.resourceMetrics).concat(data.customMetrics);
  return arr;
};

export const refactorTargetSelectMetrics = (targetSelectMetrics) => {
  const arr = [];
  targetSelectMetrics && 
  targetSelectMetrics.forEach((item) => {
    arr.push({
      metricsType: 'customMetrics',
      targetType: 'AverageValue',
      averageValue: item.value,
      metricName: item.name,
    });
  });
  return arr;
}

export const renderReadOnlyNumerical = (c, i, metrics) => {
  const targetType = metrics && metrics.getIn([i, 'targetType']);
  switch (targetType) {
    case 'Utilization':
      return (
        <ReadOnlyInput
          labelText={<FormattedMessage {...messages.formNumerical} />}
          fullWidth
          value={c.get('averageUtilization')}
          inputProps={{
            autoComplete: 'off',
            endAdornment: '%',
          }}
        />
      );
    case 'AverageValue':
      return (
        <ReadOnlyInput
          labelText={<FormattedMessage {...messages.formNumerical} />}
          fullWidth
          value={c.get('averageValue')}
        />
      );
    default:
      break;
  }
};

export const renderTableMetrics = (data, intl) => {
  const val = data.toJS() || {};
  const {
    resourceMetrics,
    customMetrics,
    status: { currentMetrics },
  } = val;
  let arr = [];
  const rarr = [];
  const carr = [];
  const currentResourceMetrics = currentMetrics.resourceMetrics || [];
  const currentCustomMetrics = currentMetrics.customMetrics || [];
  const mefactorMetrics = (rm, crm, marr, type) => {
    if (rm && rm.length > 0) {
      rm.forEach((r, i) => {
        const item = {
          name: type === 'resourceMetrics' ? r.resourceName : r.metricName,
        };

        if (r.targetType === 'Utilization' && type === 'resourceMetrics') {
          item.systemVal =
            crm.length > 0 && crm[i].averageUtilization
              ? `${crm[i].averageUtilization}%`
              : '--';
          item.thresholdVal = `${r.averageUtilization}%`;
        } else if (
          r.targetType === 'AverageValue' &&
          type === 'resourceMetrics'
        ) {
          if (r.resourceName === 'cpu') {
            r.averageValue = (r.averageValue / 1000).toFixed(2);
            if (crm[i] && crm[i].averageValue) {
              crm[i].averageValue = (crm[i].averageValue / 1000).toFixed(2);
            }
            item.systemVal =
              crm.length > 0 && crm[i].averageValue
                ? `${crm[i].averageValue}${intl.formatMessage(
                    messages.formCPUSuffix
                )}`
                : '--';
            item.thresholdVal = `${r.averageValue}${intl.formatMessage(
              messages.formCPUSuffix
            )}`;
          } else if (r.resourceName === 'memory') {
            if (crm[i] && crm[i].averageValue) {
              crm[i].averageValue = (crm[i].averageValue / 1024 ** 3).toFixed(
                2
              );
            }
            r.averageValue = (r.averageValue / 1024 ** 3).toFixed(2);
            item.systemVal =
              crm.length > 0 && crm[i].averageValue
                ? `${crm[i].averageValue}Gi`
                : '--';
            item.thresholdVal = `${r.averageValue}Gi`;
          }
        } else {
          item.systemVal =
            crm.length > 0 && crm[i].averageValue ? crm[i].averageValue : '--';
          item.thresholdVal = r.averageValue;
        }

        marr.push(item);
      });
      return marr;
    }
  };

  mefactorMetrics(
    resourceMetrics,
    currentResourceMetrics,
    rarr,
    'resourceMetrics'
  );
  mefactorMetrics(customMetrics, currentCustomMetrics, carr, 'customMetrics');
  arr = arr.concat(rarr, carr);

  return arr.length > 0
    ? arr.map((val, key) => (
        <Chip
          key={key}
          label={`${val.name} : ${val.systemVal} / ${val.thresholdVal} `}
        />
      ))
    : '--';
};
