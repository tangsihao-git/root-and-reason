'use client';
import { useEffect, useRef, useState } from 'react';
import { HighlightNav } from './highlight-nav';
import { ChevronDown } from 'lucide-react';
import { useDocsNavigation } from './docs-navigation';
type Heading={id:string;text:string;depth:number};
export function Outline(){
 const[headings,setHeadings]=useState<Heading[]>([]),[active,setActive]=useState('');
 const clicked=useRef('');
 const {panel,toggle,close}=useDocsNavigation();
 useEffect(()=>{
  const elements=[...document.querySelectorAll<HTMLElement>('.doc-body h2[id],.doc-body h3[id]')];
  setHeadings(elements.map(el=>({id:el.id,text:el.innerText,depth:el.tagName==='H3'?3:2})));
  let frame=0;
  const update=()=>{if(clicked.current){setActive(clicked.current);return;}let current=elements[0];const offset=parseFloat(getComputedStyle(elements[0] || document.body).scrollMarginTop)||130;for(const el of elements){if(el.getBoundingClientRect().top<=offset+2)current=el;else break;} if(current)setActive(current.id);};
  const unlock=()=>{clicked.current='';};
  const onScroll=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(update)};
  update();window.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('wheel',unlock,{passive:true});window.addEventListener('touchmove',unlock,{passive:true});window.addEventListener('keydown',unlock);
  return()=>{window.removeEventListener('scroll',onScroll);window.removeEventListener('wheel',unlock);window.removeEventListener('touchmove',unlock);window.removeEventListener('keydown',unlock);cancelAnimationFrame(frame);};
 },[]);
 const jump=(e:React.MouseEvent<HTMLAnchorElement>,id:string)=>{
  e.preventDefault();const target=document.getElementById(id);if(!target)return;
  clicked.current=id;close();target.scrollIntoView({behavior:'instant',block:'start'});history.replaceState(null,'','#'+encodeURIComponent(id));setActive(id);
  if(matchMedia('(max-width:1200px)').matches){target.tabIndex=-1;target.focus({preventScroll:true});}
 };
 return <aside data-docs-menu className={`doc-outline ${panel==='outline'?'is-open':''}`}><div className="outline-heading">本页内容</div><button className="outline-trigger" data-docs-trigger="outline" aria-expanded={panel==='outline'} aria-controls="page-outline" onClick={()=>toggle('outline')}>本页内容<ChevronDown size={14}/></button><div id="page-outline"><HighlightNav label="本页内容">{headings.map(h=><a key={h.id} title={h.text} href={'#'+h.id} onClick={e=>jump(e,h.id)} className={h.depth===3?'outline-sub':''} aria-current={active===h.id?'location':undefined}>{h.text}</a>)}</HighlightNav></div></aside>;
}
