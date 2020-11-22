import { Org } from '@salesforce/core';
import { expect } from 'chai';
import listStandardValueSets from '../src/workaround';

describe('workaround', function () {
  this.slow(10000);
  this.timeout(40000);
  it('adds all available StandardValueSets', async () => {
    const org = await Org.create({});
    const conn = org.getConnection();
    const fileProperties = await listStandardValueSets(conn);
    expect(fileProperties.find((item) => item.fullName === 'CaseOrigin'));
    expect(fileProperties.find((item) => item.fullName === 'CareItemStatus2'))
      .to.be.undefined;
  });
});
