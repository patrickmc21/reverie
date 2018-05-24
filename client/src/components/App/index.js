import React, { Component } from 'react';
import logo from '../../logo.svg';
import api from '../../api';
import RobotContainer from '../RobotContainer';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      robots: [],
      robotField: false,
      errorStatus: ''
    };
  }

  async componentDidMount() {
    const robots = await api.getAllRobots();
    this.setState({ robots });
  }

  addRobot = async (newRobot) => {
    try {
      const robot = api.postRobot(robot);
    } catch (error) {
      this.setState({ errorStatus: error });
    }
  }

  editRobot = async (changedRobot) => {
    try {
      const updatedRobot = await api.updateRobot(changedRobot);
      const robots = this.state.robots.map(robot => {
        if (robot.id === changedRobot.id) {
          return updatedRobot;
        } else {
          return robot
        }
      });
      this.setState({ robots });
    } catch (error) {
      this.setState({ errorStatus: error });
    }
  }

  removeRobot = async (id) => {
    try {
      await api.deleteRobot(id);
      const robots = this.state.robots.filter(robot => robot.id !== id);
      this.setState({ robots });
    } catch (error) {
      this.setState({ errorStatus: error });
    }
  }

  render() {
    const { robots, robotField } = this.state;
    const { addRobot, editRobot, removeRobot } = this;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <main>
          <RobotContainer 
            robots={robots}
            editRobot={editRobot}
            removeRobot={removeRobot}
          />
        </main>
      </div>
    );
  }
}

export default App;
