import type { FileProperties } from "@jsforce/jsforce-node/lib/api/metadata.js";
import type { Connection } from "@salesforce/core";
import { MAPPING } from "./mapping.js";

export async function listStandardValueSets(
  conn: Connection
): Promise<Array<FileProperties>> {
  const availableStandardValueSetNames = [];
  let customFields = await conn.metadata.read(
    "CustomField",
    Object.keys(MAPPING)
  );
  if (!Array.isArray(customFields)) {
    customFields = [customFields];
  }
  for (const [key, value] of Object.entries(MAPPING)) {
    if (customFields.find((x) => x.fullName === key)) {
      availableStandardValueSetNames.push(value);
    }
  }
  const uniqueStandardValueSetNames = Array.from(
    new Set(availableStandardValueSetNames)
  );
  return uniqueStandardValueSetNames.map((standardValueSetName) => {
    return {
      createdById: "",
      createdByName: "",
      createdDate: "",
      fileName: `standardValueSets/${standardValueSetName}.standardValueSet`,
      fullName: standardValueSetName,
      // all StandardValueSets share the same id:
      // $ sf data query -t -q "SELECT Id FROM StandardValueSet WHERE MasterLabel IN ('AccountRating', 'FiscalYearQuarterName', 'LeadSource')"
      // Querying Data... done
      // ID
      // ──────────────────
      // 000000000000000AAA
      // 000000000000000AAA
      // 000000000000000AAA
      // Total number of records retrieved: 3.
      id: "",
      lastModifiedById: "",
      lastModifiedByName: "",
      lastModifiedDate: "",
      type: "StandardValueSet",
    };
  });
}
