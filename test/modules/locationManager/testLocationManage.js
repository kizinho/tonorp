process.env.NODE_ENV = 'test';
const { expect } = require('chai');

const LocationManager = require('../../../src/modules/locations');

describe('Test location manager', () => {
  const origin = { long: '7.3744022', lat: '7.4160937' };
  const destination = { long: '9.0543271', lat: '7.3243164' };
  const Manager = new LocationManager(origin);
  it('Should return false if location is not in radius', async () => {
    expect(await Manager.isInRadius(destination, 5)).to.equal(false);
  });

  it('Should return true if location is in radius', async () => {
    expect(await Manager.isInRadius(origin, 5)).to.equal(true);
  });
});
