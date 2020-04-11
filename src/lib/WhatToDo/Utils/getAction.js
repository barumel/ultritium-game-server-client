import { get, noop } from 'lodash';

import * as actions from '../Actions/index';
import { capitalize } from '../../Utils/index';

export default function getAction(action) {
  let type = get(action, 'action.type', '');
  type = capitalize(type.toLowerCase());

  const func = get(actions, type, noop);

  return func;
}
