import deleteRobot from '../deleteRobot';

describe('deleteRobot', () => {

  let url;
  let goodResponse;
  let errorResponse;

  beforeEach(() => {
    url = '/api/v1/hosts/1';
    goodResponse = {
      status: 200,
      json: () => {
        return Promise.resolve({message: 'Robot Data Deleted'});
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
    deleteRobot(1);
    expect(window.fetch).toHaveBeenCalledWith(expected);
  });

  it('should return message on successful delete', async () => {
    const expected = 'Entry not found';
    const results = await deleteRobot(1);
    expect(results.message).toEqual(expected);
  });

  it('should return error on failed delete', async () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve(errorResponse);
    });
    const expected = 'Entry not found';
    const results = await deleteRobot(1);
    expect(results.message).toEqual(expected);
  });
});