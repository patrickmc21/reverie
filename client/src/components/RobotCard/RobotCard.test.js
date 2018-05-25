import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import RobotCard from './index';
import { mockRobots } from '../../mock-data';

describe('RobotCard', () => {

  let wrapper;
  let mockRobot;
  let mockTriggerForm;
  let mockRemoveRobot;

  beforeEach(() => {
    mockRobot = mockRobots[0];
    mockTriggerForm = jest.fn();
    mockRemoveRobot = jest.fn();
    wrapper = shallow(
      <RobotCard
       robot={mockRobots[0]}
       triggerForm={mockTriggerForm}
       removeRobot={mockRemoveRobot}
       classType='even' />
    );
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call triggerForm on button click', () => {
    const expected = mockRobot;
    wrapper.find('.edit-robot').simulate('click');
    expect(mockTriggerForm).toHaveBeenCalledWith(expected);
  });

  it('should call removeRobot on button click', () => {
    const expected = mockRobot.id;
    wrapper.find('.delete-robot').simulate('click');
    expect(mockRemoveRobot).toHaveBeenCalledWith(expected);
  });
});