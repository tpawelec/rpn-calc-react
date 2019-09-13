import React, { Component } from 'react';

class Button extends Component {

    getButtons = (symbol) => {
        switch(symbol) {
            case 'C':
                return  <button className={`calculator__button  col-${this.props.cols}`} onClick={() => this.props.action(this.props.symbol)}>
                {this.props.symbol}
                <span className="calculator__button--sub">(Space)</span>
                </button>
            case '\u2B70':
                return  <button className={`calculator__button  col-${this.props.cols}`} onClick={() => this.props.action(this.props.symbol)}>
                {this.props.symbol}
                <span className="calculator__button--sub">(Backspace)</span>
                </button>
            case '=':
                return  <button className={`calculator__button  col-${this.props.cols}`} onClick={() => this.props.action(this.props.symbol)}>
                {this.props.symbol}
                <span className="calculator__button--sub">(Enter)</span>
                </button>
            case '\u00B1':
                return  <button className={`calculator__button  col-${this.props.cols}`} onClick={() => this.props.action(this.props.symbol)}>
                {this.props.symbol}
                <span className="calculator__button--sub">(Tab)</span>
                </button>
            default:
                return <button className={`calculator__button  col-${this.props.cols}`} onClick={() => this.props.action(this.props.symbol)}>{this.props.symbol}</button>
        }
    }

    render() {
        return (
            (this.props.number)
                ?
                <button className={`calculator__button  calculator__button--number col-${this.props.cols}`} onClick={() => this.props.action(this.props.symbol)}>{this.props.symbol}</button>
                :
                this.getButtons(this.props.symbol)
            
            )
    }
}

export default Button;