import { documents, getDocument } from '@/lib/source';
import { getMDXComponents } from '@/components/mdx';
import { Outline } from '@/components/outline';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
type Props={params:Promise<{slug?:string[]}>};
export default async function Page({params}:Props) {
 const {slug}=await params;
 if(!slug?.length)redirect('/docs/foundations/dynamics/ode/');
 const page=getDocument(slug);if(!page)notFound();
 const Content=page.body;const index=documents.findIndex(p=>p.slug===page.slug);
 const previous=documents[index-1],next=documents[index+1];
 return <div className="doc-columns"><main id="main" className="doc-page" data-pagefind-body>
 <header className="doc-heading"><h1 data-pagefind-meta="title">{page.title}</h1></header>
 <article className="prose doc-body"><Content components={getMDXComponents()}/></article>
 <nav className="doc-pagination" aria-label="相邻章节" data-pagefind-ignore>{previous?<Link href={previous.href}><ArrowLeft size={16}/>上一节</Link>:<span/>}{next&&<Link href={next.href}>下一节<ArrowRight size={16}/></Link>}</nav>
 
 </main><Outline key={page.slug}/></div>;
}
export function generateStaticParams(){return [{slug:[]},...documents.map(p=>({slug:p.slug.split('/')}))];}
export const dynamicParams=false;
export async function generateMetadata({params}:Props){const p=getDocument((await params).slug);return {title:p?.title||'文档',description:p?.description};}


