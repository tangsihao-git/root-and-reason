import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
const root = path.resolve('content/docs');
const pages = [];
function walk(dir, segments = []) {
  const metaFile = path.join(dir, 'meta.json');
  const meta = fs.existsSync(metaFile) ? JSON.parse(fs.readFileSync(metaFile, 'utf8')) : {};
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const available = entries.filter(e => e.isDirectory() || /\.mdx?$/.test(e.name)).map(e => e.name.replace(/\.mdx?$/, ''));
  const preferred = (meta.pages || []).filter(n => !n.startsWith('---') && n !== '...');
  return [...new Set([...preferred, ...available])].flatMap(name => {
    const slug = [...segments, name].join('/');
    const folder = path.join(dir, name);
    if (fs.existsSync(folder) && fs.statSync(folder).isDirectory()) {
      const file = path.join(folder, 'meta.json');
      const data = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {};
      return [{ title: data.title || name, id: slug, children: walk(folder, [...segments, name]) }];
    }
    const file = ['.mdx', '.md'].map(ext => folder + ext).find(f => fs.existsSync(f));
    if (!file) return [];
    const { data } = matter(fs.readFileSync(file, 'utf8'));
    const page = { slug, title: data.title || name, description: data.description || '', href: `/docs/${slug}/`, category: segments[0] || '' };
    pages.push({ ...page, file: path.relative(process.cwd(), file).replaceAll('\\', '/') });
    return [{ title: page.title, href: page.href, id: slug }];
  });
}
const navigation = walk(root);
fs.mkdirSync('lib/generated', { recursive: true });
const imports = pages.map((p, i) => `import Article${i} from '../../${p.file}';`).join('\n');
fs.writeFileSync('lib/generated/docs.ts', `// Generated; edit content/docs and meta.json instead.\n${imports}\nexport const documents = [\n${pages.map((p, i) => `${JSON.stringify(p).slice(0,-1)}, body: Article${i}}`).join(',\n')}\n];\nexport const navigation = ${JSON.stringify(navigation, null, 2)};\n`);
fs.writeFileSync('lib/generated/search.json', JSON.stringify(pages.map(({file, ...p}) => p)));
console.log(`Prepared ${pages.length} documents and navigation.`);
