import { createSelector } from 'reselect';
import {
  createMatchSelector,
  getLocation,
} from 'connected-react-router/immutable';
import { makeSelectClusterID, makeSelectNodeID } from 'ducks/app/selectors';
import { prefix } from './constants';

/**
 * Direct selector to the nodes duck
 */
export const selectNodesDomain = (state) => state.get(prefix);

/**
 * Other specific selectors
 */
export const makeSelectNodes = () =>
  createSelector(
    selectNodesDomain,
    makeSelectClusterID(),
    (substate, clusterID) => substate.getIn(['nodes', clusterID]) || substate.clear()
  );

export const makeSelectNodesList = () =>
  createSelector(
    selectNodesDomain,
    makeSelectNodes(),
    (substate, nodes) =>
      substate.get('list').map((id) => nodes.get(id))
  );

export const makeSelectCurrentNodeID = () =>
  createSelector(
    selectNodesDomain,
    makeSelectClusterID(),
    makeSelectNodeID(),
    makeSelectNodesList(),
    (substate, clusterID, nid, ns) =>
      substate.getIn(['selectedNode', clusterID]) || nid || ns.getIn([0, 'id'])
  );

export const makeSelectCurrentNode = () =>
  createSelector(
    selectNodesDomain,
    makeSelectClusterID(),
    makeSelectCurrentNodeID(),
    (substate, clusterID, nid) =>
      substate.getIn(['nodes', clusterID, nid]) || substate.clear()
  );


/**
 * Default selector used by Nodes
 */
export default makeSelectNodes;
