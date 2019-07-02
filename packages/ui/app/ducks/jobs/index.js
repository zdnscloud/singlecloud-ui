/**
 *
 * Jobs Duck
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
  jobs: {},
  list: [],
});

const c = constants;

export const jobsReducer = (
  state = initialState,
  { type, payload, error, meta }
) => {
  switch (type) {
    case c.LOAD_JOBS:
      return state;
    case c.LOAD_JOBS_SUCCESS: {
      const { clusterID, namespaceID } = meta;
      const { data, list } = procCollectionData(payload);
      return state
        .setIn(['jobs', clusterID, namespaceID], fromJS(data))
        .set('list', fromJS(list));
    }
    case c.LOAD_JOBS_FAILURE:
      return state;

    case c.LOAD_JOB:
      return state;
    case c.LOAD_JOB_SUCCESS: {
      const { clusterID, namespaceID } = meta;
      const job = payload.response;
      // temporary add, may remove when support cancel load data
      if (job && job.id) {
        return state.setIn(
          ['jobs', clusterID, namespaceID, job.id],
          fromJS(job)
        );
      }
      return state;
    }
    case c.LOAD_JOB_FAILURE:
      return state;

    case c.CREATE_JOB:
      return state;
    case c.CREATE_JOB_SUCCESS: {
      const { clusterID, namespaceID } = meta;
      const data = payload.response;
      return state.setIn(
        ['jobs', clusterID, namespaceID, data.id],
        fromJS(data)
      );
    }

    case c.CREATE_JOB_FAILURE:
      return state;

    case c.UPDATE_JOB:
      return state;
    case c.UPDATE_JOB_SUCCESS:
      return state;
    case c.UPDATE_JOB_FAILURE:
      return state;

    case c.REMOVE_JOB:
      return state;
    case c.REMOVE_JOB_SUCCESS:
      return state
        .deleteIn(['jobs', meta.id])
        .update('list', (l) => l.filterNot((id) => id === meta.id));
    case c.REMOVE_JOB_FAILURE:
      return state;

    case c.SCALE_JOB:
      return state;
    case c.SCALE_JOB_SUCCESS: {
      const { clusterID, namespaceID } = meta;
      const data = payload.response;
      return state.setIn(
        ['jobs', clusterID, namespaceID, data.id, 'replicas'],
        data.replicas
      );
    }
    case c.SCALE_JOB_FAILURE:
      return state;

    default:
      return state;
  }
};

export default jobsReducer;
