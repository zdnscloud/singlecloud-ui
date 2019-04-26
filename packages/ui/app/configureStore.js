/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'connected-react-router/immutable';
import createSagaMiddleware from 'redux-saga';
import { createEpicMiddleware } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import authProvider from 'utils/authProvider';

import createReducer from './reducers';
import createEpic from './epics';
import rootSaga from './rootSaga';

const epicMiddleware = createEpicMiddleware({
  dependencies: {
    ajax: (arg) => {
      const auth = authProvider();
      let opt = arg;
      if (typeof opt === 'string') {
        opt = {
          url: arg,
          headers: {
            ...auth,
            'Content-Type': 'application/json',
          },
        };
      }
      return ajax({
        ...opt,
        body: JSON.stringify(opt && opt.body),
        headers: {
          ...auth,
          'Content-Type': 'application/json',
          ...(opt && opt.headers || {}),
        },
      });
    },
    getJSON: (arg) => {
      const auth = authProvider();
      let opt = arg;
      if (typeof opt === 'string') {
        opt = {
          url: arg,
          headers: {
            ...auth,
            'Content-Type': 'application/json',
          },
        };
      }
      return ajax.getJSON({
        ...opt,
        headers: {
          ...auth,
          'Content-Type': 'application/json',
          ...(opt.headers || {}),
        },
      });
    },
  },
});
const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}, history) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
    epicMiddleware,
  ];

  const enhancers = [applyMiddleware(...middlewares)];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle, indent */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;
  /* eslint-enable */

  const store = createStore(
    createReducer(),
    fromJS(initialState),
    composeEnhancers(...enhancers)
  );

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.runEpic = epicMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry
  store.injectedEpics = {}; // Epic registry

  store.runSaga(rootSaga);

  const epic$ = new BehaviorSubject(createEpic(store.injectedEpics));
  // Every time a new epic is given to epic$ it
  // will unsubscribe from the previous one then
  // call and subscribe to the new one because of
  // how switchMap works
  const hotReloadingEpic = (...args) =>
    epic$.pipe(switchMap((epic) => epic(...args)));
  store.runEpic(hotReloadingEpic);

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
    module.hot.accept('./epics', () => {
      const nextRootEpic = createEpic(store.injectedEpics);
      epic$.next(nextRootEpic);
    });
  }

  return store;
}
