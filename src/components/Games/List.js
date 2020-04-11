import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { get } from 'lodash';

import ServerListItem from './Item';

const ServerList = React.memo(({ games, status }) => {
  const children = games.map((g, index) => (
    <ServerListItem
      key={g.id}
      game={g}
      status={status.find((s) => get(s, 'identifier') === get(g, 'identifier'))}
    />
  ));

  return (
    <ListGroup className="server-list">
      {children}
    </ListGroup>
  );
});

ServerList.propTypes = {
  games: PropTypes.array,
  status: PropTypes.array,
};

ServerList.defaultProps = {
  games: [],
  status: []
};

export default ServerList;
