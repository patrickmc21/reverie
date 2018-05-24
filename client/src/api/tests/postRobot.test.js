import postRobot from '../postRobot';
import { newRobot } from '../../mock-data';

describe('postRobot', () => {
  let url;
  let options;
  let goodResponse;
  let errorResponse;

  beforeEach(() => {
    url = '/api/v1/hosts';
    options = {
      method: 'POST',
      body: JSON.stringify(newRobot),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    goodResponse = {
      status: 200,
      json: () => {
        return Promise.resolve({id: 3, ...newRobot})
      }
    };
    errorResponse = {
      status: 404,
      json: () => {
        return Promise.resolve({message: 'Invalid input, please supply a current_name'})
      }
    };

    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve(goodResponse);
    });
  });

  it('should call fetch with correct params', () => {
    const expected = [url, options];
    postRobot(newRobot);
    expect(window.fetch).toHaveBeenCalledWith(...expected);
  });

  it('should return the new robot with id', async () => {
    const expected = {id: 3, ...newRobot};
    const results = postRobot(newRobot);
    expect(results).toEqual(expected);
  });

  it('should return error on failed fetch', async () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve(errorResponse);
    });
    const expected = 'Invalid input, please supply a current_name';
    const results = await postRobot(newRobot);
    expect(results.message).toEqual(expected);
  });
})