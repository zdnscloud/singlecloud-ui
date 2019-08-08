---
to: app/ducks/<%= name %>/actions.js
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
 * actions: <%= name %>
 *
 */
import * as c from './constants';

/**
 * actions
 */
export const load<%= cpname %> = (url, meta) => ({
  type: c.LOAD_<%= PN %>,
  payload: url,
  meta,
});

export const load<%= cpname %>Success = (resp, meta) => ({
  type: c.LOAD_<%= PN %>_SUCCESS,
  payload: resp,
  meta,
});

export const load<%= cpname %>Failure = (error, meta) => ({
  type: c.LOAD_<%= PN %>_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const create<%= csname %> = (data, meta) => ({
  type: c.CREATE_<%= SN %>,
  payload: data,
  meta,
});

export const create<%= csname %>Success = (resp, meta) => ({
  type: c.CREATE_<%= SN %>_SUCCESS,
  payload: resp,
  meta,
});

export const create<%= csname %>Failure = (error, meta) => ({
  type: c.CREATE_<%= SN %>_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const update<%= csname %> = (data, meta) => ({
  type: c.UPDATE_<%= SN %>,
  payload: data,
  meta,
});

export const update<%= csname %>Success = (resp, meta) => ({
  type: c.UPDATE_<%= SN %>_SUCCESS,
  payload: resp,
  meta,
});

export const update<%= csname %>Failure = (error, meta) => ({
  type: c.UPDATE_<%= SN %>_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const read<%= csname %> = (id, meta) => ({
  type: c.READ_<%= SN %>,
  payload: id,
  meta,
});

export const read<%= csname %>Success = (resp, meta) => ({
  type: c.READ_<%= SN %>_SUCCESS,
  payload: resp,
  meta,
});

export const read<%= csname %>Failure = (error, meta) => ({
  type: c.READ_<%= SN %>_FAILURE,
  payload: error,
  meta,
  error: true,
});

export const remove<%= csname %> = (id, meta) => ({
  type: c.REMOVE_<%= SN %>,
  payload: id,
  meta,
});

export const remove<%= csname %>Success = (resp, meta) => ({
  type: c.REMOVE_<%= SN %>_SUCCESS,
  payload: resp,
  meta,
});

export const remove<%= csname %>Failure = (error, meta) => ({
  type: c.REMOVE_<%= SN %>_FAILURE,
  payload: error,
  meta,
  error: true,
});
