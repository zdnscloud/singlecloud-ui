import React, { Fragment } from 'react';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputField from 'components/Field/InputField';
import SwitchField from 'components/Field/SwitchField';
import RadioField from 'components/Field/RadioField';
import CheckboxesField from 'components/Field/CheckboxesField';
import useStyles from '../styles';

const DynamicForm = ({ fields, config, formValues }) => {
  const classes = useStyles();
  const renderItem = (item) => {
    const radioOptions = item.get('validValues')
      ? item
        .get('validValues')
        .toList()
        .map((sc) => ({
          label: sc,
          value: sc,
        }))
      : null;

    switch (item.get('type')) {
      case 'int':
        return (
          <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
            <InputField
              label={item.get('label')}
              name={item.get('jsonKey')}
              formControlProps={{
                className: classes.nameControl,
                style: {
                  width: '100%',
                },
              }}
              inputProps={{
                type: 'number',
                autoComplete: 'off',
              }}
              normalize={(val) => (val ? Number(val) : val)}
            />
          </GridItem>
        );

      case 'string':
        return (
          <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
            <InputField
              label={item.get('label')}
              name={item.get('jsonKey')}
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
        );

      case 'bool':
        return (
          <GridItem xs={12} sm={12} md={12} className={classes.formLine}>
            <SwitchField
              label={item.get('label')}
              name={item.get('jsonKey')}
              className={classes.singleField}
            />
          </GridItem>
        );

      case 'enum':
        return (
          <GridItem xs={12} sm={12} md={12} className={classes.formLine}>
            <RadioField
              label={item.get('label')}
              name={item.get('jsonKey')}
              classes={{
                formControl: classes.radioControl,
                formLabel: classes.radioLabel,
                group: classes.radioGroup,
              }}
              options={radioOptions}
              formControlComponent="div"
              formLabelComponent="div"
            />
          </GridItem>
        );

      case 'array':
        return (
          <GridItem xs={12} sm={12} md={12} className={classes.formLine}>
            <CheckboxesField
              label={item.get('label')}
              name={item.get('jsonKey')}
              classes={{
                formControl: classes.chexboxesControl,
                formLabel: classes.chexboxesLabel,
                group: classes.chexboxesGroup,
              }}
              options={radioOptions}
              formControlComponent="div"
              formLabelComponent="div"
            />
          </GridItem>
        );
      default:
        break;
    }
    return null;
  };

  return (
    <Fragment>
      <GridContainer>
        {config.map((item, index) => (
          <Fragment key={index}>{renderItem(item)}</Fragment>
        ))}
      </GridContainer>
    </Fragment>
  );
};

export default DynamicForm;
