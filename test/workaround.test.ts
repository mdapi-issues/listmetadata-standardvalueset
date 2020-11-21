import { expect } from 'chai';
import workaround from '../src/workaround';

describe('workaround', function () {
  it('adds all available StandardValueSets', async () => {
    expect(workaround()).to.deep.equal(true);
  });
});
