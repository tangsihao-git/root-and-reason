'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
export function ExampleReturn(){
 const [from,setFrom]=useState('');
 useEffect(()=>{const value=new URLSearchParams(location.search).get('from');if(value?.startsWith('/docs/')&&!value.startsWith('//'))setFrom(value)},[]);
 return <Link className="example-back" href={from||'/examples/'}><ArrowLeft size={14} style={{display:'inline',marginRight:8}}/>{from?'返回刚才阅读的位置':'返回示例索引'}</Link>;
}
