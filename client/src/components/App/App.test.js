import React from 'react';
import { shallow } from 'enzyme';
import api from '../../api';
import App from './index';
import { mockRobots, newRobot, updatedRobot } from '../../mock-data';

jest.mock('../../api');

describe('App', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />, {disableLifecycleMethods: true});
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot when form is active', () => {
    wrapper.setState({showRobotForm: true});
    expect(wrapper).toMatchSnapshot();
  });

  it('should call fetchAllRobots on mount', () => {
    const spy = jest.spyOn(wrapper.instance(), 'fetchAllRobots');
    wrapper.instance().componentDidMount();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should not fetch robots on mount if fetch has happened', () => {
    const spy = jest.spyOn(wrapper.instance(), 'fetchAllRobots');
    wrapper.setState({madeInitialCall: true});
    wrapper.instance().componentDidMount();
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('should call api getAllRobots in fetchAllRobots', () => {
    wrapper.instance().fetchAllRobots();
    expect(api.getAllRobots).toHaveBeenCalled();
  });

  it('should call api postRobot in addRobot method', () => {
    const expected = newRobot;
    wrapper.instance().addRobot(newRobot);
    expect(api.postRobot).toHaveBeenCalledWith(expected);
  });

  it('should update robot state on addRobot', async () => {
    const expected = [newRobot];
    await wrapper.instance().addRobot(newRobot);
    expect(wrapper.state('robots')).toEqual(expected);
  });

  it('should change errorStatus on failed fetch', async () => {
    const expected = 'Failed Fetch';
    await wrapper.instance().addRobot();
    expect(wrapper.state('errorStatus')).toEqual(expected);
  });

  it('should call api updateRobot in editRobot method', () => {
    const expected = updatedRobot;
    wrapper.instance().editRobot(updatedRobot);
    expect(api.updateRobot).toHaveBeenCalledWith(expected);
  });

  it('should update state on editRobot', async () => {
    const expected = updatedRobot;
    wrapper.setState({robots: mockRobots});
    await wrapper.instance().editRobot(updatedRobot);
    expect(wrapper.state('robots')[1]).toEqual(expected);
  });

  it('should change errorStatus on failed fetch', async () => {
    const expected = 'Failed Fetch';
    await wrapper.instance().editRobot();
    expect(wrapper.state('errorStatus')).toEqual(expected);
  });

  it('should call api deleteRobot in removeRobot method', () => {
    const expected = 1;
    wrapper.instance().removeRobot(1);
    expect(api.deleteRobot).toHaveBeenCalledWith(expected);
  });

  it('should update state on removeRobot', async () => {
    const expected = [mockRobots[1]];
    wrapper.setState({robots: mockRobots});
    await wrapper.instance().removeRobot(1);
    expect(wrapper.state('robots')).toEqual(expected);
  });

  it('should change errorStatus on failed fetch', async () => {
    const expected = 'Failed Fetch';
    await wrapper.instance().removeRobot();
    expect(wrapper.state('errorStatus')).toEqual(expected);
  });

  it('should change showRobotForm to true on triggerForm', () => {
    const expected = true;
    wrapper.instance().triggerForm();
    expect(wrapper.state('showRobotForm')).toEqual(expected);
  });

  it('should change editing state to robot object if robot provided', () => {
    const expected = newRobot;
    wrapper.instance().triggerForm(newRobot);
    expect(wrapper.state('editing')).toEqual(expected);
  });
});

