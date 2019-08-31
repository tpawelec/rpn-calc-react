import React, { Component } from 'react';

class Button extends Component {

    

    render() {
        return (
            (this.props.number)
                ?
                <button className={`calculator__button  calculator__button--number col-${this.props.cols}`} onClick={() => this.props.action(this.props.symbol)}>{this.props.symbol}</button>
                :
                <button className={`calculator__button  col-${this.props.cols}`} onClick={() => this.props.action(this.props.symbol)}>{this.props.symbol}</button>
            
            )
    }
}

export default Button;