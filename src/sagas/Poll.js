import { call, put, takeEvery, cancel, delay } from 'redux-saga/effects';
import axios from 'axios';
import { get, set, isUndefined } from 'lodash';

import * as action from '../actions/Poll';

export const POLL_END_REASON_MAX_TRIES = 'POLL_END_REASON_MAX_TRIES';
export const POLL_END_REASON_CANCEL_ACTION = 'POLL_END_REASON_CANCEL_ACTION';

const {
  POLL_REQUEST,
  POLL_START,
  POLL_DATA,
  POLL_END,
  POLL_REJECTED,
  POLL_CANCEL
} = action;

const workers = {};

export function PollWorker({
  identifier,
  url,
  interval = 5000,
  maxTries = undefined,
}) {
  let tries = 0;
  let ended = false;

  function* start() {
    yield put({ type: POLL_START, identifier });

    while (!ended) {
      try {
        const result = yield call(axios, { url });
        const payload = get(result, 'data');

        yield put({ type: POLL_DATA, identifier, payload });

        if (!isUndefined(maxTries) && tries > maxTries) {
          yield put({ type: POLL_END, identifier, payload: { reason: POLL_END_REASON_MAX_TRIES } });
          yield cancel();
          return;
        }

        tries += 1;
        yield delay(interval);
      } catch (error) {
        yield put({ type: POLL_REJECTED, identifier, error });
      }
    }
  }

  function* end() {
    ended = true;

    yield put({ type: POLL_END, identifier, payload: { reason: POLL_END_REASON_CANCEL_ACTION } });

    yield cancel();
  }

  return {
    start,
    end
  };
}

function createPollWorker(request) {
  const { identifier } = request;

  const worker = PollWorker(request);
  set(workers, identifier, worker);

  return worker;
}

function* cancelPollWorker(request) {
  const { identifier } = request;
  const worker = get(workers, identifier);

  if (worker) {
    yield call(worker.stop());
    delete workers[identifier];
  }
}

function* startPollWorker(request) {
  const worker = createPollWorker(request);

  yield call(worker.start);
}

export default function* root() {
  yield takeEvery(POLL_REQUEST, startPollWorker);
  yield takeEvery(POLL_CANCEL, cancelPollWorker);
}
