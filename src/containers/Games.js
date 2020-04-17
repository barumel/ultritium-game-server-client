import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { get } from 'lodash';
import { Container, Row, Col } from 'reactstrap';

import gamesAction from '../actions/Game/Games';
import gameStartAction from '../actions/Game/Start';
import gameRestartAction from '../actions/Game/Restart';
import gameStopAction from '../actions/Game/Stop';
import * as pollAction from '../actions/Poll';
import GameList from '../components/Games/List';
import Loader from '../components/General/Loader';

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
    this.onRestart = this.onRestart.bind(this);
  }

  componentWillUnmount() {
    const { pollAction } = this.props;

    pollAction.cancel({ identifier: 'gamestatus' });
  }

  onStart(game) {
    const { gameStartAction } = this.props;

    gameStartAction.request({ game });
  }

  onStop(game) {
    const { gameStopAction } = this.props;

    gameStopAction.request({ game });
  }

  onRestart(game) {
    const { gameRestartAction } = this.props;

    gameRestartAction.request({ game });
  }

  /**
   * Render method
   *
   * @return {ReactElement} markup
   */
  render() {
    const { games, status, requesting } = this.props;

    if (requesting) {
      return (
        <Container fluid style={{ height: '100vh' }}>
          <Loader />
        </Container>
      );
    }

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
  gameStopAction: PropTypes.object.isRequired,
  gameRestartAction: PropTypes.object.isRequired,
  requesting: PropTypes.bool,
  status: PropTypes.object
};

Games.defaultProps = {
  games: {},
  requesting: false,
  status: {}
};

function mapStateToProps(state, ownProps) {
  return {
    games: state.games,
    status: get(state, 'poll.requests.gamestatus', {}),
    requesting: get(state, 'games.requesting', false)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    gamesAction: bindActionCreators(gamesAction, dispatch),
    pollAction: bindActionCreators(pollAction, dispatch),
    gameStartAction: bindActionCreators(gameStartAction, dispatch),
    gameStopAction: bindActionCreators(gameStopAction, dispatch),
    gameRestartAction: bindActionCreators(gameRestartAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Games);
