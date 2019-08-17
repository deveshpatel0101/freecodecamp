import React from 'react';
import './App.css';

import initialText from './initialText';

const marked = require('marked');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: '',
    };
  }

  componentWillMount() {
    this.setState({ markdown: initialText });
  }

  handleChange = (e) => {
    const temp = e.target.value;
    this.setState({ markdown: temp });
  };

  render() {
    return (
      <div className='App'>
        <div className='input-container'>
          <textarea
            type='text'
            name='markdown'
            id='editor'
            placeholder='Jot something down'
            value={this.state.markdown}
            onChange={this.handleChange}
          />
        </div>
        <div
          className='output-container'
          id='preview'
          dangerouslySetInnerHTML={{ __html: marked(this.state.markdown) }}
        />
      </div>
    );
  }
}

export default App;
