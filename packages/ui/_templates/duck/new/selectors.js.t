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

  pt = parents[parents.length - 1];
  sp = h.inflection.singularize(pt);
  csp = h.inflection.camelize(sp);
  spList = parents.map((p) => h.inflection.singularize(p));
  cspList = spList.map((p) => h.inflection.camelize(p));
  spIDs = spList.map((p) => `${p}ID`).join(', ');
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
<% if (hasParents) { %>
import {
  makeSelectCurrent as makeSelectCurrent<%= csp %>,
} from 'ducks/<%= pt %>/selectors';
<% parents.forEach((p, i) => { %>
import { makeSelectCurrentID as makeSelectCurrent<%= cspList[i] %>ID } from 'ducks/<%= p %>/selectors';
<% })
} %>
import { prefix } from './constants';
import { initialState } from './index';

/**
 * Direct selector to the <%= name %> domain
 */
export const selectDomain = (state) => state.get(prefix) || initialState;

/**
 * Other specific selectors
 */
<% if (hasParents) { %>export const makeSelectURL = () =>
  createSelector(
    makeSelectCurrent<%= csp %>,
    (pt) => pt.getIn(['links', '<%= pname.toLowerCase() %>'])
  );
<% } else { %>export const makeSelectURL = () =>
  createSelector(
    selectDomain,
    (substate) => '/apis/zcloud.cn/v1/<%= name %>'
  );
<% } %>
export const makeSelect<%= cpname %> = () =>
  createSelector(
    selectDomain,
<% if (hasParents) {
  cspList.forEach((p) => {%>
    makeSelectCurrent<%= p %>ID(),
<% })
} %>
    (substate<%= hasParents ? `, ${spIDs}` : '' %>) => substate.getIn(['data'<%= hasParents ? `, ${spIDs}` : '' %>])
  );

export const makeSelect<%= cpname %>List = () =>
  createSelector(
    selectDomain,
    makeSelect<%= cpname %>(),
<% if (hasParents) {
  cspList.forEach((p) => {%>
    makeSelectCurrent<%= p %>ID(),
<% })
} %>
    (substate, data<%= hasParents ? `, ${spIDs}` : '' %>) => substate.getIn(['list'<%= hasParents ? `, ${spIDs}` : '' %>]).map((id) => data.get(id))
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
