import React, { PureComponent, Fragment, useState } from 'react';
import { fromJS, is } from 'immutable';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import getByKey from '@gsmlg/utils/getByKey';

import Danger from 'components/Typography/Danger';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import NodeMainTemplate from './form/NodeMainTemplate';
import NodeWorkTemplate from './form/NodeWorkTemplate';
import messages from './messages';

export const NodeForm = ({ onSubmit, classes, formRef, initialValues }) => (
  <Form
    onSubmit={(values) => onSubmit(values)}
    initialValues={initialValues}
    mutators={{
      ...arrayMutators,
    }}
  >
    {({ handleSubmit, pristine, reset, submitting, values, submitError }) => (
      <form
        className={getByKey(classes, 'form')}
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <FieldArray
              name="nodes.main"
              classes={classes}
              component={NodeMainTemplate}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <FieldArray
              name="nodes.work"
              classes={classes}
              component={NodeWorkTemplate}
            />
          </GridItem>
        </GridContainer>
      </form>
    )}
  </Form>
);

export default NodeForm;
