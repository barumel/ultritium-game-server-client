import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Collapse, ListGroupItem } from 'reactstrap';
import cl from 'classnames';

import './item.css';

const icons = {
  running: 'color-green mdi mdi-server',
  stopped: 'color-black mdi mdi-server-off',
  error: 'color-red mdi mdi-alert-circle',
  starting: 'color-orange mdi mdi-cached'
}

function getIconClass(type) {
  return get(icons, type, '');
}

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
    const config = get(this, 'props.game.config', {})
    this.setState({ collapsed: !this.state.collapsed, config });
  }

  /**
   * Render method
   *
   * @return {ReactElement} markup
   */
  render() {
    const {
      game
    } = this.props;

    return(
      <ListGroupItem onClick={this.toggle} style={{ width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <div style={{ minWidth: '95%' }}>
            <h5>{get(game, 'name', 'Uhh da het äuä öper vergässä e Titu z erfassä...')}</h5>
          </div>
          <div style={{ alignSelf: 'baseline' }}>
            <span className={cl('server-list-item-status-icon', getIconClass(get(game, 'status')))} />
          </div>
        </div>

        <Collapse isOpen={!this.state.collapsed}>
          <div>
            {get(game, 'description', 'Hie chönt e Beschribig sta, weme enini erfasst hät...')}
          </div>
        </Collapse>
      </ListGroupItem>
    );
  }
}

ServerListItem.propTypes = {
  game: PropTypes.object.isRequired
};

ServerListItem.defaultProps = {

};

export default ServerListItem;
