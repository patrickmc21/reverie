import getSingleRobot from '../getSingleRobot';
import { mockRobots } from '../../mock-data';

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

  it('should call fetch with correct params', () => {
    const expected = url;
    getSingleRobot(1);
    expect(window.fetch).toHaveBeenCalledWith(expected);
  });

  it('should return a single robot object', async () => {
    const expected = mockRobots[0];
    const results = await getSingleRobot(1);
    expect(results).toEqual(expected);
  });

  it('should return an error on failed fetch', async () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject(errorResponse);
    });
    const expected = errorResponse;
    const results = getSingleRobot(1);
    expect(results).rejects.toEqual(expected)
  });
});
