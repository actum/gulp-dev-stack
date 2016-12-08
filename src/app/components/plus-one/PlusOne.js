import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './actions';

class PlusOne extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const { increment } = this.props;
        increment();
    }

    render() {
        const { counter } = this.props;
        return (
            <p>
                <button type="button" className="btn btn-primary" onClick={this.handleClick}>+ {counter}</button>
            </p>
        );
    }
}

PlusOne.defaultProps = {
    counter: 1
};

PlusOne.propTypes = {
    counter: PropTypes.number
};

export default connect(
    state => ({
        counter: state.counter
    }),
    dispatch => bindActionCreators(actions, dispatch)
)(PlusOne);
