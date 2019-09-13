export const infixToRpn = (equation) => {
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

export const solveEquation = (equation) => {
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

    return stack.map(String);
}