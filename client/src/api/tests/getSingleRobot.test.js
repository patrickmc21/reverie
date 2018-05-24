import getSingleRobot from '../getSingleRobot';
import mockRobots from '../../mock-data';

describe('getSingleRobot', () => {

  let url;
  let goodResponse;
  let errorResponse;

  beforeEach(() => {
    url = '/api/v1/hosts/1';
    goodResponse = {
      status: 200,
      json: () => {
        return Promise.resolve(mockRobots[0]);
      }
    };
    errorResponse = {
      status: 404,
      json: () => {
        return Promise.resolve({message: 'Entry not found'})
      }
    };

    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve(goodResponse)
    });
  });
});