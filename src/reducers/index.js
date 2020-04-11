import { combineReducers } from 'redux';

import gamesReducer from './Game/Games';
import pollReducer from './Poll';

export default combineReducers({
  games: gamesReducer,
  poll: pollReducer
});
