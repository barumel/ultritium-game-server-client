import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import { getKeyboardConfiguration } from '../globals';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.keyboard = getKeyboardConfiguration();
    this.keyboard.registerPageCommands({
      f: { func: ev => alert('PAGE F'), description: 'Alert "PAGE F"' }
    });
    this.keyboard.registerCommand('h', () => alert('LOCAL H'), 'Alert "LOCAL H"')
  }

  componentWillUnmount() {
    this.keyboard.unregisterPageCommands();
  }

  render() {
    return (
      <Container>
        <Row>
          <Col lg={12} md={12} sm={1}>
            Dashboard
          </Col>
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Dashboard);
