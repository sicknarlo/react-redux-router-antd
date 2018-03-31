import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import players from './players.reducer';

export default combineReducers({
  router: routerReducer,
  players,
});
