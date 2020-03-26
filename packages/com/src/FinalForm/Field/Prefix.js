import React from 'react';
import { Field } from 'react-final-form';

const FieldPrefixContext = React.createContext();

export const FieldPrefix = ({ prefix, children }) => (
  <FieldPrefixContext.Provider value={prefix}>
    {children}
  </FieldPrefixContext.Provider>
);

export const PrefixedField = ({ name, ...props }) => (
  <FieldPrefixContext.Consumer>
    {prefix => <Field name={`${prefix}.${name}`} {...props} />}
  </FieldPrefixContext.Consumer>
);
