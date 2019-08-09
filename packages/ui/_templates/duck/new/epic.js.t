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
    mergeMap(({ payload }) =>
      ajax(payload).pipe(
        map((resp) => a.load<%= cpname %>Success(resp)),
        catchError((error) => of(a.load<%= cpname %>Failure(error)))
      )
    )
  );

export const create<%= csname %>Epic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.CREATE_<%= SN %>),
    mergeMap(({ payload, meta: { resolve, reject, url } }) =>
      ajax({
        url,
        method: 'POST',
        body: payload,
      }).pipe(
        map((resp) => {
          resolve(resp);
          return a.create<%= csname %>Success(resp);
        }),
        catchError((error) => {
          reject(error);
          return of(a.create<%= csname %>Failure(error));
        })
      )
    )
  );

export const update<%= csname %>Epic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.UPDATE_<%= SN %>),
    mergeMap(({ payload, meta: { url, id } }) =>
      ajax({
        url: `${url}`,
        method: 'PUT',
        body: payload
      }).pipe(
        map((resp) => a.update<%= csname %>Success(resp, { id })),
        catchError((error) =>
          of(a.update<%= csname %>Failure(error, { id }))
        )
      )
    )
  );

export const read<%= csname %>Epic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.READ_<%= SN %>),
    mergeMap(({ payload, meta: { url } }) =>
      ajax({
        url: `${url}`,
        method: 'GET',
      }).pipe(
        map((resp) => a.read<%= csname %>Success(resp, { id: payload })),
        catchError((error) =>
          of(a.read<%= csname %>Failure(error, { id: payload }))
        )
      )
    )
  );

export const delete<%= csname %>Epic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.DELETE_<%= SN %>),
    mergeMap(({ payload, meta: { url } }) =>
      ajax({
        url: `${url}`,
        method: 'DELETE',
      }).pipe(
        map((resp) => a.delete<%= csname %>Success(resp, { id: payload })),
        catchError((error) =>
          of(a.delete<%= csname %>Failure(error, { id: payload }))
        )
      )
    )
  );

export const afterCreate<%= csname %>Epic = (action$) =>
  action$.pipe(
    ofType(c.CREATE_<%= SN %>_SUCCESS),
    mergeMap(({ payload, meta }) => mapTo(push(`/<%= name %>`)))
  );

export default combineEpics(
  load<%= cpname %>Epic,
  create<%= csname %>Epic,
  update<%= csname %>Epic,
  read<%= csname %>Epic,
  delete<%= csname %>Epic,
  afterCreate<%= csname %>Epic
);
