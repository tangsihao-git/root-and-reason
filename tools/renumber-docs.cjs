const fs = require('node:fs');
const path = require('node:path');

const docsRoot = path.join('content', 'docs');

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, ''));
}

function writeJson(file, value) {
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function stripNumber(title) {
  return title.replace(/^(?:\d+\.\s+|\d+\.\d+(?:\.\d+)*\s+)/, '');
}

function stripSectionNumber(heading) {
  return heading.replace(/^\d+(?:\.\d+)+\s+/, '');
}

function numberPage(file, pageNumber) {
  let source = fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '');
  const titleMatch = source.match(/^title:\s*"([^"]+)"/m);
  if (!titleMatch) throw new Error(`Missing title in ${file}`);

  const title = `${pageNumber} ${stripNumber(titleMatch[1])}`;
  source = source.replace(/^title:\s*"[^"]+"/m, `title: "${title}"`);

  let section = 0;
  source = source.replace(/^## (.+)$/gm, (_, heading) => {
    section += 1;
    return `## ${pageNumber}.${section} ${stripSectionNumber(heading)}`;
  });
  fs.writeFileSync(file, source, 'utf8');
}

const rootMeta = readJson(path.join(docsRoot, 'meta.json'));
for (const rootEntry of rootMeta.pages) {
  const categoryDir = path.join(docsRoot, rootEntry);
  const categoryMeta = readJson(path.join(categoryDir, 'meta.json'));

  categoryMeta.pages.forEach((entry, groupIndex) => {
    const groupNumber = `${groupIndex + 1}.`;
    const directPage = path.join(categoryDir, `${entry}.mdx`);
    const groupDir = path.join(categoryDir, entry);

    if (fs.existsSync(directPage)) {
      numberPage(directPage, groupNumber);
      return;
    }

    const groupMetaFile = path.join(groupDir, 'meta.json');
    const groupMeta = readJson(groupMetaFile);
    groupMeta.title = `${groupNumber} ${stripNumber(groupMeta.title)}`;
    writeJson(groupMetaFile, groupMeta);

    groupMeta.pages.forEach((page, pageIndex) => {
      const pageFile = path.join(groupDir, `${page}.mdx`);
      numberPage(pageFile, `${groupIndex + 1}.${pageIndex + 1}`);
    });
  });

  writeJson(path.join(categoryDir, 'meta.json'), categoryMeta);
}

console.log('Renumbered documentation within each top-level category.');
