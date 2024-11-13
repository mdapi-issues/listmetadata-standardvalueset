#!/usr/bin/env ts-node

const releaseVersion = "228.0";

const url = `https://developer.salesforce.com/docs/get_document_content/api_meta/standardvalueset_names.htm/en-us/${releaseVersion}`;
(async () => {
  const res = await fetch(url);
  const data = await res.json();
  const singleLineContent = data.content.replace(/(\r\n|\n|\r)/gm, " ");
  const entries = singleLineContent.match(
    /(?<=<td class="entry"[^>]*>)(.*?)(?=<\/td>)/gm
  );
  const cleanedEntries = entries.map((entry) => {
    return entry
      .replace('<sup class="ph sup">1</sup>', "")
      .replace('<sup class="ph sup">2</sup>', "")
      .replace(/<p class="p">/g, ",")
      .replace(/<\/p>/g, "")
      .replace(/\s/g, "")
      .replace(/^,/, "")
      .trim();
  });
  console.log(cleanedEntries);
})().catch(console.error);
