import React, { Component } from 'react';
import './RobotForm.css';

class RobotForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      date_added: '',
      first_active: '',
      current_name: '',
      height: 0,
      weight: 0,
      intelligence_metric: 0
    }
  }

  componentDidMount() {
    if (this.props.editing) {
      const {
      date_added,
      first_active,
      current_name,
      height,
      weight,
      intelligence_metric
    } = this.props.editing;
      this.setState({
        date_added: date_added.substring(0, 10),
        first_active: first_active.substring(0, 10),
        current_name,
        height,
        weight,
        intelligence_metric
      })
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const robot = this.state;
    if (this.props.editing) {
      const { id } = this.props.editing;
      this.props.editRobot({id ,...robot});
    } else {
      this.props.addRobot(robot);
    }
    this.setState({
      id: null,
      date_added: '',
      first_active: '',
      current_name: '',
      height: 0,
      weight: 0,
      intelligence_metric: 0
    });
  }

  render() {
    return (
      <div className='form-container'>
        <form
          onSubmit={this.handleSubmit} 
          className='robot-form'>
          <label htmlFor='current_name' className='robot-form__label'>Current Name:</label>
          <input 
            type='text' 
            name='current_name' 
            value={this.state.current_name}
            autoComplete='none'
            className='robot-form__input'
            onChange={this.handleChange} />
          <label htmlFor='height' className='robot-form__label'>Height:</label>
          <input 
            type='number' 
            placeholder='feet'
            name='height' 
            value={this.state.height}
            className='robot-form__input'
            onChange={this.handleChange} />
          <label htmlFor='weight' className='robot-form__label'>Weight:</label>
          <input 
            type='number' 
            placeholder='pounds'
            name='weight' 
            value={this.state.weight}
            className='robot-form__input'
            onChange={this.handleChange} />
          <label htmlFor='intelligence_metric' className='robot-form__label'>Intelligence Metric:</label>
          <input 
            type='number'
            step='1'
            min='1'
            max='20' 
            placeholder='From 1 to 20'
            name='intelligence_metric' 
            value={this.state.intelligence_metric}
            className='robot-form__input'
            onChange={this.handleChange} />
          <label htmlFor='date_added' className='robot-form__label'>Date Added:</label>
          <input 
            type='text' 
            name='date_added'
            placeholder='YYYY-MM-DD'
            value={this.state.date_added}
            className='robot-form__input'
            onChange={this.handleChange} />
          <label htmlFor='first_active' className='robot-form__label'>First Active:</label>
          <input 
            type='text' 
            name='first_active'
            placeholder='YYYY-MM-DD' 
            value={this.state.first_active}
            className='robot-form__input'
            onChange={this.handleChange} />
          <input
            type='submit'
            value='Submit'
            className='robot-form__submit' />
        </form>
      </div>
    )
  }
}

export default RobotForm;