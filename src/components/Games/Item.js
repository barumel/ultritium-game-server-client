import React from 'react';
import PropTypes from 'prop-types';
import { get, noop } from 'lodash';
import { Collapse, ListGroupItem } from 'reactstrap';

import './item.css';

import Status from './Status';
import Actions from './Actions';

class GameListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: true
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const { collapsed } = this.state;

    this.setState({ collapsed: !collapsed });
  }

  /**
   * Render method
   *
   * @return {ReactElement} markup
   */
  render() {
    const { collapsed } = this.state;
    const {
      game,
      status,
      onStart,
      onStop,
      onRestart
    } = this.props;

    return (
      <ListGroupItem onClick={this.toggle} style={{ width: '100%' }}>
        <div className="game-list-item">
          <div className="game-list-item-left">
            <h5>{get(game, 'name', 'Uhh da het äuä öper vergässä e Titu z erfassä...')}</h5>
          </div>

          <div className="game-list-item-right">
            <div className="game-list-item-right-status">
              <Status status={status} />
            </div>

            <div>
              <Actions
                game={game}
                status={status}
                onStart={onStart}
                onStop={onStop}
                onRestart={onRestart}
              />
            </div>
          </div>
        </div>

        <Collapse isOpen={!collapsed}>
          <div>
            {get(game, 'description', 'Hie chönt e Beschribig sta, weme enini erfasst hät...')}
          </div>
        </Collapse>
      </ListGroupItem>
    );
  }
}

GameListItem.propTypes = {
  game: PropTypes.object.isRequired,
  status: PropTypes.object,
  onStart: PropTypes.func,
  onStop: PropTypes.func,
  onRestart: PropTypes.func
};

GameListItem.defaultProps = {
  status: {},
  onStop: noop,
  onStart: noop,
  onRestart: noop
};

export default GameListItem;
