import React, { Component } from 'react';
import './App.css';
import ai from './ai.jpg'
const synth = window.speechSynthesis

class App extends Component {
  state = {
    msg: '',
    i: 0,
    answer:'',
    show: false,
    filteredValue: ''
  }

  handelchange = (e) => {
    const string= 'sam says sweet sounds sung so softly'['split']('')
    const newstate = [...this.state.msg]
    newstate.push(string[this.state.i])

    this.setState({
      show: false,
      msg: newstate.join(''),
      answer: this.state.answer+ e.target.value[e.target.value.length-1],
      filteredValue: ''
    }, () => {
      this.setState({
        i: this.state.i +1
      })
    })
  }

  handelSubmit= (e) => {
    e.preventDefault()
    let filteredValue;
    const checkValue = this.state.answer.match(/\/.+\//g)
    if(checkValue!== null){
      filteredValue=checkValue.join('').replace(/\//g,'')
    }

    this.setState({
      msg: '',
      i: 0,
      show: true,
      filteredValue: !filteredValue ? 'Don\'t waste my time Human' : filteredValue,
      answer: ''
    }, () => {
        const msg = new SpeechSynthesisUtterance();
        msg.text = this.state.filteredValue
        msg.voice = synth.getVoices()[1]
        synth.speak(msg)
    })
    e.currentTarget.reset()
  }

  reset = () => {
    this.setState({
      msg: '',
      i: 0,
      answer:'',
      show: false,
      filteredValue: ''
    }, () => this.inputText.value = '')
  }

  render() {
    return (
      <div className="container">
        <header className="App-header">
        <h3>Sam Says Sweet Sounds</h3>
          <img src={ai} alt=""/>
          <br/><br/>
          <p style={{textAlign: "left"}}>Is there something that you'd like to know? Sam is cutting edge AI bot that can answer any question that you might have, but first you have to implore with Sam before asking you questions.& be cautious, Sam can feel your energy & makes it's own decisions based on it.</p>
          <form onSubmit={this.handelSubmit}>
            <input type="text" value={this.state.msg} onChange={this.handelchange} className="u-full-width" placeholder="Implore :)"/><br/>
            <input type="text"  className="u-full-width" placeholder="Your Question?" ref={input => this.inputText=input} /><br />
            <button type="submit" className="button-primary">Ask Sam</button>{' '}
            <button type="button" className="button-primary" onClick={this.reset}>Reset</button>
          </form>
          <div className="wrapper">
            {this.state.show && <h3> {this.state.filteredValue}</h3>}
          </div>
        </header>
        <p style={{marginTop:20}}>How do you implore with Sam? Using "sam says sweet sounds sung so softly" work the best, but please be compassionate</p>
      </div>
    );
  }
}

export default App;
