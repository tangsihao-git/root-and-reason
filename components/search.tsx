'use client';
import { useEffect,useRef,useState } from 'react';
import Link from 'next/link';
import {Search as SearchIcon,X} from 'lucide-react';
import {Button} from './ui/button';
import entries from '@/lib/generated/search.json';
type Result={url:string;title:string;excerpt?:string};
export function Search(){
 const dialog=useRef<HTMLDialogElement>(null);
 const openSearch=()=>{dialog.current?.showModal();};
 const input=useRef<HTMLInputElement>(null);const[expanded,setExpanded]=useState(false);const[query,setQuery]=useState(''),[results,setResults]=useState<Result[]>([]),[busy,setBusy]=useState(false);
 useEffect(()=>{const key=(e:KeyboardEvent)=>{if((e.ctrlKey||e.metaKey)&&e.key==='k'){e.preventDefault();if(matchMedia('(max-width:1200px)').matches)openSearch();else input.current?.focus();}};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key)},[]);
 useEffect(()=>{let cancelled=false;const timer=setTimeout(async()=>{
 if(!query.trim()){setResults([]);setBusy(false);return;}setBusy(true);
 try{
 const base=process.env.NEXT_PUBLIC_BASE_PATH||'';
 const pagefind=await import(/* webpackIgnore: true */ `${base}/pagefind/pagefind.js`);
 const response=await pagefind.search(query);
 const data=await Promise.all(response.results.slice(0,12).map((r:any)=>r.data()));
 if(!cancelled)setResults(data.map((r:any)=>({url:r.url,title:r.meta.title,excerpt:r.excerpt.replace(/<[^>]+>/g,'')})));
 }catch{
 // Local development has no built index: search article titles and descriptions.
 const words=query.toLowerCase().trim().split(/\s+/);
 if(!cancelled)setResults(entries.filter(p=>words.every(w=>(p.title+' '+p.description).toLowerCase().includes(w))).slice(0,12).map(p=>({url:p.href,title:p.title,excerpt:p.description})));
 }finally{if(!cancelled)setBusy(false);}
 },180);return()=>{cancelled=true;clearTimeout(timer)};
 },[query]);
 const base=process.env.NEXT_PUBLIC_BASE_PATH||'';
 return <div className="inline-search" role="search" onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setExpanded(false)}} onKeyDown={e=>{if(e.key==='Escape')setExpanded(false)}}>
 <button className="compact-search" aria-label="打开搜索" onClick={openSearch}><SearchIcon size={20}/></button>
 <dialog ref={dialog} className="search-dialog" aria-label="搜索文库" onClick={e=>{if(e.target===e.currentTarget)dialog.current?.close()}}>
 <div className="search-input-row"><SearchIcon size={18}/><input type="search" aria-label="搜索文库" placeholder="搜索文库…" value={query} onChange={e=>setQuery(e.target.value)} autoFocus/><button aria-label="关闭搜索" onClick={()=>dialog.current?.close()}><X size={20}/></button></div>
 <div className="search-results" aria-live="polite">{!query.trim()?<p>输入关键词搜索文档。</p>:busy?<p>正在搜索…</p>:results.length?results.map(r=><Link key={r.url} href={base&&r.url.startsWith(base+'/')?r.url.slice(base.length):r.url} onClick={()=>{dialog.current?.close();setExpanded(false)}}><strong>{r.title}</strong><span>{r.excerpt}</span></Link>):<p>没有找到相关内容。</p>}</div>
 </dialog>
 <div className="inline-search-field"><SearchIcon size={16} strokeWidth={1.4}/><label className="sr-only" htmlFor="library-search">搜索文库</label><input ref={input} id="library-search" type="search" autoComplete="off" placeholder="搜索文库…" value={query} aria-expanded={expanded&&!!query.trim()} aria-controls="library-search-results" onFocus={()=>setExpanded(true)} onChange={e=>{setQuery(e.target.value);setBusy(!!e.target.value.trim());setExpanded(true)}}/>{query?<Button variant="ghost" size="icon" aria-label="清空搜索" onClick={()=>{setQuery('');input.current?.focus()}}><X size={14}/></Button>:<kbd>Ctrl K</kbd>}</div>
 {expanded&&!!query.trim()&&<div id="library-search-results" className="inline-search-panel"><div className="search-results" aria-live="polite">{busy?<p>正在搜索…</p>:results.length?results.map(r=><Link key={r.url} href={base&&r.url.startsWith(base+'/')?r.url.slice(base.length):r.url} onClick={()=>setExpanded(false)}><strong>{r.title}</strong><span>{r.excerpt}</span></Link>):<p>没有找到相关内容，试试更简短的关键词。</p>}</div></div>}</div>;
}

