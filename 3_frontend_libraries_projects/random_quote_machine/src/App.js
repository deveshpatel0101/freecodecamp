import React from 'react';
import './App.css';

import Quote from './components/Quote/Quote';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#9c1c1c',
    };
    this.colorCodes = [
      '#9c1c1c',
      '#9c3c1c',
      '#9c5c1c',
      '#9c7c1c',
      '#9c9c1c',
      '#7c9c1c',
      '#5c9c1c',
      '#3c9c1c',
      '#1c9c1c',
      '#1c9c3c',
      '#1c9c5c',
      '#1c9c7c',
      '#1c9c9c',
      '#1c7c9c',
      '#1c5c9c',
      '#1c3c9c',
      '#1c1c9c',
      '#3c1c9c',
      '#5c1c9c',
      '#7c1c9c',
      '#9c1c9c',
      '#9c1c7c',
      '#9c1c5c',
      '#9c1c3c',
      '#9c1c1c',
    ];
  }

  componentWillMount() {
    this.newColorCode();
  }

  newColorCode = () => {
    const random = Math.floor(Math.random() * 25);
    this.setState({ color: this.colorCodes[random] });
  };

  render() {
    return (
      <div className='App' style={{ backgroundColor: this.state.color }}>
        <Quote color={this.state.color} newColorCode={this.newColorCode} />
      </div>
    );
  }
}

export default App;
