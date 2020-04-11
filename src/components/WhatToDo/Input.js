import React from 'react';
import PropTypes from 'prop-types';
import { get, isUndefined } from 'lodash';
import Fuse from 'fuse.js'
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router';

import { TextInput } from '../Form/index';
import Result from './Result';
import { getKeyboardConfiguration } from '../../globals';
import { getAction } from '../../lib/WhatToDo/Utils/index';

const keyboard = getKeyboardConfiguration();

const items = [{
  title: 'Server Adminischtration',
  keywords: ['server admin', 'server startä' ,'server', 'admin', 'startä'],
  action: {
    type: 'redirect',
    path: '/games'
  }
}, {
  title: 'Mini Übersicht',
  keywords: ['mini übersicht', 'übersicht', 'dashboard'],
  action: {
    type: 'redirect',
    path: '/dashboard'
  }
}];

class WhatToDo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: undefined,
      result: [],
      selected: undefined
    };

    var options = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        "title",
        "keywords"
      ]
    };

    this.fuse = new Fuse(items, options); // "list" is the item array

    this.onValueChange = this.onValueChange.bind(this);
    this.onResultClick = this.onResultClick.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onEscape = this.onEscape.bind(this);
    this.onEnter = this.onEnter.bind(this);
    this.onDownKey = this.onDownKey.bind(this);
    this.onUpKey = this.onUpKey.bind(this);
  }

  componentWillUnmount() {
    keyboard.enableGlobalCommands();
    keyboard.enablePageCommands();
    this.unregisterKeyboardCommands();
  }

  registerKeyboardCommands() {
    keyboard.registerCommand('Escape', this.onEscape, 'KeyCommands.OnEscape');
    keyboard.registerCommand('ArrowDown', this.onDownKey, 'Nächstes Element in der Resultat Liste');
    keyboard.registerCommand('ArrowUp', this.onUpKey, 'Vorheriges Element in der Resultat Liste');
    keyboard.registerCommand('Enter', this.onEnter, 'Aktuell gewähltes Element wählen');
  }

  unregisterKeyboardCommands() {
    keyboard.unregisterCommand('Escape');
    keyboard.unregisterCommand('ArrowDown');
    keyboard.unregisterCommand('ArrowUp');
    keyboard.unregisterCommand('Enter');
  }

  handleAction(selected) {
    const { history } = this.props;

    const item = get(this, `state.result[${selected}]`);
    const action = getAction(item);

    action({ history, action: item })
  }

  onValueChange(id, value) {
    const result = this.fuse.search(value);

    this.setState({ result, value, selected: undefined });
  }

  onEscape() {
    this.setState({ result: [], value: undefined, selected: undefined });
  }

  onEnter() {
    const { selected } = this.state;

    if (isUndefined(selected)) return;

    this.handleAction(selected);
  }

  onFocus() {
    keyboard.disableGlobalCommands();
    keyboard.disablePageCommands();
    this.registerKeyboardCommands();
  }

  onBlur() {
    keyboard.enableGlobalCommands();
    keyboard.enablePageCommands();
    this.unregisterKeyboardCommands();

    //this.setState({ result: [], value: undefined, selected: undefined });
  }

  onDownKey() {
    const current = get(this, 'state.selected', -1);
    const items = get(this, 'state.result', []);

    if (get(items, 'length', 0) === 0) return;

    const selected = (current + 1) > (get(items, 'length', 0) - 1)
      ? 0
      : current + 1;

    this.setState({ selected });
  }

  onUpKey() {
    const current = get(this, 'state.selected');
    const items = get(this, 'state.result', []);

    if (get(items, 'length', 0) === 0) return;

    const selected = isUndefined(current) || (current -1) < 0
      ? get(items, 'length', 1) - 1
      : current -1 ;

    this.setState({ selected });
  }

  onResultClick(selected) {
    this.handleAction(selected);
  }

  /**
   * Render method
   *
   * @return {ReactElement} markup
   */
  render() {
    const { intl } = this.props;

    return(
      <div className="what-to-do-container">
        <TextInput
          id="whatToDo"
          value={this.state.value}
          onChange={this.onValueChange}
          className="what-to-do-input"
          placeholder={intl.formatMessage({ id: 'WhatToDo.Placeholder' })}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          autoFocus={true}
        />

        <Result
          selected={this.state.selected}
          items={this.state.result}
          onClick={this.onResultClick}
        />
      </div>
    );
  }
}

WhatToDo.propTypes = {
  items: PropTypes.array
};

WhatToDo.defaultProps = {
  items: []
};

export default withRouter(injectIntl(WhatToDo));
