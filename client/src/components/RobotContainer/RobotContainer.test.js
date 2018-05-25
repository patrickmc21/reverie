import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import RobotContainer from './index';
import { mockRobots } from '../../mock-data';

describe('RobotContainer', () => {

  let mockTriggerForm;
  let mockRemoveRobot;
  let wrapper;

  beforeEach(() => {
    mockTriggerForm = jest.fn();
    mockRemoveRobot = jest.fn();
    wrapper = shallow(
      <RobotContainer
        robots={mockRobots}
        triggerForm={mockTriggerForm}
        removeRobot={mockRemoveRobot} />
    );
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call triggerForm on add robot click', () => {
    wrapper.find('.add-robot').simulate('click');
    expect(mockTriggerForm).toHaveBeenCalledTimes(1);
  });
})
