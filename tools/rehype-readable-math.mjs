// Keep the original TeX from KaTeX's MathML annotation, not rendered glyphs.
export default function readableMath() {
 return tree => {
  let number=0;
  const has=(n,c)=>n.properties?.className?.includes(c);
  function tex(n){if(n.tagName==='annotation'&&n.properties?.encoding==='application/x-tex')return n.children?.map(c=>c.value||'').join('');for(const c of n.children||[]){const value=tex(c);if(value)return value;}return '';}
  function walk(node){
   if(node.type==='element'&&node.tagName==='a'&&!has(node,'equation-number')&&/(?:^|#)(?:equation-|figure-|table-)/.test(String(node.properties?.href||''))){
    node.children=node.children.flatMap(child=>child.type==='text'
     ?child.value.split(/(\d+(?:[.\-–]\d+)*)/).filter(Boolean).map(part=>/^\d/.test(part)
      ?{type:'element',tagName:'span',properties:{className:['reference-number']},children:[{type:'text',value:part}]}
      :{type:'text',value:part})
     :[child]);
   }
   if(node.type==='element' && (has(node,'katex-display')||has(node,'katex'))){
    const source=tex(node);if(!source)return;
    const display=has(node,'katex-display');
    if(display){
     const math={...node};number++;
     const explicitTag=source.match(/\\tag\{([^{}]+)\}/)?.[1];
     const displayNumber=explicitTag??String(number);
     node.tagName='span';node.properties={className:['equation-block'],id:`equation-${number}`,'data-tex':source,tabIndex:0,role:'button',title:'点击公式复制 LaTeX',ariaLabel:`复制公式 LaTeX：${source}`};
     node.children=[math,{type:'element',tagName:'span',properties:{className:['equation-tools'],'data-pagefind-ignore':true},children:[
      {type:'element',tagName:'a',properties:{href:`#equation-${number}`,className:['equation-number'],ariaLabel:`公式 ${displayNumber}`},children:[{type:'text',value:`(${displayNumber})`}]}
     ]}];
    }else{Object.assign(node.properties,{'data-tex':source,tabIndex:0,role:'button',title:'点击复制 LaTeX',ariaLabel:`复制 LaTeX：${source}`});}
    return;
   }
   node.children?.forEach(walk);
  }
  walk(tree);
 };
}
