---
to: <%= h.src() %>/app/ducks/<%= name %>/constants.js
---
<%
  pname = h.inflection.pluralize(name);
  PN = h.inflection.underscore(pname).toUpperCase();
  cpname = h.inflection.camelize(pname);

  sname = h.inflection.singularize(name);
  SN = h.inflection.underscore(sname).toUpperCase();
  csname = h.inflection.camelize(sname);
%>/**
 * Duck: <%= h.inflection.titleize(name) %>
 * constants: <%= name %>
 *
 */
export const prefix = '<%= name %>';

/**
 *  constants
 */
export const LOAD_<%= PN %> = `${prefix}/LOAD_<%= PN %>`;
export const LOAD_<%= PN %>_SUCCESS = `${prefix}/LOAD_<%= PN %>_SUCCESS`;
export const LOAD_<%= PN %>_FAILURE = `${prefix}/LOAD_<%= PN %>_FAILURE`;

export const CREATE_<%= SN %> = `${prefix}/CREATE_<%= SN %>`;
export const CREATE_<%= SN %>_SUCCESS = `${prefix}/CREATE_<%= SN %>_SUCCESS`;
export const CREATE_<%= SN %>_FAILURE = `${prefix}/CREATE_<%= SN %>_FAILURE`;

export const UPDATE_<%= SN %> = `${prefix}/UPDATE_<%= SN %>`;
export const UPDATE_<%= SN %>_SUCCESS = `${prefix}/UPDATE_<%= SN %>_SUCCESS`;
export const UPDATE_<%= SN %>_FAILURE = `${prefix}/UPDATE_<%= SN %>_FAILURE`;

export const READ_<%= SN %> = `${prefix}/READ_<%= SN %>`;
export const READ_<%= SN %>_SUCCESS = `${prefix}/READ_<%= SN %>_SUCCESS`;
export const READ_<%= SN %>_FAILURE = `${prefix}/READ_<%= SN %>_FAILURE`;

export const DELETE_<%= SN %> = `${prefix}/DELETE_<%= SN %>`;
export const DELETE_<%= SN %>_SUCCESS = `${prefix}/DELETE_<%= SN %>_SUCCESS`;
export const DELETE_<%= SN %>_FAILURE = `${prefix}/DELETE_<%= SN %>_FAILURE`;
