import deleteRobot from '../deleteRobot';

describe('deleteRobot', () => {

  let url;
  let options;
  let goodResponse;
  let errorResponse;

  beforeEach(() => {
    url = '/api/v1/hosts/1';
    options = {
      method: 'DELETE'
    };
    goodResponse = {
      status: 200,
      json: () => {
        return Promise.resolve({message: 'Robot Data Deleted'});
      }
    };

    errorResponse = {
      status: 404,
      message: 'Entry not found'
    };

    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve(goodResponse);
    });
  });

  it('should call fetch with correct params', () => {
    const expected = [url, options];
    deleteRobot(1);
    expect(window.fetch).toHaveBeenCalledWith(...expected);
  });

  it('should return message on successful delete', async () => {
    const expected = 'Robot Data Deleted';
    const results = await deleteRobot(1);
    expect(results.message).toEqual(expected);
  });

  it('should return error on failed delete', async () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject(errorResponse);
    });
    
    const expected = errorResponse;
    const results = deleteRobot(1);
    expect(results).rejects.toEqual(expected);
  });
});