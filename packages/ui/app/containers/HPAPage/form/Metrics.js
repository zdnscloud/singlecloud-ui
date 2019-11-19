import React, { PureComponent, Fragment, useState } from 'react';
import { fromJS, is } from 'immutable';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'redux-form/immutable';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import Danger from 'components/Typography/Danger';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import SelectField from 'components/Field/SelectField';
import InputField from 'components/Field/InputField';
import PlusIcon from 'components/Icons/Plus';
import MinusIcon from 'components/Icons/Minus';

import messages from '../messages';
import useStyles from '../styles';

const Metrics = ({ fields, meta: { error, submitFailed }, formValues }) => {
  const classes = useStyles();
  const renderNumerical = (f, i) => {
    const targetType =
      formValues && formValues.getIn(['metrics', i, 'targetType']);
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
            normalize={(val) => (val ? Number(val) : val)}
            fullWidth
            inputProps={{
              type: 'text',
              autoComplete: 'off',
              endAdornment: '%',
            }}
          />
        );

      default:
        break;
    }
  };

  return (
    <List component="ul" style={{ width: '100%' }}>
      <ListItem>
        <ListItemText>
          <Button
            className={classes.formPlusIcon}
            color="secondary"
            onClick={(evt) => {
              const metricsType = formValues && formValues.get('metricsType');
              let metricsName;
              let targetType;
              let metricsNameValue;
              switch (metricsType) {
                case 'resourceMetrics':
                  metricsName = 'resourceName';
                  targetType = 'Utilization';
                  metricsNameValue = 'cpu';
                  break;
                case 'customMetrics':
                  metricsName = 'metricName';
                  targetType = 'AverageValue';
                  metricsNameValue = '';
                  break;
                default:
                  break;
              }
              return fields.push(
                fromJS({
                  metricsType,
                  [metricsName]: metricsNameValue,
                  targetType,
                })
              );
            }}
          >
            <PlusIcon />
          </Button>
        </ListItemText>
      </ListItem>

      {submitFailed && error && (
        <ListItem>
          <Danger>{error}</Danger>
        </ListItem>
      )}
      {fields.map((f, i) => {
        const metricsType =
          formValues && formValues.getIn(['metrics', i, 'metricsType']);
        let targetTypeOptins = [
          {
            label: <FormattedMessage {...messages.formUtilization} />,
            value: 'Utilization',
          },
          {
            label: <FormattedMessage {...messages.formAverageValue} />,
            value: 'AverageValue',
          },
        ];
        let metricsName;
        switch (metricsType) {
          case 'resourceMetrics':
            metricsName = 'resourceName';
            break;
          case 'customMetrics':
            metricsName = 'metricName';
            targetTypeOptins = targetTypeOptins.filter(
              (p) => p.value === 'AverageValue'
            );
            break;
          default:
            metricsName = 'resourceName';
            break;
        }
        return (
          <ListItem key={i}>
            <Card key={i} border>
              <CardBody>
                <ListItemText>
                  <GridContainer>
                    <GridItem xs={3} sm={3} md={3}>
                      <InputField
                        label={
                          <FormattedMessage {...messages.formMetricsType} />
                        }
                        name={`${f}.metricsType`}
                        fullWidth
                        inputProps={{
                          type: 'text',
                          autoComplete: 'off',
                        }}
                        disabled
                      />
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                      <SelectField
                        label={
                          <FormattedMessage {...messages.formMetricName} />
                        }
                        name={`${f}.${metricsName}`}
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
                            label: (
                              <FormattedMessage {...messages.formMemory} />
                            ),
                            value: 'memory',
                          },
                        ]}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={3} sm={3} md={3}>
                      <SelectField
                        label={
                          <FormattedMessage {...messages.formTargetType} />
                        }
                        name={`${f}.targetType`}
                        formControlProps={{
                          style: {
                            width: '100%',
                          },
                        }}
                        options={targetTypeOptins}
                      />
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                      {renderNumerical(f, i)}
                    </GridItem>
                  </GridContainer>
                </ListItemText>
              </CardBody>
            </Card>

            <IconButton variant="contained" onClick={(evt) => fields.remove(i)}>
              <MinusIcon />
            </IconButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default Metrics;
