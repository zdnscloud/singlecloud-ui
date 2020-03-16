import { push } from 'connected-react-router';
import { Observable, interval, of, timer } from 'rxjs';
import {
  mergeMap,
  map,
  mapTo,
  debounce,
  debounceTime,
  reduce,
  scan,
  throttle,
  throttleTime,
  catchError,
} from 'rxjs/operators';
import { ofType, combineEpics } from 'redux-observable';
import { loadClusters } from 'ducks/clusters/actions';
import { makeSelectURL } from 'ducks/clusters/selectors';

import * as c from './constants';
import * as a from './actions';

export const httpErrorEpic = (action$, state$) =>
  action$.pipe(
    ofType(c.HTTP_ERROR),
    mergeMap(({ payload, error }) => {
      console.log('http error: ', payload);
      if (payload.statusCode) {
        console.log(payload.statusCode);
      }
      return of({ type: 'noop' });
    })
  );

export default combineEpics();
