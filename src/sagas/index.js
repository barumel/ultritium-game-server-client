import { all } from 'redux-saga/effects';

import gamesSagas from './Games';
import pollSagas from './Poll';

export default function* rootSaga() {
  yield all([
    gamesSagas(),
    pollSagas()
  ]);
}
