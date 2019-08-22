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

export const loadChartsEpic = (action$, state$, { ajax }) =>
  action$.pipe(
    ofType(c.LOAD_CHARTS),
    mergeMap(({ payload }) =>
      ajax(payload).pipe(
        map((resp) => a.loadChartsSuccess(resp)),
        catchError((error) => of(a.loadChartsFailure(error)))
      )
    )
  );

export default combineEpics(
  loadChartsEpic,
);
