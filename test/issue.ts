import type { Connection } from "@salesforce/core";
import type { FileProperties } from "jsforce/api/metadata";

export async function listStandardValueSets(
  conn: Connection
): Promise<Array<FileProperties>> {
  const fileProperties = await conn.metadata.list({ type: 'StandardValueSet' });
  return fileProperties;
}
