import api from '../index';

describe('api', () => {
  it('should match the snapshot', () => {
    expect(api).toMatchSnapshot();
  });
});