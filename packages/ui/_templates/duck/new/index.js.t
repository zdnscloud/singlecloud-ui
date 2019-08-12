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
  list: [],
  selectedData: '',
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
      return state.set('data', fromJS(data)).set('list', fromJS(list));
    }
    case c.LOAD_<%= PN %>_FAILURE:
      return state;

<% if (wannaCreateAction) {%>
    case c.CREATE_<%= SN %>:
      return state;
    case c.CREATE_<%= SN %>_SUCCESS: {
      const data = payload.response;
      return state.setIn(['data', data.id], fromJS(data));
    }
    case c.CREATE_<%= SN %>_FAILURE:
      return state;
<% }
if (wannaUpdateAction) {%>
    case c.UPDATE_<%= SN %>:
      return state;
    case c.UPDATE_<%= SN %>_SUCCESS: {
      const id = getByKey(payload, ['reponse', 'id']);
      const data = getByKey(payload, ['reponse']);
      if (id) {
        return state.setIn(['data', id], fromJS(data));
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
      const id = getByKey(payload, ['reponse', 'id']);
      const data = getByKey(payload, ['reponse']);
      if (id) {
        return state.setIn(['data', id], fromJS(data));
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
      return state
        .removeIn(['data', id])
        .update('list', (l) => l.filterNot((i) => i === id));
    }
    case c.REMOVE_<%= SN %>_FAILURE:
      return state;
<% } %>
    default:
      return state;
  }
};

export default reducer;
