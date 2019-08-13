import React, { PureComponent ,Fragment} from 'react';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form/immutable';
import getByKey from '@gsmlg/utils/getByKey';

import Danger from 'components/Typography/Danger';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import InputField from 'components/Field/InputField';
import SwitchField from 'components/Field/SwitchField';
import RadioField from 'components/Field/RadioField';
import messages from '../messages';

const DynamicForm = ({ 
  fields,
  config,
  classes,
  formValues
}) => { 
  // console.log('config',config,'fields',fields)
 
  const renderItem= (item)=>{
    
    const radioOptions =  item.get('validValues') ? item.get('validValues').toList().map((sc) => ({
      label: sc,
      value: sc,
    })):null;

    switch (true) {
      case item.get('type')==='int' || item.get('type')==='string':
        return <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
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
        break; 

      case item.get('type')=== 'bool':
        return  <GridItem xs={12} sm={12} md={12} className={classes.formLine}>
            <SwitchField
              label={item.get('label')}
              name={item.get('jsonKey')}
              className={classes.singleField}
            />
          </GridItem>
        break; 

      case item.get('type')==='enum' || item.get('type')==='array':  
        return  <GridItem xs={12} sm={12} md={12} className={classes.formLine}>
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
        break;
    }
  }

  return (
    <Fragment>
       <GridContainer>
          { config.map((item, index) => {  
            return (
                <Fragment key={index}>
                  {renderItem(item)}
              </Fragment>
            );
          })}
        </GridContainer>
    </Fragment>
  );
};

export default DynamicForm;
