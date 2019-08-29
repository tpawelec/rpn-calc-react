import React, { Component } from 'react';
import InputField from './InputField';
import Button from './Button';
import './style.css';

class Application extends Component {

    constructor(props) {
        super(props);

        this.state = {
            equation: "0"
        }
    }
    
    addToCurrent = (symbol) => {
        this.setState({equation: this.state.equation + symbol});
    }
    render () {

        const buttons = [
            {symbol: 'C', cols: 2, action: this.reset},
            {symbol: '\u2B70', cols: 2, action: this.backspace},
            {symbol: "(", cols: 1, action: this.addToCurrent},
            {symbol: ")", cols: 1, action: this.addToCurrent},
            {symbol: "^", cols: 1, action: this.addToCurrent},
            {symbol: "*", cols: 1, action: this.addToCurrent},
            {symbol: "7", cols: 1, action: this.addToCurrent},
            {symbol: "8", cols: 1, action: this.addToCurrent},
            {symbol: "9", cols: 1, action: this.addToCurrent},
            {symbol: "/", cols: 1, action: this.addToCurrent},
            {symbol: "4", cols: 1, action: this.addToCurrent},
            {symbol: "5", cols: 1, action: this.addToCurrent},
            {symbol: "6", cols: 1, action: this.addToCurrent},
            {symbol: "-", cols: 1, action: this.addToCurrent},
            {symbol: "1", cols: 1, action: this.addToCurrent},
            {symbol: "2", cols: 1, action: this.addToCurrent},
            {symbol: "3", cols: 1, action: this.addToCurrent},
            {symbol: "+", cols: 1, action: this.addToCurrent},
            {symbol: ".", cols: 1, action: this.addToCurrent},
            {symbol: "0", cols: 1, action: this.addToCurrent},
            {symbol: "=", cols: 2, action: this.addToCurrent},

        ];
        return (
            <div className="calculator">
                <InputField name="converted-quation" id="convertedEquation" value="" col="4"/>
                <InputField name="original-equation" id="originalEquation" value={this.state.equation} col="4"/>
                {buttons.map((btn, i) => {
                    return <Button key={i} symbol={btn.symbol} cols={btn.cols} action={(symbol) => btn.action(symbol) }/>
                })}
            </div>
        )
    }
}
export default Application;