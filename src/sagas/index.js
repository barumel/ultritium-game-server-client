import { all } from 'redux-saga/effects';

import gamesSagas from './Games';

export default function* rootSaga() {
  yield all([
    gamesSagas()
  ]);
}
