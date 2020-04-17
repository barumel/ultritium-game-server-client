import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import cl from 'classnames';
import moment from 'moment';
import PacmanLoader from 'react-spinners/PacmanLoader';

import './status.css';

const Error = React.memo(({ status }) => {
  const message = get(status, 'Error');

  return (
    <div
      className={cl(
        'color-red',
        'game-list-item-status-icon',
      )}
      title={message}
    >
      <span className="mdi mdi-alert-circle" />
    </div>
  );
});

const Running = React.memo(({ status }) => {
  const started = get(status, 'StartedAt');

  return (
    <div
      className={cl(
        'color-green',
        'game-list-item-status-icon',
      )}
      title={moment(started).format('DD.MM.YYYY HH:MM:SS')}
    >
      <span className="mdi mdi-server" />
    </div>
  );
});

const Stopped = React.memo(({ status }) => {
  const stopped = get(status, 'FinishedAt');

  return (
    <div
      className={cl(
        'color-black',
        'game-list-item-status-icon',
      )}
      title={moment(stopped).format('DD.MM.YYYY HH:MM:SS')}
    >
      <span className="mdi mdi-server-off" />
    </div>
  );
});

const Pending = React.memo(({ status }) => {
  const started = get(status, 'StartedAt');

  return (
    <div
      className={cl(
        'game-list-item-status-pacman',
        'color-orange'
      )}
      title={moment(started).format('L')}
    >
      <PacmanLoader size={12} color="orange" />
    </div>
  );
});

const icons = {
  stopped: Stopped,
  running: Running,
  error: Error,
  starting: Pending,
  stopping: Pending,
  restarting: Pending
};

function getIcon(status) {
  return get(
    icons,
    get(status, 'status'),
    get(icons, 'stopped')
  );
}

const Status = React.memo(({ status }) => {
  const Icon = getIcon(status);

  return (
    <Icon status={status} />
  );
});

Status.propTypes = {
  status: PropTypes.object
};

Status.defaultProps = {
  status: {}
};

export default Status;
