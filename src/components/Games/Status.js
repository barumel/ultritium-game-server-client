import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import cl from 'classnames';
import moment from 'moment';

import './status.css';

const Error = React.memo(({ status }) => {
  const message = get(status, 'Error');

  return (
    <span
      className={cl(
        'game-list-item-status-icon',
        'color-red',
        'mdi',
        'mdi-alert-circle'
      )}
      title={message}
    />
  );
});

const Running = React.memo(({ status }) => {
  const started = get(status, 'StartedAt');

  return (
    <span
      className={cl(
        'game-list-item-status-icon',
        'color-green',
        'mdi',
        'mdi-server'
      )}
      title={moment(started).format('DD.MM.YYYY HH:MM:SS')}
    />
  );
});

const Stopped = React.memo(({ status }) => {
  const stopped = get(status, 'FinishedAt');

  return (
    <span
      className={cl(
        'game-list-item-status-icon',
        'color-black',
        'mdi',
        'mdi-server-off'
      )}
      title={moment(stopped).format('DD.MM.YYYY HH:MM:SS')}
    />
  );
});

const Starting = React.memo(({ status }) => {
  const started = get(status, 'StartedAt');

  return (
    <span
      className={cl(
        'game-list-item-status-icon',
        'color-orange',
        'mdi',
        'mdi-cached'
      )}
      title={moment(started).format('L')}
    />
  );
});

const icons = {
  stopped: Stopped,
  running: Running,
  error: Error,
  starting: Starting
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
    <div className="game-list-item-status-icon">
      <Icon status={status} />
    </div>
  );
});

Status.propTypes = {
  status: PropTypes.object
};

Status.defaultProps = {
  status: {}
};

export default Status;
