import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { get } from 'lodash';
import { Container, Row, Col } from 'reactstrap';

import gamesAction from '../actions/Game/Games';
import gameStartAction from '../actions/Game/Start';
import gameStopAction from '../actions/Game/Stop';
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

    this.onStart = this.onStart.bind(this);
    this.onStop = this.onStop.bind(this);
    this.onRestart= this.onRestart.bind(this);
  }

  componentWillUnmount() {
    const { pollAction } = this.props;

    pollAction.cancel({ identifier: 'gamestatus' });
  }

  onStart(game) {
    const { gameStartAction } = this.props;
    const { id } = game;

    gameStartAction.request({ id });
  }

  onStop(game) {
    const { gameStopAction } = this.props;
    const { id } = game;

    gameStopAction.request({ id });
  }

  onRestart(game) {
    const { id } = game;

    console.log('RESTART', id);
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
              onStart={this.onStart}
              onStop={this.onStop}
              onRestart={this.onRestart}
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
  pollAction: PropTypes.object.isRequired,
  gameStartAction: PropTypes.object.isRequired,
  gameStopAction: PropTypes.object.isRequired
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
    pollAction: bindActionCreators(pollAction, dispatch),
    gameStartAction: bindActionCreators(gameStartAction, dispatch),
    gameStopAction: bindActionCreators(gameStopAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Games);
