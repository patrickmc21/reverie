import getAllRobots from '../getAllRobots';
import { mockRobots } from '../../mock-data';

describe('getAllRobots', () => {

  let url;
  let errorResponse;
  let goodResponse;

  beforeEach(() => {
    url = '/api/v1/hosts';
    goodResponse = {
      status: 200,
      json: () => {
        return Promise.resolve(mockRobots)
      }
    };

    errorResponse = {
      status: 500,
      message: 'Failed to fetch'
    };

    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve(goodResponse)
    });
  });

  it('should call fetch with the correct params', () => {
    const expected = url;
    getAllRobots();
    expect(window.fetch).toHaveBeenCalledWith(expected)
  });

  it('should return an array of data', async () => {
    const expected = mockRobots;
    const results = await getAllRobots();
    expect(results).toEqual(expected);
  });

  it('should throw an error on failed fetch request', async () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve(errorResponse)
    });

    const expected = errorResponse;
    const results = await getAllRobots();
    expect(results).toEqual(expected);
  });

});