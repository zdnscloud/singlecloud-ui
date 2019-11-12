import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { Form, Field } from 'react-final-form';
import getByKey from '@gsmlg/utils/getByKey';

import Danger from 'components/Typography/Danger';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputField from 'components/Field/InputField';
import SelectField from 'components/Field/SelectField';

import messages from '../messages';
import useStyles from '../styles';

const SearchForm = ({ onSubmit, formRef }) => {
  const classes = useStyles();
  return (
    <Form onSubmit={(values) => onSubmit(values)}>
      {({ handleSubmit, pristine, reset, submitting, values }) => (
        <form
          className={getByKey(classes, 'form')}
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <GridContainer>
            <GridItem xs={6} sm={6} md={6} className={classes.formLine}>
              <InputField
                label={<FormattedMessage {...messages.searchFormUserName} />}
                name="userName"
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
            <GridItem xs={6} sm={6} md={6} className={classes.formLine}>
              <SelectField
                label={<FormattedMessage {...messages.searchFormStatus} />}
                name="status"
                options={[
                  {
                    label: <FormattedMessage {...messages.selectAll} />,
                    value: 'all',
                  },
                  {
                    label: <FormattedMessage {...messages.tableProcessing} />,
                    value: 'processing',
                  },
                  {
                    label: <FormattedMessage {...messages.tableApproval} />,
                    value: 'approval',
                  },
                  {
                    label: <FormattedMessage {...messages.tableRejection} />,
                    value: 'rejection',
                  },
                ]}
                formControlProps={{
                  style: {
                    width: '100%',
                  },
                }}
              />
            </GridItem>
          </GridContainer>
        </form>
      )}
    </Form>
  );
};

export default SearchForm;
