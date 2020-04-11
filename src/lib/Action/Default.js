import { get } from 'lodash';

export default function Action({ prefix }) {
  const constants = {
    request: `${prefix.toUpperCase()}_REQUEST`,
    pending: `${prefix.toUpperCase()}_PENDING`,
    fulfilled: `${prefix.toUpperCase()}_FULFILLED`,
    rejected: `${prefix.toUpperCase()}_REJECTED`
  };

  function request(props) {
    return { type: `${prefix.toUpperCase()}_REQUEST`, ...props };
  }

  function pending(props) {
    return { type: `${prefix.toUpperCase()}_PENDING`, ...props };
  }

  function fulfilled(props) {
    return { type: `${prefix.toUpperCase()}_FULFILLED`, ...props };
  }

  function rejected(props) {
    return { type: `${prefix.toUpperCase()}_REJECTED`, ...props };
  }

  function getConstant(type) {
    return get(constants, type);
  }

  return Object.freeze({
    ...Object.keys(constants),
    request,
    pending,
    fulfilled,
    rejected,
    getConstant
  });
}
