export default function rehypeBasePath({base=''}={}) {
 return tree => {
  const walk=node=>{
   if(node.type==='element' && base){
    for(const key of ['href','src']){
     const value=node.properties?.[key];
     if(typeof value==='string' && value.startsWith('/') && !value.startsWith('//') && value!==base && !value.startsWith(base+'/')) node.properties[key]=base+value;
    }
   }
   node.children?.forEach(walk);
  };
  walk(tree);
 };
}
