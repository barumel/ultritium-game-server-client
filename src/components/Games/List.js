import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { get } from 'lodash';

import ServerListItem from './Item';

const ServerList = React.memo(({ games }) => {
  const children = games.map((g, index) => (
    <ServerListItem
      key={g.id}
      game={g}
    />
  ));

  return (
    <ListGroup className="server-list">
      {children}
    </ListGroup>
  );
});

ServerList.propTypes = {
  games: PropTypes.array
};

ServerList.defaultProps = {
  games: []
};

export default ServerList;
