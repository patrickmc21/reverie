import React from 'react';
import RobotCard from '../RobotCard';
import './RobotContainer.css';

const RobotContainer = ({robots, triggerForm, removeRobot}) => {
  const robotCards = robots.map(robot => {
    return (
      <RobotCard
        key={robot.id}
        robot={robot}
        triggerForm={triggerForm}
        removeRobot={removeRobot}
      />
    )
  })

  return (
    <section className='App__robot-container'>
      <button className='add-robot' onClick={() => triggerForm()}>Add Robot</button>
      <div className='card-container'>
        <article className='robot-card'>
          <ul className='robot-card__list even'>
            <li className='robot-card__list--list-item'>
              Name:
            </li>
            <li className='robot-card__list--list-item'>
              Height (feet):
            </li>
            <li className='robot-card__list--list-item'>
              Weight (pounds):
            </li>
            <li className='robot-card__list--list-item'>
              Intelligence (1 - 20):
            </li>
            <li className='robot-card__list--list-item'>
              Date Added:
            </li>
            <li className='robot-card__list--list-item'>
              First Active:
            </li>
          </ul>
        </article>
        {robotCards}
      </div>
    </section>
  )
}

export default RobotContainer;