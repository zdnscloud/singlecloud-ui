import React, { PureComponent, Fragment, useState } from 'react';
import { fromJS, is } from 'immutable';
import { FormattedMessage, useIntl } from 'react-intl';
import { FieldArray } from 'redux-form/immutable';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import Danger from 'components/Typography/Danger';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import SelectField from 'components/Field/SelectField';
import PlusIcon from 'components/Icons/Plus';
import MinusIcon from 'components/Icons/Minus';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput';

import messages from '../messages';
import useStyles from '../styles';
import {
  renderNumerical,
  renderMetricsName,
  renderMetricsItem,
  renderTargetTypeOptions,
  renderMetricsTypeValue,
} from '../utils/utils';

const Metrics = ({
  fields,
  meta: { error, submitFailed },
  formValues,
  worklodMetrics,
}) => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <List component="ul" style={{ width: '100%' }}>
      <ListItem>
        <ListItemText>
          <Button
            className={classes.formPlusIcon}
            color="secondary"
            onClick={(evt) => {
              const metricsType = formValues && formValues.get('metricsType');
              return fields.push(renderMetricsItem(metricsType));
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
        const metricsTypeValue = renderMetricsTypeValue(metricsType);
        return (
          <ListItem key={i} className={classes.listItem}>
            <Card key={i} border>
              <CardBody>
                <ListItemText>
                  <GridContainer>
                    <GridItem xs={3} sm={3} md={3}>
                      <ReadOnlyInput
                        labelText={
                          <FormattedMessage {...messages.formMetricsType} />
                        }
                        fullWidth
                        value={
                          metricsTypeValue &&
                          intl.formatMessage(metricsTypeValue)
                        }
                      />
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                      {renderMetricsName(f, i, formValues, worklodMetrics)}
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
                        options={renderTargetTypeOptions(metricsType)}
                      />
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                      {renderNumerical(f, i, formValues)}
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
