/**
 * Duck: OuterServices
 * reducer: outerServices
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
    case c.LOAD_OUTER_SERVICES:
      return state;
    case c.LOAD_OUTER_SERVICES_SUCCESS: {
      const { clusterID, namespaceID } = meta;
      const data = getByKey(payload, ['response', 'data']) || [];
      const resData =
        data &&
        data.map((d, i) => {
          const name = `ep${separator}${i}${separator}${d.entryPoint}`;
          const paths = [];
          let ii = 0;
          _.each(d.services, (s, p) => {
            paths.push({
              name: `path${separator}${i}-${ii}${separator}${p}`,
              children: [
                {
                  ...s,
                  name: `svc${separator}${i}-${ii}${separator}${s.name}`,
                  children:
                    s.workloads &&
                    s.workloads.map((w, iii) => ({
                      ...w,
                      name: `deploy${separator}${i}-${ii}-${iii}${separator}${w.name}`,
                      children:
                        w.pods &&
                        w.pods.map((pp, iiii) => ({
                          ...pp,
                          name: `pod${separator}${i}-${ii}-${iii}-${iiii}${separator}${pp.name}`,
                        })),
                    })),
                },
              ],
            });
            ii += 1;
          });

          return { ...d, name, children: paths };
        });
      return state.setIn(['data', clusterID, namespaceID], fromJS(resData));
    }
    case c.LOAD_OUTER_SERVICES_FAILURE:
      return state;

    default:
      return state;
  }
};

export default reducer;
