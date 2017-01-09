import React, { Component, PropTypes } from 'react';

export default class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            secondsElapsed: props.from
        };
    }

    tick() {
        this.setState({
            secondsElapsed: this.state.secondsElapsed + 1
        });
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div>Seconds Elapsed: {this.state.secondsElapsed}</div>
        );
    }
}

Timer.propTypes = {
    from: PropTypes.number.isRequired
};
