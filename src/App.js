import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { get } from 'lodash';
import '@mdi/font/css/materialdesignicons.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import messages from './intl/messages';
import flattenMessages from './lib/Intl/Utils/flattenMessages';
import './App.css';

import Dashboard from './containers/Dashboard';
import Main from './containers/Main';
import Games from './containers/Games';
import Layout from './containers/Layout';

class App extends React.Component {
  constructor(props) {
    super(props);

    axios.defaults.baseURL = get(process, 'env.API_URL', 'http://localhost:8080');
    axios.defaults.headers.common = {};
    axios.defaults.headers.common['Accept-Language'] = 'de,en,fr';
    axios.defaults.timeout = 20000;
  }

  render() {
    const { user, environment } = this.props;
    const language = get(user, 'language', get(environment, 'language', 'de-CH'));


    return (
      <IntlProvider locale={language} messages={flattenMessages(messages[language])}>
        <Router>
          <Layout>
            <Switch>
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/games" component={Games} />
              <Route path="/" component={Main} />
            </Switch>
          </Layout>
        </Router>
      </IntlProvider>
    );
  }
}

App.propTypes = {
  environment: PropTypes.object,
  user: PropTypes.object
};

App.defaultProps = {
  environment: {},
  user: undefined
};

function mapStateToProps(state) {
  return {
    environment: state.environment,
    user: state.user
  };
}

export default connect(mapStateToProps)(App);
