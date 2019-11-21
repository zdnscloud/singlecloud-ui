import React from 'react';
import _get from 'lodash/get';
import { useIntl, FormattedMessage } from 'react-intl';

const Message = ({ messages = {}, keyName, values }) => {
  const msg = messages[keyName];
  const id = _get(msg, 'id', `id-miss-${keyName}`);
  const defaultMessage = _get(msg, 'defaultMessage', `${keyName}`);
  if (!msg) {
    console.warn('not defined: ', keyName);
  }

  return (
    <FormattedMessage
      id={id}
      defaultMessage={defaultMessage}
      values={values}
    />
  );
};

export default Message;
