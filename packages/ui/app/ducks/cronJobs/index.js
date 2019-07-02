/**
 *
 * CronJobs Duck
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
  cronJobs: {},
  list: [],
});

const c = constants;

export const cronJobsReducer = (
  state = initialState,
  { type, payload, error, meta }
) => {
  switch (type) {
    case c.LOAD_CRONJOBS:
      return state;
    case c.LOAD_CRONJOBS_SUCCESS: {
      const { clusterID, namespaceID } = meta;
      const { data, list } = procCollectionData(payload);
      return state
        .setIn(['cronJobs', clusterID, namespaceID], fromJS(data))
        .set('list', fromJS(list));
    }
    case c.LOAD_CRONJOBS_FAILURE:
      return state;

    case c.LOAD_CRONJOB:
      return state;
    case c.LOAD_CRONJOB_SUCCESS: {
      const { clusterID, namespaceID } = meta;
      const cronJob = payload.response;
      // temporary add, may remove when support cancel load data
      if (cronJob && cronJob.id) {
        return state.setIn(
          ['cronJobs', clusterID, namespaceID, cronJob.id],
          fromJS(cronJob)
        );
      }
      return state;
    }
    case c.LOAD_CRONJOB_FAILURE:
      return state;

    case c.CREATE_CRONJOB:
      return state;
    case c.CREATE_CRONJOB_SUCCESS: {
      const { clusterID, namespaceID } = meta;
      const data = payload.response;
      return state.setIn(
        ['cronJobs', clusterID, namespaceID, data.id],
        fromJS(data)
      );
    }

    case c.CREATE_CRONJOB_FAILURE:
      return state;

    case c.UPDATE_CRONJOB:
      return state;
    case c.UPDATE_CRONJOB_SUCCESS:
      return state;
    case c.UPDATE_CRONJOB_FAILURE:
      return state;

    case c.REMOVE_CRONJOB:
      return state;
    case c.REMOVE_CRONJOB_SUCCESS:
      return state
        .deleteIn(['cronJobs', meta.id])
        .update('list', (l) => l.filterNot((id) => id === meta.id));
    case c.REMOVE_CRONJOB_FAILURE:
      return state;

    case c.SCALE_CRONJOB:
      return state;
    case c.SCALE_CRONJOB_SUCCESS: {
      const { clusterID, namespaceID } = meta;
      const data = payload.response;
      return state.setIn(
        ['cronJobs', clusterID, namespaceID, data.id, 'replicas'],
        data.replicas
      );
    }
    case c.SCALE_CRONJOB_FAILURE:
      return state;

    default:
      return state;
  }
};

export default cronJobsReducer;
