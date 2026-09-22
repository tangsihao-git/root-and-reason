'use client';
import {useEffect,useState} from 'react';
export function MathInteractions(){
 const[notice,setNotice]=useState('');
 useEffect(()=>{let timer:ReturnType<typeof setTimeout>;
 const copy=async(target:HTMLElement)=>{try{await navigator.clipboard.writeText(target.dataset.tex||'');setNotice('已复制 LaTeX');}catch{setNotice('复制失败，请检查浏览器剪贴板权限');}clearTimeout(timer);timer=setTimeout(()=>setNotice(''),2200);};
 const click=(e:MouseEvent)=>{const el=(e.target as Element).closest<HTMLElement>('[data-tex]');if(el&&!(e.target as Element).closest('.equation-number'))void copy(el);};
 const key=(e:KeyboardEvent)=>{if(e.key!=='Enter'&&e.key!==' ')return;const el=e.target as HTMLElement;if(el.matches('[data-tex]')){e.preventDefault();void copy(el);}};
 document.addEventListener('click',click);document.addEventListener('keydown',key);
 return()=>{clearTimeout(timer);document.removeEventListener('click',click);document.removeEventListener('keydown',key)};
 },[]);
 return <div className="copy-notice" role="status">{notice}</div>;
}
