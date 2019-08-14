---
to: <%= h.src() %>/app/ducks/<%= name %>/epic.js
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
 * epic: <%= name %>
 *
 */
import { push } from 'connected-react-router';
import { Observable, interval, of, timer, concat } from 'rxjs';
import {
  mergeMap,
  map,
  mapTo,
  debounce,
  debounceTime,
  reduce,
  scan,
  throttleTime,
  throttle,
  catchError,
} from 'rxjs/operators';
import { ofType, combineEpics } from 'redux-observable';

import * as c from './constants';
import * as a from './actions';

export const load<%= cpname %>Epic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_<%= PN %>),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => a.load<%= cpname %>Success(resp, meta)),
        catchError((error) => of(a.load<%= cpname %>Failure(error, meta)))
      )
    )
  );
<% if (wannaCreateAction) {%>
export const create<%= csname %>Epic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_<%= SN %>),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.create<%= csname %>Success(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.create<%= csname %>Failure(error, meta));
        })
      )
    )
  );
<% }
if (wannaUpdateAction) {%>
export const update<%= csname %>Epic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.UPDATE_<%= SN %>),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'PUT',
        body: payload
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.update<%= csname %>Success(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.update<%= csname %>Failure(error, meta))
        })
      )
    )
  );
<% }
if (wannaReadOneAction) {%>
export const read<%= csname %>Epic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.READ_<%= SN %>),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'GET',
      }).pipe(
        map((resp) => a.read<%= csname %>Success(resp, { ...meta, id: payload })),
        catchError((error) =>
          of(a.read<%= csname %>Failure(error, { ...meta, id: payload }))
        )
      )
    )
  );
<% }
if (wannaRemoveAction) {%>
export const remove<%= csname %>Epic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.REMOVE_<%= SN %>),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'REMOVE',
      }).pipe(
        map((resp) => a.remove<%= csname %>Success(resp, { ...meta, id: payload })),
        catchError((error) =>
          of(a.remove<%= csname %>Failure(error, { ...meta, id: payload }))
        )
      )
    )
  );
<% }
if (wannaCreateAction) {%>
export const afterCreate<%= csname %>Epic = (action$) =>
  action$.pipe(
    ofType(c.CREATE_<%= SN %>_SUCCESS),
    mergeMap(({ payload, meta }) => mapTo(push(`/<%= name %>`)))
  );
<% } %>
export default combineEpics(
  load<%= cpname %>Epic,<% if (wannaCreateAction) {%>
  create<%= csname %>Epic,<% }
if (wannaUpdateAction) {%>
  update<%= csname %>Epic,<% }
if (wannaReadOneAction) {%>
  read<%= csname %>Epic,<% }
if (wannaRemoveAction) {%>
  remove<%= csname %>Epic,<% }
if (wannaCreateAction) {%>
  afterCreate<%= csname %>Epic,<% } %>
);
