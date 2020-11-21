import { Org } from '@salesforce/core';
import { FileProperties } from 'jsforce';

export default async function listStandardValueSets(): Promise<
  Array<FileProperties>
> {
  const org = await Org.create({});
  const conn = org.getConnection();
  const fileProperties = await conn.metadata.list({ type: 'StandardValueSet' });
  return fileProperties;
}
