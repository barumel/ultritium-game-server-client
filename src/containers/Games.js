import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { get } from 'lodash';
import { Container, Row, Col } from 'reactstrap';

import gamesAction from '../actions/Game/Games';
import * as pollAction from '../actions/Poll';
import GameList from '../components/Games/List';

class Games extends React.Component {
  constructor(props) {
    super(props);

    const { gamesAction, pollAction } = props;

    gamesAction.request();
    pollAction.request({
      identifier: 'gamestatus',
      url: '/game/status'
    });
  }

  /**
   * Render method
   *
   * @return {ReactElement} markup
   */
  render() {
    const { games, status } = this.props;

    return (
      <Container fluid>
        <Row style={{ paddingTop: '5%' }}>
          <Col lg={1} md={0} sm={0}>

          </Col>

          <Col lg={10} md={10} sm={0}>
            <GameList
              games={get(games, 'data', [])}
              status={get(status, 'data', [])}
            />
          </Col>

          <Col lg={1} md={1} sm={0}>

          </Col>
        </Row>
      </Container>
    );
  }
}

Games.propTypes = {
  gamesAction: PropTypes.object.isRequired,
  games: PropTypes.object,
  pollAction: PropTypes.object.isRequired
};

Games.defaultProps = {
  games: {}
};

function mapStateToProps(state, ownProps) {
  return {
    games: state.games,
    status: get(state, 'poll.requests.gamestatus', {})
  };
}

function mapDispatchToProps(dispatch) {
  return {
    gamesAction: bindActionCreators(gamesAction, dispatch),
    pollAction: bindActionCreators(pollAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Games);
