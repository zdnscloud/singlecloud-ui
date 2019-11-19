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

const Metrics = ({
  fields,
  meta: { error, submitFailed },
  configMaps,
  secrets,
  formValues,
}) => {
  const classes = useStyles();
  return (
    <List component="ul" style={{ width: '100%' }}>
      <ListItem>
        <ListItemText>
          <Button color="secondary" onClick={(evt) => fields.push(fromJS({}))}>
            <FormattedMessage {...messages.formAddMetricsBtn} />
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
        console.log('f', f);
        return (
          <ListItem key={i}>
            <Card key={i} border>
              <CardBody>
                <ListItemText>
                  <GridContainer>
                    <GridItem xs={3} sm={3} md={3}>
                      <SelectField
                        label={
                          <FormattedMessage {...messages.formMetricsType} />
                        }
                        name={`${f}.metricsType`}
                        formControlProps={{
                          style: {
                            width: '100%',
                          },
                        }}
                        options={[
                          {
                            label: (
                              <FormattedMessage
                                {...messages.formResourceMetrics}
                              />
                            ),
                            value: 'resourceMetrics',
                          },
                          {
                            label: (
                              <FormattedMessage
                                {...messages.formCustomMetrics}
                              />
                            ),
                            value: 'customMetrics',
                          },
                        ]}
                      />
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                      <SelectField
                        label={
                          <FormattedMessage {...messages.formResourceName} />
                        }
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
                        options={[
                          {
                            label: (
                              <FormattedMessage {...messages.formUtilization} />
                            ),
                            value: 'Utilization',
                          },
                          {
                            label: (
                              <FormattedMessage
                                {...messages.formAverageValue}
                              />
                            ),
                            value: 'AverageValue',
                          },
                        ]}
                      />
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                      {f ? (
                        // {f && f.get('targetType') === 'Utilization' ? (
                        <InputField
                          label={
                            <FormattedMessage {...messages.formNumerical} />
                          }
                          name={`${f}.averageUtilization`}
                          normalize={(val) => (val ? Number(val) : val)}
                          fullWidth
                          inputProps={{
                            type: 'text',
                            autoComplete: 'off',
                            endAdornment: '%',
                          }}
                        />
                      ) : (
                        <InputField
                          label={
                            <FormattedMessage {...messages.formNumerical} />
                          }
                          name={`${f}.averageValue`}
                          normalize={(val) => (val ? Number(val) : val)}
                          fullWidth
                          inputProps={{
                            type: 'number',
                            autoComplete: 'off',
                            min: 1,
                            max: 255,
                          }}
                        />
                      )}
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
