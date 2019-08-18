import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'one',
      one: {
        q: { id: 'chord-1', src: 'audios/one_Q.mp3' },
        w: { id: 'chord-2', src: 'audios/one_W.mp3' },
        e: { id: 'chord-3', src: 'audios/one_E.mp3' },
        a: { id: 'give-us-a-light', src: 'audios/one_A.mp3' },
        s: { id: 'dry-ohh', src: 'audios/one_S.mp3' },
        d: { id: 'bld-h1', src: 'audios/one_D.mp3' },
        z: { id: 'punchy-kick-1', src: 'audios/one_Z.mp3' },
        x: { id: 'side-kick-1', src: 'audios/one_X.mp3' },
        c: { id: 'brk-snr', src: 'audios/one_C.mp3' },
      },
      two: {
        q: { id: 'heater-1', src: 'audios/two_Q.mp3' },
        w: { id: 'heater-2', src: 'audios/two_W.mp3' },
        e: { id: 'heater-3', src: 'audios/two_E.mp3' },
        a: { id: 'heater-4', src: 'audios/two_A.mp3' },
        s: { id: 'clap', src: 'audios/two_S.mp3' },
        d: { id: 'open-hh', src: 'audios/two_D.mp3' },
        z: { id: 'kick-n-hat', src: 'audios/two_Z.mp3' },
        x: { id: 'kick', src: 'audios/two_X.mp3' },
        c: { id: 'closed-hh', src: 'audios/two_C.mp3' },
      },
      displayText: null,
      allowedKey: 'qweasdzxc',
    };
  }

  componentDidMount() {
    const that = this;
    document.addEventListener('keypress', function(e) {
      if (!that.state.allowedKey.includes(e.key.toLowerCase())) {
        return;
      }
      const state = that.state;
      that.setState({ displayText: state[state.selected][e.key.toLowerCase()].id });
      const element = document.getElementById(state[state.selected][e.key.toLowerCase()].id);
      element.classList.add('active');
      setTimeout(() => {
        element.classList.remove('active');
      }, 150);
      element.children[0].play();
    });
  }

  handleClick = (e) => {
    this.setState({
      displayText: this.state[this.state.selected][e.target.innerText.toLowerCase()].id,
    });
    e.target.children[0].play();
  };

  handleDrumType = (e) => {
    this.setState((prevState) => ({ selected: prevState.selected === 'one' ? 'two' : 'one' }));
  };

  render() {
    const { q, w, e, a, s, d, z, x, c } = this.state[this.state.selected];
    return (
      <div className='drum-container'>
        <div id='drum-machine'>
          <div id='audios'>
            <div className='audios-inner-container'>
              <div className='drum-pad' id={q.id} onClick={this.handleClick}>
                Q<audio controls src={q.src} type='audio/mp3' className='clip' id='Q' />
              </div>
              <div className='drum-pad' id={w.id} onClick={this.handleClick}>
                W<audio controls src={w.src} type='audio/mp3' className='clip' id='W' />
              </div>
              <div className='drum-pad' id={e.id} onClick={this.handleClick}>
                E<audio controls src={e.src} type='audio/mp3' className='clip' id='E' />
              </div>
              <div className='drum-pad' id={a.id} onClick={this.handleClick}>
                A<audio controls src={a.src} type='audio/mp3' className='clip' id='A' />
              </div>
              <div className='drum-pad' id={s.id} onClick={this.handleClick}>
                S<audio controls src={s.src} type='audio/mp3' className='clip' id='S' />
              </div>
              <div className='drum-pad' id={d.id} onClick={this.handleClick}>
                D<audio controls src={d.src} type='audio/mp3' className='clip' id='D' />
              </div>
              <div className='drum-pad' id={z.id} onClick={this.handleClick}>
                Z<audio controls src={z.src} type='audio/mp3' className='clip' id='Z' />
              </div>
              <div className='drum-pad' id={x.id} onClick={this.handleClick}>
                X<audio controls src={x.src} type='audio/mp3' className='clip' id='X' />
              </div>
              <div className='drum-pad' id={c.id} onClick={this.handleClick}>
                C<audio controls src={c.src} type='audio/mp3' className='clip' id='C' />
              </div>
            </div>
          </div>
          <div className='options'>
            <div id='display'>
              <div>{this.state.displayText && this.state.displayText}</div>
            </div>
            <div className='drum-type'>
              Bank
              <div className='toggler' onClick={this.handleDrumType}>
                <div
                  className='inner-toggler'
                  style={{ float: this.state.selected === 'one' ? 'left' : 'right' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
