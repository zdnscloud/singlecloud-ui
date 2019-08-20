---
to: <%= h.src() %>/app/ducks/<%= name %>/index.js
---
<%
  pname = h.inflection.pluralize(name);
  PN = h.inflection.underscore(pname).toUpperCase();
  cpname = h.inflection.camelize(pname);

  sname = h.inflection.singularize(name);
  SN = h.inflection.underscore(sname).toUpperCase();
  csname = h.inflection.camelize(sname);

  if (hasParents) {
    pt = parents[parents.length - 1];
    sp = h.inflection.singularize(pt);
    csp = h.inflection.camelize(sp);
    spList = parents.map((p) => h.inflection.singularize(p));
    spIDs = spList.map((p) => `${p}ID`).join(', ');
  }
%>/**
 * Duck: <%= h.inflection.titleize(name) %>
 * reducer: <%= name %>
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
  list: <%= hasParents ? '{}' : '[]' %>,
  selectedData: null,
});

const c = constants;

export const reducer = (
  state = initialState,
  { type, payload, error, meta }
) => {
  switch (type) {
    case c.LOAD_<%= PN %>:
      return state;
    case c.LOAD_<%= PN %>_SUCCESS: {
      const { data, list } = procCollectionData(payload);
      <%if (hasParents) { %>const {
        <%= spIDs %>,
      } = meta;<% } %>
      return state
        .setIn(['data'<%if (hasParents) { %>, <%= spIDs %><% } %>], fromJS(data))
        .setIn(['list'<%if (hasParents) { %>, <%= spIDs %><% } %>], fromJS(list));
    }
    case c.LOAD_<%= PN %>_FAILURE:
      return state;

<% if (wannaCreateAction) {%>
    case c.CREATE_<%= SN %>:
      return state;
    case c.CREATE_<%= SN %>_SUCCESS: {
      const data = payload.response;
      <%if (hasParents) { %>const {
        <%= spIDs %>,
      } = meta;<% } %>
      return state.setIn(['data'<%if (hasParents) { %>, <%= spIDs %><% } %>, data.id], fromJS(data));
    }
    case c.CREATE_<%= SN %>_FAILURE:
      return state;
<% }
if (wannaUpdateAction) {%>
    case c.UPDATE_<%= SN %>:
      return state;
    case c.UPDATE_<%= SN %>_SUCCESS: {
      const id = getByKey(payload, ['response', 'id']);
      const data = getByKey(payload, ['response']);
      <%if (hasParents) { %>const {
        <%= spIDs %>,
      } = meta;<% } %>
      if (id) {
        return state.setIn(['data'<%if (hasParents) { %>, <%= spIDs %><% } %>, id], fromJS(data));
      }
      return state;
    }
    case c.UPDATE_<%= SN %>_FAILURE:
      return state;
<% }
if (wannaReadOneAction) {%>
    case c.READ_<%= SN %>:
      return state;
    case c.READ_<%= SN %>_SUCCESS: {
      const id = getByKey(payload, ['response', 'id']);
      const data = getByKey(payload, ['response']);
      <%if (hasParents) { %>const {
        <%= spIDs %>,
      } = meta;<% } %>
      if (id) {
        return state.setIn(['data'<%if (hasParents) { %>, <%= spIDs %><% } %>, id], fromJS(data));
      }
      return state;
    }
    case c.READ_<%= SN %>_FAILURE:
      return state;
<% }
if (wannaRemoveAction) {%>
    case c.REMOVE_<%= SN %>:
      return state;
    case c.REMOVE_<%= SN %>_SUCCESS: {
      const { id } = meta;
      <%if (hasParents) { %>const {
        <%= spIDs %>,
      } = meta;<% } %>
      return state
        .removeIn(['data'<%if (hasParents) { %>, <%= spIDs %><% } %>, id])
        .updateIn(['list'<%if (hasParents) { %>, <%= spIDs %><% } %>], (l) => l.filterNot((i) => i === id));
    }
    case c.REMOVE_<%= SN %>_FAILURE:
      return state;
<% } %>
    default:
      return state;
  }
};

export default reducer;
