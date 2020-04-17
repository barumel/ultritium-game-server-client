import React from 'react';
import PropTypes from 'prop-types';
import { get, noop } from 'lodash';
import { ListGroup, ListGroupItem } from 'reactstrap';
import cl from 'classnames';

import './result.css';

class Result extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(ev) {
    console.log('EVVV', ev);
  }

  /**
   * Render method
   *
   * @return {ReactElement} markup
   */
  render() {
    const { items, selected, onClick } = this.props;

    const children = items.map((item, index) => (
      <ListGroupItem
        key={index}
        className={cl({ 'what-to-to-result-item': true, 'what-to-to-result-item-selected': selected === index })}
        onClick={() => onClick(index)}
      >
        {get(item, 'title', 'Hmm... da het äuä öper dr Titu vergässä')}
      </ListGroupItem>
    ));

    return(
      <ListGroup>
        {children}
      </ListGroup>
    );
  }
}

Result.propTypes = {
  items: PropTypes.array,
  selected: PropTypes.number,
  onClick: PropTypes.func
};

Result.defaultProps = {
  items: [],
  selected: undefined,
  onClick: noop
};

export default Result;
