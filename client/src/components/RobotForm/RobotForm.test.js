import React from 'react';
import { shallow } from 'enzyme';
import RobotForm from './index';
import { mockRobots, updatedRobot } from '../../mock-data';

describe('RobotForm', () => {

  let mockEditRobot;
  let mockAddRobot;
  let mockEditing;
  let wrapper;

  beforeEach(() => {
    mockEditRobot = jest.fn();
    mockAddRobot = jest.fn();
    mockEditing = null;
    wrapper = shallow(
      <RobotForm
        editRobot={mockEditRobot}
        addRobot={mockAddRobot}
        editing={mockEditing} />
    );
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot if editing card present', () => {
    mockEditing = mockRobots[0];
    wrapper = shallow(
      <RobotForm
        editRobot={mockEditRobot}
        addRobot={mockAddRobot}
        editing={mockEditing} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should set state on handleChange', () => {
    const mockEvent = {target: {name: 'height', value: 4.5}};
    const expected = 4.5;
    wrapper.instance().handleChange(mockEvent);
    expect(wrapper.state('height')).toEqual(expected);
  });

  it('should call addRobot in handleSubmit if not editing', () => {
    const mockEvent = {preventDefault: jest.fn()};
    wrapper.setState({...mockRobots[0]});
    const expected = mockRobots[0];
    wrapper.instance().handleSubmit(mockEvent);
    expect(mockAddRobot).toHaveBeenCalledWith(expected);
  });

  it('should call editRobot in handleSubmit if editing', () => {
    const mockEvent = {preventDefault: jest.fn()};
    mockEditing = mockRobots[0];
    wrapper = shallow(
      <RobotForm
        editRobot={mockEditRobot}
        addRobot={mockAddRobot}
        editing={mockEditing} />
    );
    wrapper.setState({...updatedRobot});
    const expected = updatedRobot;
    wrapper.instance().handleSubmit(mockEvent);
    expect(mockEditRobot).toHaveBeenCalledWith(expected);
  });

  it('should reset state in handleSubmit', async () => {
    const mockEvent = {preventDefault: jest.fn()};
    wrapper.setState({...mockRobots[0]});
    const expected = {
      id: null,
      date_added: '',
      first_active: '',
      current_name: '',
      height: 0,
      weight: 0,
      intelligence_metric: 0
    };
    await wrapper.instance().handleSubmit(mockEvent);
    expect(wrapper.state()).toEqual(expected);
  });

});