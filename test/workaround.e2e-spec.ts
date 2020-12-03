import { Org } from '@salesforce/core';
import { expect } from 'chai';
import listStandardValueSets from '../src/workaround';

describe('workaround', function () {
  this.slow(5000);
  this.timeout(20000);
  it('adds all available StandardValueSets', async () => {
    const org = await Org.create({});
    const conn = org.getConnection();
    const fileProperties = await listStandardValueSets(conn);
    expect(fileProperties.find((item) => item.fullName === 'CaseOrigin'));
    expect(fileProperties.find((item) => item.fullName === 'CareItemStatus2'))
      .to.be.undefined;
  });
});
