import type { Connection, FileProperties } from 'jsforce';

export async function listStandardValueSets(
  conn: Connection
): Promise<Array<FileProperties>> {
  const fileProperties = await conn.metadata.list({ type: 'StandardValueSet' });
  return fileProperties;
}
