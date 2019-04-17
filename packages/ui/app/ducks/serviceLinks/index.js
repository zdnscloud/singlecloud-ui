/**
 *
 * Service Links Duck
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
  outerServices: {},
  innerServices: {},
});

const c = constants;

export const serviceLinksReducer = (
  state = initialState,
  { type, payload, error, meta }
) => {
  switch (type) {
    case c.LOAD_OUTER_SERVICES:
      return state;
    case c.LOAD_OUTER_SERVICES_SUCCESS: {
      const { clusterID, namespaceID } = meta;
      const { data } = payload.response;
      const resData = data && data.map((d) => {
        const name = d.port === 0 ? `http$${d.domain}` : `udp$${d.port}`;
        const services = {};
        _.each(d.services, (s, p) => {
          services[p] = s;
        });

        return {
          ...d,
          name,
          services,
        };
      });
      return state.setIn(['outerServices', clusterID, namespaceID], fromJS(data));
    }
    case c.LOAD_OUTER_SERVICES_FAILURE:
      return state;

    case c.LOAD_INNER_SERVICES:
      return state;
    case c.LOAD_INNER_SERVICES_SUCCESS: {
      const { clusterID, namespaceID } = meta;
      const { data } = payload.response;
      const resData = data && data.map((d) => ({
        ...d,
        name: `svc$${d.name}`,
        workloads: d.workloads && d.workloads.map((w) => ({
          ...w,
          name: `deploy$${w.name}`,
          pods: w.pods && w.pods.map((p) => ({
            ...p,
            name: `pod$${p.name}`,
          })),
        })),
      }));
      return state.setIn(['innerServices', clusterID, namespaceID], fromJS(resData));
    }
    case c.LOAD_INNER_SERVICES_FAILURE:
      return state;

    default:
      return state;
  }
};

export default serviceLinksReducer;
