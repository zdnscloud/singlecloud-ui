import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import TimeCell from 'components/Cells/TimeCell';
import { Link } from 'react-router-dom';
import Button from 'components/CustomButtons/Button';

const schema = ['SR'];

const tableSchema = schema
  .map((id) => ({
    id,
    label: ucfirst(id),
  }))
  .concat([
    {
      id: 'percentage',
      label: 'Percentage',
      component: ({ data }) => (
        <Fragment>
          <span>29ms</span>
        </Fragment>
      ),
    },
  ])
  .map((sch) => {
    if (sch.id === 'SR') {
      return {
        ...sch,
        component: ({ data }) => (
          <Fragment>
            <span>P99</span>
          </Fragment>
        ),
      };
    }
    return sch;
  });
export default tableSchema;
