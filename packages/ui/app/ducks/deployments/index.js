/**
 *
 * Deployments Duck
 *
 */
import { fromJS } from 'immutable';
import getByKey from '@gsmlg/utils/getByKey';
import { procCollectionData } from '@gsmlg/utils/procData';

import * as constants from './constants';
import * as actions from './actions';

const { prefix } = constants;

export { constants, actions, prefix };

export const initialState = fromJS({
  deployments: {},
  list: [],
});

const c = constants;

export const deploymentsReducer = (
  state = initialState,
  { type, payload, error, meta }
) => {
  switch (type) {
    case c.LOAD_DEPLOYMENTS:
      return state;
    case c.LOAD_DEPLOYMENTS_SUCCESS: {
      const { clusterID, namespaceID } = meta;
      const { data, list } = procCollectionData(payload);
      return state
        .setIn(['deployments', clusterID, namespaceID], fromJS(data))
        .set('list', fromJS(list));
    }
    case c.LOAD_DEPLOYMENTS_FAILURE:
      return state;

    case c.LOAD_DEPLOYMENT:
      return state;
    case c.LOAD_DEPLOYMENT_SUCCESS: {
      const { clusterID, namespaceID } = meta;
      const deployment = payload.response;
      return state.setIn(['deployments', clusterID, namespaceID, deployment.id], fromJS(deployment));
    }
    case c.LOAD_DEPLOYMENT_FAILURE:
      return state;

    case c.CREATE_DEPLOYMENT:
      return state;
    case c.CREATE_DEPLOYMENT_SUCCESS: {
      const { clusterID, namespaceID } = meta;
      const data = payload.response;
      return state.setIn(['deployments', clusterID, namespaceID, data.id], fromJS(data));
    }

    case c.CREATE_DEPLOYMENT_FAILURE:
      return state;

    case c.UPDATE_DEPLOYMENT:
      return state;
    case c.UPDATE_DEPLOYMENT_SUCCESS:
      return state;
    case c.UPDATE_DEPLOYMENT_FAILURE:
      return state;

    case c.REMOVE_DEPLOYMENT:
      return state;
    case c.REMOVE_DEPLOYMENT_SUCCESS:
      return state
        .deleteIn(['deployments', meta.id])
        .update('list', (l) => l.filterNot((id) => id === meta.id));
    case c.REMOVE_DEPLOYMENT_FAILURE:
      return state;

    case c.SCALE_DEPLOYMENT:
      return state;
    case c.SCALE_DEPLOYMENT_SUCCESS: {
      const { clusterID, namespaceID } = meta;
      const data = payload.response;
      return state.setIn([
        'deployments',
        clusterID,
        namespaceID,
        data.id,
        'replicas',
      ], data.replicas);
    }
    case c.SCALE_DEPLOYMENT_FAILURE:
      return state;

    default:
      return state;
  }
};

export default deploymentsReducer;
