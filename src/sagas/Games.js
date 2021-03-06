import { takeLatest, takeEvery } from 'redux-saga/effects';

import gamesAction from '../actions/Game/Games';
import startGameAction from '../actions/Game/Start';
import restartGameAction from '../actions/Game/Restart';
import stopGameActions from '../actions/Game/Stop';

import getGames from './Game/getGames';
import startGame from './Game/startGame';
import restartGame from './Game/restartGame';
import stopGame from './Game/stopGame';

export default function* root() {
  yield takeLatest(gamesAction.getConstant('request'), getGames);
  yield takeEvery(startGameAction.getConstant('request'), startGame);
  yield takeEvery(stopGameActions.getConstant('request'), stopGame);
  yield takeEvery(restartGameAction.getConstant('request'), restartGame);
}
