import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { push } from 'connected-react-router';
import { getLocation } from 'connected-react-router/immutable';

export const usePush = () => {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(push, dispatch), [dispatch]);
};

export const useLocation = () => useSelector(getLocation, shallowEqual);
