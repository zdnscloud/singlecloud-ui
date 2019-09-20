import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import getByKey from '@gsmlg/utils/getByKey';

import Danger from 'components/Typography/Danger';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputField from 'components/Field/InputField';

import messages from '../messages';
import useStyles from '../styles';

const SearchForm = ({ handleSubmit, error }) => {
  const classes = useStyles();

  return (
    <form className={getByKey(classes, 'form')} onSubmit={handleSubmit}>
      <GridContainer>
        {error ? (
          <GridItem xs={12} sm={12} md={12}>
            <Danger>{getByKey(error, ['response', 'message'])}</Danger>
          </GridItem>
        ) : null}
        <GridItem xs={12} sm={12} md={12} className={classes.formLine}>
          <InputField
            label={<FormattedMessage {...messages.searchFormApplicationName} />}
            name="name"
            formControlProps={{
              className: classes.nameControl,
              style: {
                width: '100%',
              },
            }}
            inputProps={{
              type: 'text',
              autoComplete: 'off',
            }}
          />
        </GridItem>
      </GridContainer>
    </form>
  );
};

export default SearchForm;
