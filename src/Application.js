import React, { Component } from 'react';
import InputField from './InputField';
import Button from './Button';
import './style.css';
import { infixToRpn, solveEquation } from './solvingEquation';

class Application extends Component {

    constructor(props) {
        super(props);

        this.state = {
            equation: ['0'],
            nextIsRestet: false,
            convertedEquation: []
        }
        
        this.keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', '/', '+', '-', '*', '^', '(', ')'];
    }

    componentDidMount() {
        document.addEventListener('keydown', (e) => {
            if(this.keys.indexOf(e.key) !== -1) {
                this.addToCurrent(e.key);
            } else if(e.key === 'Enter') {
                e.preventDefault();
                this.equals();
            } else if(e.key === 'Backspace') {
                e.preventDefault();
                this.backspace();
            } else if(e.key === ' ') {
                this.reset();
            } else if(e.key === 'Tab') {
                e.preventDefault();
                this.negativeNumber();
            }
        })
    }

    addToCurrent = (symbol) => {
        let operators = ['+', '-', '*', '/', '^'];
        if(this.state.nextIsRestet) {
            this.setState({
                equation: [symbol],
                nextIsRestet: false,
                convertedEquation: []
            })
        } else {
            let {equation} = this.state;
            /* // if there is one element in euation AND this element IS 0
            if(equation.length === 1 && equation[equation.length - 1] === '0') {
                // if symbol is '.'
                if(symbol === '.') {
                    equation[equation.length - 1] = equation[equation.length - 1] + symbol;
                } else {
                    equation[0] = symbol;
                }
            } else {
                // if last element IS number AND symbol IS one of operators
                if(!isNaN(equation[equation.length - 1]) && ['+', '-', '*', '/', '^', '(', ')'].indexOf(symbol) === -1) {
                    equation[equation.length - 1] = equation[equation.length - 1] + symbol;
                // else if last element IS NOT number 
                } else if(isNaN(equation[equation.length - 1]) && 
                    ['+', '-', '*', '/', '^'].indexOf(equation[equation.length - 1]) !== -1 && 
                    ['+', '-', '*', '/', '^', '(', ')'].indexOf(symbol) !== -1) {
                    equation[equation.length - 1] = symbol;
                } else {
                    equation = [...equation, symbol];
                }
            } */
            // if symbol IS number
            if(!isNaN(symbol)) {
                // if length of equation is 1 AND last element is 0
                if(equation.length === 1 && equation[equation.length - 1] === '0') {
                    equation[equation.length - 1] = symbol;
                }
                // else if last element IS number OR last element IS '.'
                else if(!isNaN(equation[equation.length - 1]) || equation[equation.length - 1] === '.') {
                    equation[equation.length - 1] = equation[equation.length - 1] + symbol;
                    console.log("sdf")
                }
                // else (if last element IS one of the oprators)
                else {
                    equation = [...equation, symbol];
                }
            }
            // else if symbol IS '.'
            else if(symbol === '.') {
                // if last element IS number
                if(!isNaN(equation[equation.length - 1])) {
                    equation[equation.length - 1] = equation[equation.length - 1] + symbol;
                }
                // if last element IS one of the operators
                // this will make decimal in '.xxxx' form
                else if(operators.indexOf(equation[equation.length - 1]) !== -1) {
                    equation = [...equation, symbol];
                }
            }
            // else if symbol IS one of the operators
            else if(operators.indexOf(symbol) !== -1) {
                // if last element IS number OR last element IS parenthesis (closing)
                if(!isNaN(equation[equation.length - 1]) || equation[equation.length - 1] === ')') {
                    equation = [...equation, symbol];
                }
                // else if last element IS one of the operators
                else if(operators.indexOf(equation[equation.length - 1]) !== -1) {
                    equation[equation.length - 1] = symbol
                }
            }
            // else (if symbol IS parenthesis)
            else {
                /* if symbol IS ) AND last element is ( OR
                    symbol IS ( AND last element is ) OR
                   symbol IS ) AND last element IS on of the operators OR
                    symbol IS ( and last element IS number
                */
                if( (symbol === '(' && equation[equation.length - 1] === ')') ||
                    (symbol === ')' && equation[equation.length - 1] === '(') ||
                    (symbol === ')' && operators.indexOf(equation[equation.length - 1]) !== -1) ||
                    (symbol === '(' && !isNaN(equation[equation.length - 1]))) {
                    return;
                } 
                // if length of equation is 1 AND last element is 0
                else if(equation.length === 1 && equation[equation.length - 1] === '0') {
                    equation[equation.length - 1] = symbol;
                }
                else {
                    equation = [...equation, symbol];
                }

            }
            console.log(equation);
            this.setState({equation});
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
        if(this.state.nextIsRestet) {
            equation = ['0'];
            this.setState({
                equation,
                nextIsRestet: false,
                convertedEquation: []
            })
        } else if(this.state.equation.length <= 1) {
            if(equation[equation.length - 1].length === 1) {
                equation = ['0'];
            } else {
                equation[equation.length - 1] = equation[equation.length - 1].slice(0,-1);
            }
            
        } else {
            if(equation[equation.length - 1].length === 1) {
                equation.pop();
            } else {
                equation[equation.length - 1] = equation[equation.length - 1].slice(0,-1);
            }
        }

        this.setState({equation});
    }
    negativeNumber = () => {
        let {equation} = this.state;
        if(!isNaN(equation[equation.length - 1])) {
            let negativeNumber = (equation[equation.length - 1] * -1).toString();
            equation[equation.length - 1] = negativeNumber;
        }
        this.setState({equation});
    }
    

    balancedParathensesis = (equation) => {
        let isOk = true;
        let openningParathensesis = [];

        equation.forEach((element) => {
            if(element === '(') {
                openningParathensesis.push(element);
            } else if(element === ')') {
                if(openningParathensesis.pop() === undefined) {
                    isOk = false;
                }
            }
        })
        
        if(openningParathensesis.length !== 0) {
            isOk = false;
        }

        return isOk;
    }

    equals = () => {
        let {equation, convertedEquation} = this.state;
        
        if(this.balancedParathensesis(equation) && equation.length >= 3) {
            convertedEquation = infixToRpn(equation);
            equation = solveEquation(convertedEquation);
            this.setState({
                equation,
                convertedEquation,
                nextIsRestet: true
            });
        } else if(equation.length < 3) {
            this.setState({convertedEquation: ['Err: Your equation is to short']})
        } else if(!this.balancedParathensesis(equation)) {
            this.setState({convertedEquation: ['Err: Some parenthesis aren\'t closed']})
        }
    }
    render () {

        const buttons = [
            {symbol: 'C', cols: 2, action: this.reset},
            {symbol: '\u2B70', cols: 1, action: this.backspace},
            {symbol: '\u00B1', cols: 1, action: this.negativeNumber},
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
            equationString += item.toString() + ' ';
        })

        this.state.convertedEquation.forEach((item) => {
            convertedEquationString += item.toString() + ' ';
        });
        
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