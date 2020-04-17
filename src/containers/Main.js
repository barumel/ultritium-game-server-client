import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { Container, Row, Col } from 'reactstrap';
import { FormattedMessage } from 'react-intl';

import Input from '../components/WhatToDo/Input';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
   * Render method
   *
   * @return {ReactElement} markup
   */
  render() {
    return (
      <Container fluid>
        <Row style={{ paddingTop: '5%' }}>
          <Col lg={3} md={3} sm={0}>

          </Col>
          <Col lg={6} md={6} sm={12}>
            <div style={{ textAlign: 'center'}}>
              <Input />
            </div>
          </Col>

          <Col lg={3} md={3}  sm={0}>

          </Col>
        </Row>
      </Container>
    );
  }
}

Main.propTypes = {

};

Main.defaultProps = {

};

function mapStateToProps(state, ownProps) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({}, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
