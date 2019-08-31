import React, { Component } from 'react';
import InputField from './InputField';
import Button from './Button';
import './style.css';

class Application extends Component {

    constructor(props) {
        super(props);

        this.state = {
            equation: "0",
            nextIsRestet: false,
            stack: [],
            convertedEquation: ""

        }
        
    }
    addToCurrent = (symbol) => {
        if(this.state.equation === "0") {
            this.setState({equation: symbol})
        } else {
            if(['+', '-', '*', '/', '^'].indexOf(symbol) === -1) {
                this.setState({equation: this.state.equation + symbol});
            } else {
                this.setState({equation: this.state.equation + ' ' + symbol + ' '});
            }
        }
    }

    reset = () => {
        this.setState(
            {
                equation: "0",
                nextIsRestet: false,
                convertedEquation: ""
            }
            );
    }

    backspace = () => {
        if(this.state.equation.length <= 1) {
            this.setState({equation: "0"})
        } else {
            this.setState({equation: this.state.equation.slice(0,-1)});
        }
    }
    infixToRpn = (equation) => {
        let operatorStack = [];
        let outputStack = [];
        let operatorsArray = ['+', '-', '*', '/', '^'];
        const operators = {
            '^' : {
                priority: 4,
                associavity: 'right'
            },
            '*' : {
                priority: 3,
                associavity: 'left'
            },
            '/' : {
                priority: 3,
                associavity: 'left'
            },
            '-' : {
                priority: 2,
                associavity: 'left'
            },
            '+' : {
                priority: 2,
                associavity: 'left'
            }
        }

        for(const token of equation.replace(/\s+/g, '')) {

            
            if(!isNaN(token) || token === '.') {
                outputStack.push(token);
            } else if (operatorsArray.indexOf(token) !== -1 && operatorStack.length === 0) {
                operatorStack.push(token);
            
            } else if (operatorsArray.indexOf(token) !== -1 && operatorStack.length > 0) {
                let o1 = token;
                
               
                let o2 = operatorStack[operatorStack.length - 1];

                while(
                    operatorStack.length > 0 &&
                    operatorsArray.indexOf(o2) !== -1 &&
                    (
                        (
                            operators[o1].associavity === 'left' &&
                            operators[o1].priority <= operators[o2].priority
                        ) ||
                        (
                            operators[o1].associavity === 'right' &&
                            operators[o1].priority < operators[o2].priority
                        )
                    ) 

                ) {
                    outputStack.push(operatorStack.pop());
                }
            
                operatorStack.push(o1);
            } else if(token === '(') {
                operatorStack.push(token)
                console.log(operatorStack)
            } else if (token === ')') {
                while(operatorStack[operatorStack.length -1] !== '(') {
                    outputStack.push(operatorStack.pop());
                }
                operatorStack.pop();
            }
        
        }
        /* for(const operator of operatorStack) {
            outputStack.push(operator);
        } */while(operatorStack.length > 0) {
            outputStack.push(operatorStack.pop());
        }

        return outputStack.join('');
    }
    equals = () => {
        this.setState({convertedEquation: this.infixToRpn(this.state.equation)})
        this.setState({equation: "0", nextIsRestet: false})
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
            {symbol: "=", cols: 2, action: this.equals},

        ];
        return (
            <div className="calculator">
                <InputField name="converted-quation" id="convertedEquation" value={this.state.convertedEquation} col="4"/>
                <InputField name="original-equation" id="originalEquation" value={this.state.equation} col="4"/>
                {buttons.map((btn, i) => {
                    return <Button key={i} symbol={btn.symbol} cols={btn.cols} action={(symbol) => btn.action(symbol) } number={!isNaN(btn.symbol)}/>
                })}
            </div>
        )
    }
}
export default Application;