import store from 'store';
import { makeSelectAuthorization } from 'ducks/role/selectors';

const getAuth = () => {
  try {
    const selector = makeSelectAuthorization();
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
