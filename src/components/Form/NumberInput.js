import React from 'react';
import PropTypes from 'prop-types';
import { noop, isUndefined, isNull, isNaN } from 'lodash';
import cl from 'classnames';
import NumberFormat from 'react-number-format';

class NumberInput extends React.Component {
  constructor(props) {
    super(props);
    const { value } = this.props;
    this.state = {
      value: !isUndefined(value) && !isNull(value) ? value : ''
    };

    this.onValueChange = this.onValueChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { value: propsValue } = this.props;
    const { value: prevPropsValue } = prevProps;

    //Overwrite string value in state if value from props changes
    if (!isUndefined(propsValue) && (propsValue !== prevPropsValue)) {
      this.setState({ value: propsValue.toString() });
    }

    // Reset value in state if props value changes to undefined
    if (isUndefined(propsValue) && !isUndefined(prevPropsValue)) {
      this.setState({ value: '' });
    }
  }

  /**
   * Handle onChange of NumberFormat component.
   * We always want to return the float value. The string representatin is only used internally.
   * Reset value to undefined if the given value is not a number
   *
   * @param  {Object} values Object containing the value as string and as float
   *
   * @return void
   */
  onValueChange(values) {
    const { onChange, id } = this.props;
    const { value, floatValue } = values;
    this.setState({ value });
    isNaN(floatValue) ? onChange(id, undefined, values) : onChange(id, floatValue, values);
  }

  /**
   * Render method
   *
   * @return {ReactElement} markup
   */
  render() {
    const { value } = this.state;
    const {
      thousandSeparator,
      decimalSeparator,
      decimalScale,
      prefix,
      id,
      className,
      tabIndex,
      disabled
    } = this.props;

    return(
      <NumberFormat
        id={id}
        className={cl('form-control form-number-input', className)}
        thousandSeparator={thousandSeparator}
        decimalSeparator={decimalSeparator}
        decimalScale={decimalScale}
        prefix={prefix}
        value={value}
        onValueChange={this.onValueChange}
        isNumericString={true}
        tabIndex={tabIndex}
        disabled={disabled}
      />
    );
  }
}

NumberInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.number,
  onChange: PropTypes.func,
  placeholder: PropTypes.string
};

NumberInput.defaultProps = {
  name: undefined,
  value: undefined,
  onChange: noop,
  placeholder: undefined
};

export default NumberInput;
