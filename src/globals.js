import { isUndefined } from 'lodash';

import KeyboardConfiguration from './lib/Keyboard/Configuration';

let keybaordConfiguration;

export function getKeyboardConfiguration() {
  if (isUndefined(keybaordConfiguration)) keybaordConfiguration = KeyboardConfiguration();

  return keybaordConfiguration;
}
