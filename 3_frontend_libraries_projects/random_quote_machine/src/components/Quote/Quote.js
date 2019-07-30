import React from 'react';
import './Quote.css';

import { getQuote } from '../../controllers/quote';

class Quote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: '',
      author: '',
      loaded: false,
      colorCode: '',
    };
  }

  componentWillMount() {
    this.newQuote();
  }

  newQuote = (newCode) => {
    getQuote().then((res) => {
      if (newCode) {
        this.props.newColorCode();
      }
      this.setState({ quote: res.content, author: res.author });
    });
  };

  render() {
    return (
      <div className='quote-container' style={{ color: this.props.color }}>
        {this.state.quote && (
          <p className='quote-text'>
            <span className='left-double-quotes'> &#8220;</span>
            {this.state.quote}
            <span className='right-double-quotes'>&#8221;</span>
          </p>
        )}
        {this.state.author && (
          <p className='quote-author'>&#8212;&nbsp;&nbsp;{this.state.author}</p>
        )}
        <div className='quote-footer'>
          <button style={{ backgroundColor: this.props.color }} onClick={this.newQuote}>
            New Quote
          </button>
        </div>
      </div>
    );
  }
}

export default Quote;
