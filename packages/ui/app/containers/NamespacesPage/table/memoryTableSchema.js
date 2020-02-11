import React, { Fragment } from 'react';
import { ucfirst } from '@gsmlg/utils';
import { Link } from 'react-router-dom';
import Button from 'components/CustomButtons/Button';
import { FormattedMessage } from 'react-intl';
import messages from '../messages';

const schema = ['name', 'memoryUsed'];
const inflection = require('inflection');

const memoryTableSchema = schema
  .map((id) => ({
    id,
    label: ucfirst(id),
  }))
  .map((sch) => {
    if (sch.id === 'memoryUsed') {
      return {
        ...sch,
        component: ({ value }) => `${(value / 1024 ** 3).toFixed(2)}GiB`,
      };
    }
    return sch;
  })
  .concat([
    {
      id: 'actions',
      label: 'Actions',
      component: ({
        clusterID,
        classes,
        push,
        executeNamespaceAction,
        data,
        namespace,
        namespaceID,
      }) => (
        <Button
          action
          onClick={() => {
            const podName = data.get('name');
            const url = namespace.getIn(['links', 'self']);
            executeNamespaceAction(
              'searchPod',
              { name: podName },
              {
                resolve({ response: { kind, name } }) {
                  push(
                    `/clusters/${clusterID}/namespaces/${namespaceID}/${inflection.pluralize(
                      kind
                    )}/${name}/show`
                  );
                },
                reject() {},
                url,
              }
            );
          }}
        >
          <FormattedMessage {...messages.linkButton} />
        </Button>
      ),
    },
  ]);
export default memoryTableSchema;
