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
        if(this.state.nextIsRestet) {
            this.setState({
                equation: [symbol],
                nextIsRestet: false,
                convertedEquation: []
            })
        } else {
            let {equation} = this.state;
            if(equation.length === 1 && equation[equation.length - 1] === '0') {
                let {equation} = this.state;
                equation[0] = symbol;
            } else {
                if(!isNaN(equation[equation.length - 1]) && ['+', '-', '*', '/', '^', '(', ')'].indexOf(symbol) === -1) {
                    equation[equation.length - 1] = equation[equation.length - 1] + symbol;
                } else if(isNaN(equation[equation.length - 1]) && 
                    ['+', '-', '*', '/', '^'].indexOf(equation[equation.length - 1]) !== -1 && 
                    ['+', '-', '*', '/', '^', '(', ')'].indexOf(symbol) !== -1) {
                    equation[equation.length - 1] = symbol;
                } else {
                    equation = [...equation, symbol];
                }
            }
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
    

    isEquationRight = (equation) => {
        let isOk = true;
        let operators = ['+', '-', '/', '*', '^', '.'];
        if(equation.length < 3) {
            isOk = false;
        }
        equation.forEach((item, index) => {
            if(item === '(') {
                if(equation[index + 1] === ')') {
                    isOk = false;
                }
            } else if (item === ')') {
                if(equation[index + 1] === '(') {
                    isOk = false;
                }
            } else if(operators.indexOf(item) !== -1) {
                if(operators.indexOf(equation[index + 1]) !== -1) {
                    isOk = false;
                }
            }

        })

        return isOk;
    }

    equals = () => {
        let {equation, convertedEquation} = this.state;
        
        if(this.isEquationRight(equation)) {
            convertedEquation = infixToRpn(equation);
            equation = solveEquation(convertedEquation);
            this.setState({
                equation,
                convertedEquation,
                nextIsRestet: true
            });
        } else {
            this.setState({convertedEquation: ['Your equation is wrong']})
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
            equationString += item + ' ';
        })

        this.state.convertedEquation.forEach((item) => {
            convertedEquationString += item + ' ';
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