import React from 'react';
import './RobotCard.css';

const RobotCard = ({robot, triggerForm, removeRobot, classType}) => {
  return (
    <article className={`robot-card ${classType}`}>
      <ul className='robot-card__list'>
        <li className='robot-card__list--list-item'>
          {robot.current_name} 
        </li>
        <li className='robot-card__list--list-item'>
          {robot.height}
        </li>
        <li className='robot-card__list--list-item'>
          {robot.weight}
        </li>
        <li className='robot-card__list--list-item'>
          {robot.intelligence_metric}
        </li>
        <li className='robot-card__list--list-item'>
          {robot.date_added.substring(0, 10)}
        </li>
        <li className='robot-card__list--list-item'>
          {robot.first_active.substring(0, 10)}
        </li>
        <li className='robot-card__list--list-item'>
          <button 
            className='edit-robot'
            onClick={() => triggerForm(robot)}></button>
        </li>
        <li className='robot-card__list--list-item'>
          <button
            className='delete-robot'
            onClick={() => removeRobot(robot.id)}></button>
        </li>
      </ul>
    </article>
  )
};

export default RobotCard;