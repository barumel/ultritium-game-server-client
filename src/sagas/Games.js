import { takeLatest } from 'redux-saga/effects';

import gamesAction from '../actions/Game/Games';

import getGames from './Game/getGames';

export default function* root() {
  yield takeLatest(gamesAction.getConstant('request'), getGames);
}
