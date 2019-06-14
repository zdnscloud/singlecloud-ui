import { Observable } from 'rxjs';
import { map, scan, throttleTime, debounceTime } from 'rxjs/operators';
import localforage from 'localforage';
import persistentSubState from 'persistentSubState';

const round = (number) => Math.round(number * 100) / 100;

const persistentEnhancer = (createStore) => (
  reducer,
  initialState,
  enhancer
) => {
  let svc;
  const saveStream = Observable.create((ob) => {
    svc = ob;
  });

  const monitoredReducer = (state, action) => {
    const start = Date.now();
    const newState = reducer(state, action);
    const end = Date.now();
    const diff = round(end - start);

    if (process.env.NODE_ENV !== 'production') {
      console.log(`reducer process time: ${diff} ms`);
    }
    try {
      svc.next(newState);
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(e);
      }
    }

    return newState;
  };

  saveStream.pipe(throttleTime(2000)).subscribe((st) => {
    const start = Date.now();
    const willBeSaved = {};
    persistentSubState.forEach((sub) => {
      const subst = st.get(sub);
      if (subst)
        willBeSaved[sub] = subst.toJS();
    });
    localforage.setItem('persistentSubState', willBeSaved);
    const end = Date.now();
    const diff = round(end - start);

    if (process.env.NODE_ENV !== 'production') {
      console.log(`save perstent time: ${diff} ms`);
    }
  });

  return createStore(monitoredReducer, initialState, enhancer);
};

export default persistentEnhancer;
