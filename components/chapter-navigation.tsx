'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ChevronRight, Menu, X } from 'lucide-react';
import { Collapsible } from '@base-ui/react/collapsible';
import { Button } from './ui/button';
import { HighlightNav } from './highlight-nav';

import { useDocsNavigation } from './docs-navigation';
type Node={id:string;title:string;href?:string;children?:Node[]};

const clean=(s:string)=>s.replace(/\/$/,'');
function Branch({node,path,depth=0}:{node:Node;path:string;depth?:number}){
 const contains=path.startsWith('/docs/'+node.id+'/');
 const [open,setOpen]=useState(contains);
 useEffect(()=>{if(contains)setOpen(true)},[contains]);
 if(node.href)return <Link href={node.href} title={node.title} className="chapter-link" aria-current={clean(path)===clean(node.href)?'page':undefined} onClick={e=>{if(clean(path)===clean(node.href!))e.preventDefault()}}>{node.title}</Link>;
 return <Collapsible.Root open={open} onOpenChange={setOpen} className={depth===0?'chapter-group':'chapter-subgroup'}>
 <Collapsible.Trigger className="chapter-toggle" title={node.title}><span>{node.title}</span><ChevronRight size={13} className={open?'chevron open':'chevron'}/></Collapsible.Trigger>
 <Collapsible.Panel className="chapter-panel"><div className="chapter-children">{node.children?.map(n=><Branch key={n.id} node={n} path={path} depth={depth+1}/>)}</div></Collapsible.Panel>
 </Collapsible.Root>;
}
export function ChapterNavigation({tree}:{tree:Node[]}){
 const path=usePathname();const {panel,toggle,close}=useDocsNavigation();
 return <><div className="docs-local-bar" aria-hidden="true"/><Button variant="ghost" data-docs-menu data-docs-trigger="chapters" className="mobile-chapters" aria-label="切换文档章节目录" onClick={()=>toggle('chapters')} aria-expanded={panel==='chapters'} aria-controls="chapter-nav"><Menu size={16}/>章节目录</Button>
 {panel==='chapters'&&<div className="chapter-backdrop" aria-hidden="true" onClick={close}/>}
 <aside data-docs-menu id="chapter-nav" role={panel==='chapters'?'dialog':undefined} aria-modal={panel==='chapters'?true:undefined} aria-label="章节目录" onClick={event=>{if((event.target as Element).closest('a'))close()}} className={`docs-sidebar ${panel==='chapters'?'is-open':''}`}><div className="sidebar-content"><div className="sidebar-label"><Button variant="ghost" className="chapter-close" aria-label="关闭章节目录" onClick={close}><X size={18}/></Button></div><HighlightNav label="章节目录">{tree.map(n=><Branch key={n.id} node={n} path={path}/>)}</HighlightNav></div></aside></>;
}



