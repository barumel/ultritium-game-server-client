import { get } from 'lodash';

export default function Redirect({ history, action }) {
  const path = get(action, 'action.path', '/');
  return history.push(path)
}
