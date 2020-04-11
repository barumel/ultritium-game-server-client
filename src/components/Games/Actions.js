import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { noop, get } from 'lodash';
import { FormattedMessage } from 'react-intl';
import cl from 'classnames';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import './actions.css';

const Start = React.memo(({ onClick, disabled }) => {
  return (
    <React.Fragment>
      <span
        className={cl(
          'game-list-item-action-icon',
          'color-green',
          'mdi',
          'mdi-play-circle-outline',
          { 'icon-disabled': disabled }
        )}
        onClick={disabled ? noop : onClick}
      />

      <span
        className="game-list-item-action-title"
      >
        <FormattedMessage id="Game.Actions.Start" />
      </span>
    </React.Fragment>
  );
});

const Stop = React.memo(({ onClick, disabled }) => {
  return (
    <React.Fragment>
      <span
        className={cl(
          'game-list-item-action-icon',
          'color-red',
          'mdi',
          'mdi-stop-circle-outline',
          { 'icon-disabled': disabled }
        )}
        onClick={disabled ? noop : onClick}
      />

      <span
        className="game-list-item-action-title"
      >
        <FormattedMessage id="Game.Actions.Stop" />
      </span>
    </React.Fragment>
  );
});

const Restart = React.memo(({ onClick, disabled }) => {
  return (
    <React.Fragment>
      <span
        className={cl(
          'game-list-item-action-icon',
          'color-orange',
          'mdi',
          'mdi-cached',
          { 'icon-disabled': disabled }
        )}
        onClick={disabled ? noop : onClick}
      />

      <span
        className="game-list-item-action-title"
      >
        <FormattedMessage id="Game.Actions.Restart" />
      </span>
    </React.Fragment>
  );
});

class Actions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle(ev) {
    const { isOpen } = this.state;
    ev.preventDefault();
    ev.stopPropagation();
    console.log('TOGLG');
    this.setState({ isOpen: !isOpen });
  }

  render() {
    const { isOpen } = this.state;
    const {
      game,
      status,
      onStart,
      onStop,
      onRestart
    } = this.props;

    const statusCode = get(status, 'status');
    const canStart = statusCode !== 'running' && statusCode !== 'starting';
    const canStop = statusCode !== 'stopped' && statusCode !== 'error' && statusCode !== 'starting';
    const canRestart = statusCode === 'running' && statusCode !== 'starting';

    return (
      <div className="game-list-item-actions">
        <Dropdown isOpen={isOpen} toggle={this.toggle}>
          <DropdownToggle
            caret
            className="game-list-item-actions-dropdown-toggle"
            color="link"
          />
          <DropdownMenu right>
            <DropdownItem header>
              <FormattedMessage id="Game.Actions.Title" />
            </DropdownItem>
            <DropdownItem disabled={!canStart}>
              <Start onClick={() => onStart(game)} disabled={!canStart} />
            </DropdownItem>
            <DropdownItem disabled={!canStop}>
              <Stop onClick={() => onStop(game)} disabled={!canStop} />
            </DropdownItem>
            <DropdownItem disable={!canRestart}>
              <Restart onClick={() => onRestart(game)} disable={!canRestart} />
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

Actions.propTypes = {
  game: PropTypes.object.isRequired,
  status: PropTypes.object,
  onStart: PropTypes.func,
  onStop: PropTypes.func,
  onRestart: PropTypes.func
};

Actions.defaultProps = {
  status: {},
  onStop: noop,
  onStart: noop,
  onRestart: noop
};

export default Actions;
