import React, { Component } from 'react';
import api from '../../api';
import RobotContainer from '../RobotContainer';
import RobotForm from '../RobotForm';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      robots: [],
      showRobotForm: false,
      editing: null,
      errorStatus: ''
    };
  }

  async componentDidMount() {
    const robots = await api.getAllRobots();
    this.setState({ robots });
  }

  addRobot = async (newRobot) => {
    try {
      const robot = await api.postRobot(newRobot);
      const robots = [...this.state.robots, robot];
      this.setState({ robots, showRobotForm: false });
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
      this.setState({ robots, showRobotForm: false, editing: null });
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

  triggerForm = (robot) => {
    if (robot) {
      this.setState({showRobotForm: true, editing: robot})
    } else {
      this.setState({showRobotForm: true});
    }
  }

  render() {
    const { robots, showRobotForm, editing } = this.state;
    const { addRobot, editRobot, removeRobot, triggerForm } = this;
    return (
      <div className="App">
        <header className="App-header">
          <h1 
            className="App-title">
            robot
            <span className='header--sub'>
              Portal
            </span>
          </h1>
          <h2 className='user-name'>Welcome, Dr. Robert Ford!</h2>
        </header>
        <main>
          <RobotContainer 
            robots={robots}
            triggerForm={triggerForm}
            removeRobot={removeRobot}
          />
          { showRobotForm && 
            <RobotForm 
              editRobot={editRobot} 
              addRobot={addRobot}
              editing={editing}/> }
        </main>
      </div>
    );
  }
}

export default App;
