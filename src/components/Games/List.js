import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'reactstrap';
import { get, noop } from 'lodash';

import GameListItem from './Item';

const GameList = React.memo(({
  games,
  status,
  onStart,
  onStop,
  onRestart
}) => {
  const children = games.map((g) => (
    <GameListItem
      key={g.id}
      game={g}
      status={status.find((s) => get(s, 'identifier') === get(g, 'identifier'))}
      onStart={onStart}
      onStop={onStop}
      onRestart={onRestart}
    />
  ));

  return (
    <ListGroup className="server-list">
      {children}
    </ListGroup>
  );
});

GameList.propTypes = {
  games: PropTypes.array,
  status: PropTypes.array,
  onStart: PropTypes.func,
  onStop: PropTypes.func,
  onRestart: PropTypes.func
};

GameList.defaultProps = {
  games: [],
  status: [],
  onStop: noop,
  onStart: noop,
  onRestart: noop
};

export default GameList;
