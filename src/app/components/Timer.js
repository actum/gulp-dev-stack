import React, { Component } from 'react';
import { number } from 'prop-types';

export default class Timer extends Component {
  static propTypes = {
    from: number,
  };

  static defaultProps = {
    from: 0,
  };

  state = {
    secondsElapsed: this.props.from,
  };

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick = () => {
    this.setState({
      secondsElapsed: this.state.secondsElapsed + 1,
    });
  };

  render() {
    return <div>Seconds Elapsed: {this.state.secondsElapsed}</div>;
  }
}
