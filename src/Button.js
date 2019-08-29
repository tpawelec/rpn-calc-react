import React, { Component } from 'react';

class Button extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <button className={`calculator__button col-${this.props.cols}`} onClick={() => this.props.action(this.props.symbol)}>{this.props.symbol}</button>
        )
    }
}

export default Button;