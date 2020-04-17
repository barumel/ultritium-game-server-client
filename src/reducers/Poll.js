import update from 'immutability-helper';
import { get } from 'lodash';

import * as action from '../actions/Poll';
import gameStartAction from '../actions/Game/Start';
import gameRestartAction from '../actions/Game/Restart';
import gameStopAction from '../actions/Game/Stop';

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

methods[gameStartAction.getConstant('fulfilled')] = (state, action) => {
  const { requests } = state;
  const identifier = get(action, 'game.identifier');
  let updated = state;

  // if we're polling the game status at the moment, set the status of the given game to "starting"
  const status = get(requests, 'gamestatus.data', []);
  status.forEach((s, index) => {
    if (get(s, 'identifier') === identifier) {
      updated = update(state, {
        requests: {
          gamestatus: {
            data: {
              [index]: {
                status: { $set: 'starting' }
              }
            }
          }
        }
      });
    }
  });

  return updated;
};

methods[gameRestartAction.getConstant('fulfilled')] = (state, action) => {
  const { requests } = state;
  const identifier = get(action, 'game.identifier');
  let updated = state;

  // if we're polling the game status at the moment, set the status of the given game to "starting"
  const status = get(requests, 'gamestatus.data', []);
  status.forEach((s, index) => {
    if (get(s, 'identifier') === identifier) {
      updated = update(state, {
        requests: {
          gamestatus: {
            data: {
              [index]: {
                status: { $set: 'restarting' }
              }
            }
          }
        }
      });
    }
  });

  return updated;
};

methods[gameStopAction.getConstant('fulfilled')] = (state, action) => {
  const { requests } = state;
  const identifier = get(action, 'game.identifier');
  let updated = state;

  // if we're polling the game status at the moment, set the status of the given game to "stopping"
  const status = get(requests, 'gamestatus.data', []);
  status.forEach((s, index) => {
    if (get(s, 'identifier') === identifier) {
      updated = update(state, {
        requests: {
          gamestatus: {
            data: {
              [index]: {
                status: { $set: 'stopping' }
              }
            }
          }
        }
      });
    }
  });

  return updated;
};

export default function reducer(state = defaultState, action) {
  const { type } = action;
  const method = get(methods, type, get(methods, 'default'));

  return method(state, action);
}
