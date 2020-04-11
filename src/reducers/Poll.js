import update from 'immutability-helper';
import { get } from 'lodash';

import * as action from '../actions/Poll';

const {
  POLL_REQUEST,
  POLL_START,
  POLL_DATA,
  POLL_END,
  POLL_REJECTED
} = action;

function Request({ identifier }) {
  return {
    identifier,
    started: false,
    ended: false,
    data: undefined,
    error: undefined
  };
}

const defaultState = {
  requests: {}
};

const methods = {
  default: (state) => state
};

methods[POLL_REQUEST] = (state, action) => {
  const { identifier } = action;

  return update(state, {
    requests: {
      [identifier]: { $set: Request({ identifier }) }
    }
  });
};

methods[POLL_START] = (state, action) => {
  const { identifier } = action;

  return update(state, {
    requests: {
      [identifier]: {
        started: { $set: true },
        ended: { $set: false },
        error: { $set: undefined },
        data: { $set: undefined }
      }
    }
  });
};

methods[POLL_END] = (state, action) => {
  const { identifier, error } = action;

  return update(state, {
    requests: {
      [identifier]: {
        ended: { $set: true },
        error: { $set: error }
      }
    }
  });
};

methods[POLL_DATA] = (state, action) => {
  const { identifier, payload } = action;

  return update(state, {
    requests: {
      [identifier]: {
        data: { $set: payload }
      }
    }
  });
};

methods[POLL_REJECTED] = (state, action) => {
  const { identifier, error } = action;

  return update(state, {
    requests: {
      [identifier]: {
        ended: { $set: true },
        error: { $set: error }
      }
    }
  });
};

export default function reducer(state = defaultState, action) {
  const { type } = action;
  const method = get(methods, type, get(methods, 'default'));

  return method(state, action);
}
