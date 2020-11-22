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
      id: '',
      lastModifiedById: '',
      lastModifiedByName: '',
      lastModifiedDate: '',
      type: 'StandardValueSet'
    };
  });
}
