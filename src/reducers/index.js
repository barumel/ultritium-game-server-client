import { combineReducers } from 'redux';

import gamesReducer from './Game/Games';

export default combineReducers({
  games: gamesReducer
});
