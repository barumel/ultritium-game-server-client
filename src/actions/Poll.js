export const POLL_REQUEST = 'POLL_REQUEST';
export const POLL_START = 'POLL_START';
export const POLL_DATA = 'POLL_DATA';
export const POLL_END = 'POLL_END';
export const POLL_CANCEL = 'POLL_CANCEL';
export const POLL_REJECTED = 'POLL_REJECTED';

export function request(props) {
  return { type: POLL_REQUEST, ...props };
}

export function cancel(props) {
  return { type: POLL_CANCEL, props };
}
