import { mockRobots, newRobot, updatedRobot } from '../../mock-data';

const api = {
  deleteRobot: jest.fn().mockImplementation((id) => {
    if (!id) {
      return Promise.reject({message: 'Failed Fetch'});
    }
  }), 
  getAllRobots: jest.fn().mockImplementation(() => {
    return Promise.resolve(mockRobots);
  }), 
  getSingleRobot: jest.fn().mockImplementation((id) => {
    if (id) {
      return Promise.resolve(mockRobots[0]);
    } else {
      return Promise.reject({message: 'Failed Fetch'});
    }
  }), 
  postRobot: jest.fn().mockImplementation((robot) => {
    if (robot) {
      return Promise.resolve(newRobot);
    } else {
      return Promise.reject({message: 'Failed Fetch'});
    }
  }), 
  updateRobot: jest.fn().mockImplementation((robot) => {
    if (robot) {
      return Promise.resolve(updatedRobot);
    } else {
      return Promise.reject({message: 'Failed Fetch'});
    }
  })
};

export default api;