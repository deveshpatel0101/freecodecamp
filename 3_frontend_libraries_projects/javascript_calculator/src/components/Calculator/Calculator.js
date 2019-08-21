import React from 'react';
import './Calculator.css';

import {
  expressionPreprocessing,
  expressionToStack,
  infixToPostfix,
  calculatePostfix,
} from '../../controller/calculator';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expression: '0',
      splitter: '*/-+^()',
      regExSplitter: /[*]|[/]|[+]|[-]|[^]|[(]|[)]/g,
      operators: '*/-+^',
      openedBrackets: 0,
      value: '0',
    };
  }

  handleClick = (e) => {
    const temp = e.target.value;
    console.log(temp);
    const { expression, splitter, regExSplitter, operators, openedBrackets, value } = this.state;

    // clear
    if (temp === 'clear') {
      this.setState({ expression: '0', value: '0' });
      return;
    }

    // Backspace
    if (temp === 'backspace') {
      let newExpression = expression.slice(0, expression.length - 1);
      let newValue = value.slice(0, value.length - 1);

      if (newExpression === '') {
        newExpression = '0';
      }

      if (newValue === '') {
        newValue = '0';
      }

      // if removing opening brackets
      if (expression[expression.length - 1] === '(') {
        this.setState({ openedBrackets: openedBrackets - 1 });
      }

      // if removing closing brackets
      if (expression[expression.length - 1] === ')') {
        this.setState({ openedBrackets: openedBrackets + 1 });
      }

      // if removing an operator or bracket then changing
      if (splitter.includes(expression[expression.length - 1])) {
        const splittedValue = expression.slice(0, expression.length).split(regExSplitter);
        newValue = splittedValue[splittedValue.length - 2];
      }

      this.setState({ expression: newExpression, value: newValue });
      return;
    }

    // if closing bracket is typed
    if (temp === ')') {
      // if no brackets are opened or closing the bracket immediately after opening it
      if (!openedBrackets || splitter.includes(expression[expression.length - 1])) {
        return;
      }

      this.setState({
        expression: expression + temp,
        openedBrackets: openedBrackets - 1,
        value: '0',
      });
      return;
    }

    // if initial expression is 0
    if (expression === '0') {
      let newValue = temp;
      let newExpression = temp;

      // if operator or brackets is typed
      if (splitter.includes(newValue)) {
        newValue = '0';
        newExpression = expression + temp;
      }

      // if opening bracket is typed
      if (temp === '(') {
        this.setState({ openedBrackets: openedBrackets + 1 });
      }

      this.setState({ expression: newExpression, value: newValue });
      return;
    }

    // if input is operator
    if (operators.includes(temp)) {
      let newExpression = expression + temp;

      // if last character of an expression is an operator
      if (operators.includes(expression[expression.length - 1])) {
        this.setState({ expression: expression.slice(0, expression.length - 1) + temp });
        return;
      }

      // if last character of value is '.' and an operator or bracket is typed
      if (value[value.length - 1] === '.') {
        newExpression = expression + '0' + temp;
      }

      // if last character of expression is opening bracket
      if (expression[expression.length - 1] === '(') {
        newExpression = expression + '0' + temp;
      }

      this.setState({ expression: newExpression, value: '0' });
      return;
    }

    // if retyping 0's
    if (value === '0' && temp === '0') {
      // if last character of expression is an operator or a bracket
      if (splitter.includes(expression[expression.length - 1])) {
        this.setState({ expression: expression + '0' });
      }
      return;
    }

    // if typing a valid number
    if (value !== '0' || temp !== 0) {
      let newValue = value === '0' ? temp : value + temp;
      let newExpression = expression + temp;

      // if opened bracket is typed
      if (temp === '(') {
        this.setState({ openedBrackets: openedBrackets + 1 });
      }

      // if an operator is typed
      if (splitter.includes(temp)) {
        newValue = '0';
      }

      // if last character of expression is '0' and value is '0' and temp is a number
      if (
        expression[expression.length - 1] === '0' &&
        value === '0' &&
        '123456789'.includes(temp)
      ) {
        newExpression = expression.slice(0, expression.length - 1) + temp;
      }

      // if retyping '.'
      if (value.includes('.') && temp === '.') {
        return;
      }

      // if last character of value is '.' and an operator or a bracket is typed
      if (value[value.length - 1] === '.' && splitter.includes(temp)) {
        newExpression = expression + '0' + temp;
      }

      this.setState({ expression: newExpression, value: newValue });
    }
  };

  handleEvaluation = (e) => {
    const { expression, openedBrackets, operators } = this.state;
    if (operators.includes(expression[expression.length - 1]) || openedBrackets > 0) {
      return;
    }
    const preprocessedExpression = expressionPreprocessing(expression);
    const stackExpression = expressionToStack(preprocessedExpression);
    const postfixExpression = infixToPostfix(stackExpression);
    const evaluated = calculatePostfix(postfixExpression);
    this.setState({ expression: String(evaluated), value: String(evaluated) });
  };

  render() {
    return (
      <div className='calculator-container'>
        <div className='row input-container'>
          <div id='display'>{this.state.expression}</div>
        </div>
        <div className='row'>
          <div id='clear'>
            <button value='clear' onClick={this.handleClick}>
              AC
            </button>
          </div>
          <div id='backspace'>
            <button value='backspace' onClick={this.handleClick}>
              &#8592;
            </button>
          </div>
        </div>
        <div className='row'>
          <div id='one'>
            <button value='1' onClick={this.handleClick}>
              1
            </button>
          </div>
          <div id='two'>
            <button value='2' onClick={this.handleClick}>
              2
            </button>
          </div>
          <div id='three'>
            <button value='3' onClick={this.handleClick}>
              3
            </button>
          </div>
          <div id='multiply'>
            <button value='*' onClick={this.handleClick}>
              &#9747;
            </button>
          </div>
        </div>
        <div className='row'>
          <div id='four'>
            <button value='4' onClick={this.handleClick}>
              4
            </button>
          </div>
          <div id='five'>
            <button value='5' onClick={this.handleClick}>
              5
            </button>
          </div>
          <div id='six'>
            <button value='6' onClick={this.handleClick}>
              6
            </button>
          </div>
          <div id='divide'>
            <button value='/' onClick={this.handleClick}>
              &#247;
            </button>
          </div>
        </div>
        <div className='row'>
          <div id='seven'>
            <button value='7' onClick={this.handleClick}>
              7
            </button>
          </div>
          <div id='eight'>
            <button value='8' onClick={this.handleClick}>
              8
            </button>
          </div>
          <div id='nine'>
            <button value='9' onClick={this.handleClick}>
              9
            </button>
          </div>
          <div id='add'>
            <button value='+' onClick={this.handleClick}>
              &#43;
            </button>
          </div>
        </div>
        <div className='row'>
          <div id='openbracket'>
            <button value='(' onClick={this.handleClick}>
              &#40;
            </button>
          </div>
          <div id='closebracket'>
            <button value=')' onClick={this.handleClick}>
              &#41;
            </button>
          </div>
          <div id='zero'>
            <button value='0' onClick={this.handleClick}>
              0
            </button>
          </div>
          <div id='subtract'>
            <button value='-' onClick={this.handleClick}>
              &#8315;
            </button>
          </div>
        </div>
        <div className='row'>
          <div id='decimal'>
            <button value='.' onClick={this.handleClick}>
              .
            </button>
          </div>
          <div id='power'>
            <button value='^' onClick={this.handleClick}>
              &#8743;
            </button>
          </div>
        </div>
        <div className='row'>
          <div id='equals'>
            <button value='=' onClick={this.handleEvaluation}>
              &#61;
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
