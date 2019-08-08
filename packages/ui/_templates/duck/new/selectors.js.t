---
to: <%= h.src() %>/app/ducks/<%= name %>/selectors.js
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
 * selectors: <%= name %>
 *
 */
import { createSelector } from 'reselect';
import {
  createMatchSelector,
  getLocation,
} from 'connected-react-router/immutable';
import { prefix } from './constants';
import { initialState } from './index';

/**
 * Direct selector to the <%= name %> domain
 */
export const selectDomain = (state) => state.get(prefix) || initialState;

/**
 * Other specific selectors
 */
export const makeSelectURL = () =>
  createSelector(
    selectDomain,
    (substate) => '/apis/zcloud.cn/v1/<%= name %>'
  );

export const makeSelect<%= cpname %> = () =>
  createSelector(
    selectDomain,
    (substate) => substate.get('data')
  );

export const makeSelect<%= cpname %>List = () =>
  createSelector(
    selectDomain,
    makeSelect<%= cpname %>(),
    (substate, data) => substate.get('list').map((id) => data.get(id))
  );

export const makeSelectCurrentID = () =>
   createSelector(
     createMatchSelector('/<%= name %>/:id/*'),
     (match) => {
       if (match && match.params) {
         return match.params.id;
       }
       return '';
     }
   );

export const makeSelectCurrent = () =>
  createSelector(
    selectDomain,
    makeSelectCurrentID(),
    (substate, id) =>
      substate.getIn(['data', id])
  );
