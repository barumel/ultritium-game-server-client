import React from 'react';
import PropTypes from 'prop-types';
import { get, noop } from 'lodash';
import { Input } from 'reactstrap';
import cl from 'classnames';

class TextInput extends React.Component {
  constructor(props) {
    super(props);

    this.onValueChange = this.onValueChange.bind(this);
  }

  onValueChange(ev) {
    const { id, onChange } = this.props;

    const value = get(ev, 'target.value', '');
    if (get(value.trim(), 'length', 0) === 0) return onChange(id);

    return onChange(id, value);
  }

  /**
   * Render method
   *
   * @return {ReactElement} markup
   */
  render() {
    const {
      autoFocus,
      id,
      className,
      name,
      value,
      placeholder,
      tabIndex,
      type,
      innerRef,
      onFocus,
      onBlur
    } = this.props;

    return(
      <Input
        id={id}
        name={name || id}
        className={cl('form-input-text', className)}
        type={type}
        value={value || ''}
        onChange={this.onValueChange}
        placeholder={placeholder}
        innerRef={innerRef}
        tabIndex={tabIndex}
        onFocus={onFocus}
        onBlur={onBlur}
        autoFocus={autoFocus}
      />
    );
  }
}

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  tabIndex: PropTypes.number,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  autoFocus: PropTypes.bool
};

TextInput.defaultProps = {
  name: undefined,
  type: 'text',
  value: undefined,
  onChange: noop,
  placeholder: undefined,
  tabIndex: 1,
  onFocus: noop,
  onBlur: noop,
  autoFocus: false
};

export default TextInput;
