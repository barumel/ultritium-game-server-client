import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { Container, Nav, NavItem, NavLink } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';

class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.redirect = this.redirect.bind(this);
  }

  redirect(url) {
    const { history } = this.props;

    history.push(url);
  }

  /**
   * Render method
   *
   * @return {ReactElement} markup
   */
  render() {
    const { children } = this.props;

    return (
      <Container fluid>
        <Nav>
          <NavItem onClick={() => this.redirect('/')}>
            <NavLink href="#">
              <FormattedMessage id="Navigation.StartPage" />
            </NavLink>
          </NavItem>

          <NavItem onClick={() => this.redirect('/dashboard')}>
            <NavLink href="#">
              <FormattedMessage id="Navigation.Dashboard" />
            </NavLink>
          </NavItem>
        </Nav>
        {children}
      </Container>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node,
  history: PropTypes.object.isRequired
};

Layout.defaultProps = {
  children: null
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Layout));
