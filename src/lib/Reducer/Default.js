import update from 'immutability-helper';
import { has, set, get, defaultsDeep, cloneDeep } from 'lodash';

export default function Reducer({ action, defaultState = {} }) {
  const defaults = {
    requesting: false,
    pending: false,
    fulfilled: false,
    error: false,
    data: []
  };

  const ds = defaultsDeep({}, defaultState, defaults);

  function getDefaultState() {
    return cloneDeep(ds);
  }

  function onRequest(state) {
    const data = get(
      getDefaultState(),
      'data',
      []
    );

    return update(state, {
      requesting: { $set: true },
      fulfilled: { $set: false },
      error: { $set: false },
      data: { $set: data }
    });
  }

  function onPending(state) {
    return update(state, {
      pending: { $set: true },
      fulfilled: { $set: false },
      error: { $set: false }
    });
  }

  function onFulfilled(state, action) {
    const { payload } = action;

    return update(state, {
      requesting: { $set: false },
      pending: { $set: false },
      fulfilled: { $set: true },
      error: { $set: false },
      data: { $set: payload }
    });
  }

  function onRejected(state, action) {
    const { error } = action;

    const data = get(
      getDefaultState(),
      'data',
      []
    );

    return update(state, {
      requesting: { $set: false },
      pending: { $set: false },
      fulfilled: { $set: false },
      error: { $set: error },
      data: { $set: data }
    });
  }

  const methods = {
    default: (state) => state,
    [action.getConstant('request')]: onRequest,
    [action.getConstant('pending')]: onPending,
    [action.getConstant('fulfilled')]: onFulfilled,
    [action.getConstant('rejected')]: onRejected
  };

  function addMethod(key, func) {
    if (has(methods, key)) {
      throw new Error(`Action with key ${key} already registered!`);
    }

    set(methods, key, func);
  }

  function replaceMethod(key, func) {
    set(methods, key, func);
  }

  function getReducer() {
    return function reducer(state = ds, action) {
      const { type } = action;
      const method = get(methods, type, get(methods, 'default'));

      return method(state, action);
    };
  }

  return {
    addMethod,
    replaceMethod,
    getDefaultState,
    getReducer
  };
}
