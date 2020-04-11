import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { get } from 'lodash';

import action from '../../actions/Game/Stop';

export default function* stopGame(request) {
  const { id } = request;

  yield put({ type: action.getConstant('pending') });

  try {
    const url = `/game/stop/${id}`;
    const result = yield call(axios, {
      url,
      method: 'get'
    });

    const payload = get(result, 'data', []);

    yield put({
      type: action.getConstant('fulfilled'),
      payload
    });

    return payload;
  } catch (error) {
    yield put({
      type: action.getConstant('rejected'),
      error
    });

    return error;
  }
}
