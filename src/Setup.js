import { throttle } from 'lodash';
import 'moment/locale/de-ch';
import 'moment/locale/fr-ch';

import { configureStore } from './Store';
import rootReducer from './reducers';
import sagas from './sagas';
import { saveState } from './LocalStorage';
import { getKeyboardConfiguration } from './globals';

/*
Configure store and subscribe persist
 */
const store = configureStore(rootReducer, sagas);
// persist parts of the state to the local storage
// because this is expensiv, we do it only once per second
store.subscribe(throttle(() => {
  // add sub-parts of the state here to persist them over reloads
  saveState({
    environment: store.getState().environment,
    user: store.getState().user
  }, localStorage);
}, 1000));

/*
Configure keyboard configuration§
 */
const keyboard = getKeyboardConfiguration();
keyboard.registerGlobalCommands({
  'f': { func: (ev) => alert('GLOBAL F'), description: 'Alert "GLOBAL F"' },
  'g': { func: ev => alert('GLOBAL G'), description: 'ALERT "GLOBAL G"'}
});
