import React, { Component } from 'react';
import InputField from './InputField';
import Button from './Button';
import './style.css';

class Application extends Component {

    constructor(props) {
        super(props);

        this.state = {
            equation: ['0'],
            nextIsRestet: false,
            convertedEquation: []

        }
        
    }
    addToCurrent = (symbol) => {
        if(this.state.equation.length === 1 && this.state.equation[this.state.equation.length - 1] === '0') {
            let {equation} = this.state;
            equation[0] = symbol;
            this.setState({equation: equation});
        } else {
            if(!isNaN(this.state.equation[this.state.equation.length - 1]) && ['+', '-', '*', '/', '^', '(', ')'].indexOf(symbol) === -1) {
                let {equation} = this.state;
                equation[equation.length - 1] = equation[equation.length - 1] + symbol;
                this.setState({equation: equation});
            } else {
                let {equation} = this.state;
                equation = [...equation, symbol];
                this.setState({equation: equation});
            }
    }

    }

    reset = () => {
        let {equation, nextIsRestet, convertedEquation} = this.state;
        equation = ['0'];
        nextIsRestet =  false;
        convertedEquation = [];
        this.setState(
            {
                equation,
                nextIsRestet,
                convertedEquation
            }
            );
    }

    backspace = () => {
        let {equation} = this.state;
        if(this.state.equation.length <= 1) {
            if(equation[equation.length - 1].length === 1) {
                console.log("1")
                equation = ['0'];
                this.setState({equation});
            } else {
                console.log("2")
                equation[equation.length - 1] = equation[equation.length - 1].slice(0,-1);
                this.setState({equation});
            }
            
        } else {
            if(equation[equation.length - 1].length === 1) {
                equation.pop();
                this.setState({equation});
            } else {
                console.log("2")
                equation[equation.length - 1] = equation[equation.length - 1].slice(0,-1);
                this.setState({equation});
            }
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

        // eslint-disable-next-line
        for(const token of equation) {

            
            if((!isNaN(token) || token === '.') && token !== ' ') {
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
                    o2 = operatorStack[operatorStack.length - 1];
                }
            
                operatorStack.push(o1);
            } else if(token === '(') {
                operatorStack.push(token)
            } else if (token === ')') {
                 while(operatorStack[operatorStack.length - 1] !== '(') {
                    outputStack.push(operatorStack.pop());
                    console.log(operatorStack)
                } 
                operatorStack.pop();
                console.log(operatorStack)
            }
        
        }
        while(operatorStack.length > 0) {
            outputStack.push(operatorStack.pop());
        }
        return outputStack;
    }

    solveEquation = (equation) => {
        let stack = [];
        equation.forEach((item) => {
            
            item = item.replace(/\s+/g, '');
            if(item !== ' ') {
            if(!isNaN(item)) {
                stack.push(item);
            } else {
                let second = parseFloat(stack.pop());
                let first = parseFloat(stack.pop());
                if(item === '+') {
                    stack.push(first + second);
                } else if(item === '-') {
                    stack.push(first - second);
                } else if(item === "*") {
                    stack.push(first*second);
                } else if(item === "/") {
                    stack.push(first / second);
                } else if(item === "^") {
                    stack.push(Math.pow(first,second));
                }
            }
        }
        })

        return stack;
    }

    equals = () => {
        let {equation, convertedEquation} = this.state;
        convertedEquation = this.infixToRpn(equation);
        equation = this.solveEquation(convertedEquation);
        this.setState({convertedEquation})
        this.setState({equation, nextIsRestet: false})
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
        let equationString = '';
        let convertedEquationString = '';

        this.state.equation.forEach((item) => {
            equationString += item + ' ';
        })

        this.state.convertedEquation.forEach((item) => {
            convertedEquationString += item + ' ';
        })
        console.log(this.state.equation)
        return (
            <div className="calculator">
                <InputField name="converted-quation" id="convertedEquation" value={convertedEquationString} col="4"/>
                <InputField name="original-equation" id="originalEquation" value={equationString} col="4"/>
                {buttons.map((btn, i) => {
                    return <Button key={i} symbol={btn.symbol} cols={btn.cols} action={(symbol) => btn.action(symbol) } number={!isNaN(btn.symbol)}/>
                })}
            </div>
        )
    }
}
export default Application;