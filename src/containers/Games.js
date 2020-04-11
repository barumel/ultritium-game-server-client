import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { get } from 'lodash';
import { Container, Row, Col } from 'reactstrap';

import gamesAction from '../actions/Game/Games';
import GameList from '../components/Games/List';

const servers = [{
  id: 'conan-exiles',
  title: 'Conan Exiles',
  status: 'running'
}, {
  id: 'the-forest',
  title: 'The Forest',
  status: 'stopped'
}, {
  id: 'astroneer',
  title: 'Astroneer',
  status: 'error'
}, {
  id: 'fooby',
  title: 'Fooby',
  status: 'starting'
}];

class Games extends React.Component {
  constructor(props) {
    super(props);

    const { gamesAction } = props;

    gamesAction.request();
  }

  /**
   * Render method
   *
   * @return {ReactElement} markup
   */
  render() {
    const { games } = this.props;

    return (
      <Container fluid>
        <Row style={{ paddingTop: '5%' }}>
          <Col lg={1} md={0} sm={0}>

          </Col>

          <Col lg={10} md={10} sm={0}>
            <GameList
              games={get(games, 'data', [])}
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
  games: PropTypes.object
};

Games.defaultProps = {
  games: {}
};

function mapStateToProps(state, ownProps) {
  return {
    games: state.games
  };
}

function mapDispatchToProps(dispatch) {
  return {
    gamesAction: bindActionCreators(gamesAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Games);
