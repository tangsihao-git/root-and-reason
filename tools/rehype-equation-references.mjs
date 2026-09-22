function classes(node) {
  return Array.isArray(node.properties?.className) ? node.properties.className : [];
}

function textContent(node) {
  if (node.type === 'text') return node.value || '';
  return (node.children || []).map(textContent).join('');
}

function chapterPrefix(tree) {
  let heading = '';
  const find = node => {
    if (heading) return;
    if (node.type === 'element' && node.tagName === 'h2') heading = textContent(node);
    for (const child of node.children || []) find(child);
  };
  find(tree);
  const match = heading.match(/^\s*(\d+(?:\.\d+)+)/);
  if (!match) return '';
  const parts = match[1].split('.');
  return parts.length >= 2 ? parts.slice(0, 2).join('.') : parts[0];
}

export default function equationReferences() {
  return tree => {
    const prefix = chapterPrefix(tree);
    const references = new Map();
    let index = 0;

    const collect = node => {
      if (node.type === 'element' && classes(node).includes('math-display')) {
        index += 1;
        const original = textContent(node);
        let label = '';
        let source = original.replace(/\\label\{([^{}]+)\}/g, (_, value) => {
          label = value.trim();
          return '';
        }).trim();
        const explicit = source.match(/\\tag\{([^{}]+)\}/)?.[1];
        const number = explicit || (prefix ? `${prefix}-${index}` : String(index));
        if (!explicit) source = `${source} \\tag{${number}}`;
        node.children = [{ type: 'text', value: source }];
        if (label) references.set(label, { index, number });
      }
      for (const child of node.children || []) collect(child);
    };
    collect(tree);

    const replaceReferences = (node, blocked = false) => {
      if (!node.children) return;
      const isBlocked = blocked || (node.type === 'element' && (
        node.tagName === 'code' || node.tagName === 'pre' ||
        classes(node).includes('math-display') || classes(node).includes('math-inline')
      ));
      if (isBlocked) return;

      const children = [];
      for (const child of node.children) {
        if (child.type !== 'text') {
          replaceReferences(child, false);
          children.push(child);
          continue;
        }

        const pattern = /\[\[([A-Za-z][\w:.-]*)(?:\|([^\]]+))?\]\]/g;
        let cursor = 0;
        let match;
        while ((match = pattern.exec(child.value)) !== null) {
          if (match.index > cursor) children.push({ type: 'text', value: child.value.slice(cursor, match.index) });
          const target = references.get(match[1]);
          if (target) {
            children.push({
              type: 'element',
              tagName: 'a',
              properties: { href: `#equation-${target.index}`, className: ['equation-reference'] },
              children: [{ type: 'text', value: match[2] || `式（${target.number}）` }],
            });
          } else {
            children.push({ type: 'text', value: match[0] });
          }
          cursor = pattern.lastIndex;
        }
        if (cursor < child.value.length) children.push({ type: 'text', value: child.value.slice(cursor) });
      }
      node.children = children;
    };
    replaceReferences(tree);
  };
}
