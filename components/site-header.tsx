'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, BookOpen, Menu, X } from 'lucide-react';
import { Search } from './search';
import { HighlightNav } from './highlight-nav';
const links=[['主页','/'],['文档','/docs/foundations/dynamics/ode/'],['博客','/blog/'],['工具','/tools/'],['示例','/examples/']];
export function SiteHeader(){
 const path=usePathname();const [open,setOpen]=useState(false);const root=useRef<HTMLElement>(null);const trigger=useRef<HTMLButtonElement>(null);
 useEffect(()=>setOpen(false),[path]);
 useEffect(()=>{
  const dismiss=(e:PointerEvent)=>{if(!root.current?.contains(e.target as Node))setOpen(false)};
  const escape=(e:KeyboardEvent)=>{if(e.key==='Escape'&&open){setOpen(false);trigger.current?.focus()}};
  const resize=()=>setOpen(false);
  document.addEventListener('pointerdown',dismiss);document.addEventListener('keydown',escape);window.addEventListener('resize',resize);
  return()=>{document.removeEventListener('pointerdown',dismiss);document.removeEventListener('keydown',escape);window.removeEventListener('resize',resize)};
 },[open]);
 const active=(href:string)=>href==='/'?path==='/':path.startsWith('/'+href.split('/')[1]);
 return <header ref={root} className="site-header">
 <Link prefetch={false} className="wordmark" href="/" aria-label="技术研究文库首页"><BookOpen size={21} strokeWidth={1.3}/><span>技术研究文库</span></Link>
 <button ref={trigger} className="site-menu-trigger" aria-label="站点导航" aria-expanded={open} aria-controls="site-menu" onClick={()=>setOpen(!open)}>{open?<X size={21}/>:<Menu size={21}/>}</button>
 <HighlightNav label="主导航" variant="underline">{links.slice(1).map(([name,href])=><Link prefetch={false} key={href} href={href} aria-current={active(href)?'page':undefined}>{name}</Link>)}</HighlightNav>
 <Search/>
 {open&&<nav id="site-menu" className="site-menu" aria-label="站点跳转">{links.map(([name,href])=><Link prefetch={false} key={href} href={href} aria-current={active(href)?'page':undefined} onClick={()=>setOpen(false)}><span>{name}</span>{active(href)?<span className="site-menu-current" aria-label="当前栏目"/>:<ArrowUpRight size={15} strokeWidth={1.4}/>}</Link>)}</nav>}
 </header>;
}
