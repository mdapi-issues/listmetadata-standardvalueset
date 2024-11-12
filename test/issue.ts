import type { FileProperties } from "@jsforce/jsforce-node/lib/api/metadata.js";
import type { Connection } from "@salesforce/core";

export async function listStandardValueSets(
  conn: Connection
): Promise<Array<FileProperties>> {
  const fileProperties = await conn.metadata.list({ type: "StandardValueSet" });
  return fileProperties;
}
