const fs = require('node:fs');
const path = require('node:path');
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/\/$/, '');
for (const [from, to] of Object.entries(JSON.parse(fs.readFileSync('tools/fumadocs-redirects.json', 'utf8')))) {
  const target = path.join('out', from, 'index.html');
  if (fs.existsSync(target)) continue;
  const destination = `${basePath}${to}`;
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, `<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0;url=${destination}"><title>章节地址已更新</title><script>location.replace(${JSON.stringify(destination)}+location.search+location.hash)</script><a href="${destination}">继续阅读</a></html>`);
}
