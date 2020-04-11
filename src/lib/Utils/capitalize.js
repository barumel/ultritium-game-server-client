import { isString } from 'lodash';

export default function capitalize(s) {
  if (!isString(s)) return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}
