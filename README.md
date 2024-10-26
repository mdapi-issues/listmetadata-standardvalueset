# listmetadata-standardvalueset

> Minimal working example to demonstrate a bug in listMetadata where queries for StandardValueSet return no results

[![Actions Status](https://github.com/mdapi-issues/listmetadata-standardvalueset/workflows/Test%20and%20Release/badge.svg)](https://github.com/mdapi-issues/listmetadata-standardvalueset/actions)

## Steps to reproduce the issue

Create a scratch org

```console
sf org create scratch -f config/project-scratch-def.json --set-default
```

list StandardValueSets using `listMetadata`

```console
sf org list metadata --metadata-type StandardValueSet
```

```diff
- actual
+ expected
```

```diff
- undefined
+ [
+   {
+     createdById: '',
+     createdByName: '',
+     createdDate: '',
+     fileName: 'standardValueSets/LeadSource.standardValueSet',
+     fullName: 'LeadSource',
+     id: '',
+     lastModifiedById: '',
+     lastModifiedByName: '',
+     lastModifiedDate: '',
+     type: 'StandardValueSet'
+   },
+   ...
+ ]
```
