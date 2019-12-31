/**
 * Duck: KubeConfigs
 * epic: kubeConfigs
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

export const loadKubeConfigsEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_KUBE_CONFIGS),
    mergeMap(({ payload, meta }) =>
      ajax(payload).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.loadKubeConfigsSuccess(resp, meta);
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.loadKubeConfigsFailure(error, meta));
        })
      )
    )
  );

export const readKubeConfigEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.READ_KUBE_CONFIG),
    mergeMap(({ payload, meta }) =>
      ajax({
        url: `${meta.url}`,
        method: 'GET',
      }).pipe(
        map((resp) => {
          meta.resolve && meta.resolve(resp);
          return a.readKubeConfigSuccess(resp, { ...meta, id: payload });
        }),
        catchError((error) => {
          meta.reject && meta.reject(error);
          return of(a.readKubeConfigFailure(error, { ...meta, id: payload }));
        })
      )
    )
  );

export default combineEpics(loadKubeConfigsEpic, readKubeConfigEpic);
