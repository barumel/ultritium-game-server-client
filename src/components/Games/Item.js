import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Collapse, ListGroupItem } from 'reactstrap';
import cl from 'classnames';

import './item.css';

import Status from './Status';

class ServerListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: true,
      config: get(props, 'game.config', {})
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const { collapsed } = this.state;
    const config = get(this, 'props.game.config', {})

    this.setState({ collapsed: !collapsed, config });
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
      status
    } = this.props;

    return (
      <ListGroupItem onClick={this.toggle} style={{ width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <div style={{ minWidth: '95%' }}>
            <h5>{get(game, 'name', 'Uhh da het äuä öper vergässä e Titu z erfassä...')}</h5>
          </div>
          <div style={{ alignSelf: 'baseline' }}>
            <Status status={get(status, 'status')} />
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

ServerListItem.propTypes = {
  game: PropTypes.object.isRequired,
  status: PropTypes.object
};

ServerListItem.defaultProps = {
  status: {}
};

export default ServerListItem;
