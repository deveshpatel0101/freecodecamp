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
      <div className='quote-container' id='quote-box' style={{ color: this.props.color }}>
        {this.state.quote && (
          <p className='quote-text' id='text'>
            <span className='left-double-quotes'> &#8220;</span>
            {this.state.quote}
            <span className='right-double-quotes'>&#8221;</span>
          </p>
        )}
        {this.state.author && (
          <p className='quote-author' id='author'>
            &#8212;&nbsp;&nbsp;{this.state.author}
          </p>
        )}
        <div className='quote-footer'>
          <a
            href={`https://twitter.com/intent/tweet?status=${
              this.state.quote
            }%0A%E2%80%94%20%20${this.state.author}`}
            id='tweet-quote'
            target='_blank'
            rel='noopener noreferrer'
          >
            <button style={{ backgroundColor: this.props.color }}>Tweet Quote</button>
          </a>
          <button
            style={{ backgroundColor: this.props.color }}
            id='new-quote'
            onClick={this.newQuote}
          >
            New Quote
          </button>
        </div>
      </div>
    );
  }
}

export default Quote;
