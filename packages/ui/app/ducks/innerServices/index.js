/**
 * Duck: InnerServices
 * reducer: innerServices
 *
 */
import _ from 'lodash';
import { fromJS } from 'immutable';
import getByKey from '@gsmlg/utils/getByKey';
import { procCollectionData } from '@gsmlg/utils/procData';

import * as constants from './constants';
import * as actions from './actions';

const { prefix } = constants;

export { constants, actions, prefix };

export const initialState = fromJS({
  data: {},
  list: {},
  selectedData: null,
});

const c = constants;

export const separator = '$';

export const reducer = (
  state = initialState,
  { type, payload, error, meta }
) => {
  switch (type) {
    case c.LOAD_INNER_SERVICES:
      return state;
    case c.LOAD_INNER_SERVICES_SUCCESS: {
      const { clusterID, namespaceID } = meta;
      const { data } = payload.response;
      const resData =
        data &&
        data.map((d, i) => ({
          ...d,
          name: `svc${separator}${i}${separator}${d.name}`,
          children:
            d.workloads &&
            d.workloads.map((w, ii) => ({
              ...w,
              name: `deploy${separator}${i}-${ii}${separator}${w.name}`,
              children:
                w.pods &&
                w.pods.map((p, iii) => ({
                  ...p,
                  name: `pod${separator}${i}-${ii}-${iii}${separator}${p.name}`,
                })),
            })),
        }));
      return state.setIn(['data', clusterID, namespaceID], fromJS(resData));
    }
    case c.LOAD_INNER_SERVICES_FAILURE:
      return state;

    default:
      return state;
  }
};

export default reducer;
