import React, { useRef } from 'react';
import { FORM_ERROR } from 'final-form';

import CreateFinalForm from '../src/FinalForm/CreateForm';

export default {
  title: 'ReactFinalForm',
};

export const Base = () => {
  const formRef = useRef(null);

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
  
  const onSubmit = async values => {
    console.log('values',values);
    await sleep(300)
    if (values.clusterName !== 'aa') {
      return { [FORM_ERROR]: 'clusterName is wrong' }
    };
    window.alert(JSON.stringify(values, 0, 2));
  }

  return (
    <div>
      <h3>ReactFinalForm:</h3>
      <div>
        <CreateFinalForm 
          onSubmit={onSubmit} 
          formRef={formRef}
        />
         <button
          onClick={() => {
            formRef.current.dispatchEvent(
                new Event('submit', { cancelable: true })
              );
          }}
        >
          Submit
        </button>
      </div>
    </div>
  )
};
