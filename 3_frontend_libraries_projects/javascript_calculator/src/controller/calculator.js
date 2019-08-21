const operators = '+-*/^';
const brackets = '()';

// const preprocessedExpression = expressionPreprocessing(expression);
// const stackExpression = expressionToStack(preprocessedExpression);
// const postfixExpression = infixToPostfix(stackExpression);
// const evaluated = calculatePostfix(postfixExpression);

// console.log('Expression: ', expression);
// console.log('Preprocessed: ', preprocessedExpression);
// console.log('Expression Stack: ', stackExpression);
// console.log('Postfix: ', postfixExpression);
// console.log('Evaluated: ', evaluated);

export const calculatePostfix = (exp) => {
  let stack = ['N'];
  for (let i = 0; i < exp.length; i++) {
    if (!isNaN(exp[i])) {
      stack.push(exp[i]);
    } else if (operators.includes(exp[i])) {
      const b = Number(stack.pop());
      const a = Number(stack.pop());
      stack.push(evaluateOperator(a, b, exp[i]));
    }
  }
  return stack.pop();
};

export const evaluateOperator = (a, b, op) => {
  switch (op) {
    case '^':
      return a ** b;
    case '*':
      return a * b;
    case '/':
      return a / b;
    case '+':
      return a + b;
    case '-':
      return a - b;
  }
};

export const infixToPostfix = (exp) => {
  let postfix = [];
  let stack = ['N'];
  for (let i = 0; i < exp.length; i++) {
    let char = exp[i];
    if (!isNaN(char)) {
      postfix.push(char);
    } else if (char === '(') {
      stack.push(char);
    } else if (char === ')') {
      while (stack[stack.length - 1] !== 'N' && stack[stack.length - 1] !== '(') {
        let newChar = stack[stack.length - 1];
        stack.pop();
        postfix.push(newChar);
      }
      if (stack[stack.length - 1] === '(') {
        stack.pop();
      }
    } else {
      const isPrecedenceGreater = precedence(stack[stack.length - 1]) >= precedence(char);
      while (stack[stack.length - 1] !== 'N' && isPrecedenceGreater) {
        let newChar = stack[stack.length - 1];
        stack.pop();
        postfix.push(newChar);
      }
      stack.push(char);
    }
  }
  while (stack[stack.length - 1] !== 'N') {
    let newChar = stack[stack.length - 1];
    stack.pop();
    postfix.push(newChar);
  }
  return postfix;
};

function precedence(c) {
  if (c === '^') {
    return 3;
  } else if (c === '*' || c === '/') {
    return 2;
  } else if (c === '+' || c === '-') {
    return 1;
  }
  return -1;
}

export const expressionPreprocessing = (exp) => {
  exp = exp.replace(/[0-9][(]/g, function(match) {
    return match[0] + '*(';
  });
  exp = exp.replace(/[)][0-9]/g, function(match) {
    return ')*' + match[1];
  });
  return exp;
};

export const expressionToStack = (exp) => {
  const arr = [];
  let temp = '';

  for (let i = 0; i < exp.length; i++) {
    if (!brackets.includes(exp[i]) && !operators.includes(exp[i])) {
      temp += exp[i];
    } else if (operators.includes(exp[i]) && temp !== '') {
      arr.push(temp, exp[i]);
      temp = '';
    } else if (operators.includes(exp[i]) && temp === '') {
      arr.push(exp[i]);
    } else if (exp[i] === '(') {
      arr.push(exp[i]);
      temp = '';
    } else if (exp[i] === ')') {
      arr.push(temp, exp[i]);
      temp = '';
    } else {
      return 'Invalid Expression';
    }
  }

  if (temp !== '') {
    arr.push(temp);
  }

  if (!validateExpression(arr)) {
    return 'Invalid Expression';
  }

  return arr;
};

export const validateExpression = (exp) => {
  let valid = 0;
  for (let i = 0; i < exp.length; i++) {
    if (operators.includes(exp[i]) || exp[i] === ')') {
      valid--;
    } else if (!operators.includes(exp[i]) || exp[i] === '(') {
      valid++;
    }
  }
  if (valid === 1) {
    return true;
  }
  return false;
};
