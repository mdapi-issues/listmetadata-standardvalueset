import type { Connection, FileProperties } from 'jsforce';
import MAPPING from './mapping';

export default async function listStandardValueSets(
  conn: Connection
): Promise<Array<FileProperties>> {
  const availableStandardValueSetNames = [];
  const customObjectNames = Object.keys(MAPPING).map(
    (field) => field.split('.')[0]
  );
  const uniqueCustomObjectNames = Array.from(new Set(customObjectNames));
  const describeSObjectResults = {};
  for (const customObject of uniqueCustomObjectNames) {
    try {
      describeSObjectResults[customObject] = await conn
        .sobject(customObject)
        .describe();
    } catch (e) {
      if (!/The requested resource does not exist/.test(e)) {
        throw e;
      }
    }
  }
  for (const [key, value] of Object.entries(MAPPING)) {
    const [customObjectName, customFieldName] = key.split('.');
    if (
      describeSObjectResults[customObjectName]?.fields.find(
        (field) => field.name === customFieldName
      )
    ) {
      availableStandardValueSetNames.push(value);
    }
  }
  const uniqueStandardValueSetNames = Array.from(
    new Set(availableStandardValueSetNames)
  );
  return uniqueStandardValueSetNames.map((standardValueSetName) => {
    return {
      createdById: '',
      createdByName: '',
      createdDate: '',
      fileName: `standardValueSets/${standardValueSetName}.standardValueSet`,
      fullName: standardValueSetName,
      // all StandardValueSets share the same id:
      // $ sfdx force:data:soql:query -t -q "SELECT Id FROM StandardValueSet WHERE MasterLabel IN ('AccountRating', 'FiscalYearQuarterName', 'LeadSource')"
      // Querying Data... done
      // ID
      // ──────────────────
      // 000000000000000AAA
      // 000000000000000AAA
      // 000000000000000AAA
      // Total number of records retrieved: 3.
      id: '',
      lastModifiedById: '',
      lastModifiedByName: '',
      lastModifiedDate: '',
      type: 'StandardValueSet'
    };
  });
}
