import { Org } from "@salesforce/core";
import { expect } from "chai";
import { listStandardValueSets } from "./issue";

describe("listMetadata", function () {
  this.slow(5000);
  this.timeout(20000);
  it("does not list any FileProperties for StandardValueSet although there are some", async () => {
    const org = await Org.create({});
    const conn = org.getConnection();
    const fileProperties = await listStandardValueSets(conn);
    expect(fileProperties).to.deep.equal([]);
  });
});
