// External modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, number } from 'prop-types';

// Sibling modules from the same directory
import { increment } from './actions';

class PlusOne extends Component {
  static propTypes = {
    counter: number,
    increment: func.isRequired,
  };

  static defaultProps = {
    counter: 1,
  };

  handleClick = () => {
    this.props.increment();
  };

  render() {
    return (
      <p>
        <button
          className="btn btn-primary"
          onClick={this.handleClick}
          type="button"
        >
          + {this.props.counter}
        </button>
      </p>
    );
  }
}

export default connect(
  (state) => ({
    counter: state.counter,
  }),
  { increment },
)(PlusOne);
