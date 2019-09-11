import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { useIntl } from 'react-intl';

const ZcloudHelmet = ({ title, description }) => {
  const intl = useIntl();

  return (
    <Helmet>
      <title>{intl.formatMessage(title)}</title>
      <meta name="description" content={intl.formatMessage(description)} />
    </Helmet>
  );
};

export default ZcloudHelmet;
