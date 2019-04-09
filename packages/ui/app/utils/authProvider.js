import store from 'store';
import { makeSelectAuthorization } from 'ducks/role/selectors';

const selector = makeSelectAuthorization();

const getAuth = () => {
  try {
    const state = store.instance.getState();
    const auth = selector(state);
    return {
      Authorization: auth,
    };
  } catch (e) {
    return {};
  }
};

export default getAuth;
