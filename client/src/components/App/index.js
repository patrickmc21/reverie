import React, { Component } from 'react';
import logo from '../../logo.svg';
import Nav from '../Nav';
import RobotContainer from '../RobotContainer';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      robots: []
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <main>
          <Nav />
          <RobotContainer />
        </main>
      </div>
    );
  }
}

export default App;
