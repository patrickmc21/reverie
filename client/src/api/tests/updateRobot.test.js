import updateRobot from '../updateRobot';
import { updatedRobot } from '../../mock-data';

describe('updateRobot', () => {

  let url;
  let options;
  let goodResponse;
  let errorResponse;

  beforeEach(() => {
    url = '/api/v1/hosts/3';
    options = {
      method: 'PUT',
      body: JSON.stringify(updatedRobot),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    goodResponse = {
      status: 200,
      json: () => {
        return Promise.resolve(updatedRobot)
      }
    };

    errorResponse = {
      status: 404,
      json: () => {
        return Promise.resolve({message: 'Entry not found'})
      }
    };

    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve(goodResponse);
    });
  });

  it('should call fetch with correct params', () => {
    const expected = [url, options];
    updateRobot(updatedRobot);
    expect(window.fetch).toHaveBeenCalledWith(...expected);
  });

  it('should return the updated robot', async () => {
    const expected = updatedRobot;
    const results = await updateRobot(updatedRobot);
    expect(results).toEqual(expected);
  });

  it('should return error message on failed request', async () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve(errorResponse);
    });
    const expected = 'Entry not found';
    const results = await updateRobot(updatedRobot);
    expect(results.message).toEqual(expected);
  });
});