import { expect } from 'chai';
import listStandardValueSets from '../src/issue';

describe('listMetadata', function () {
  this.slow(5000);
  this.timeout(20000);
  it('does not list any FileProperties for StandardValueSet although there are some', async () => {
    const fileProperties = await listStandardValueSets();
    expect(fileProperties).to.deep.equal(undefined);
  });
});
