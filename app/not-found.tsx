import Link from 'next/link';
export default function NotFound() { return <main className="section-page"><p className="eyebrow">404</p><h1>没有找到这一页</h1><p className="intro">这篇内容可能尚未整理，或地址已发生变化。</p><Link className="start-button" href="/docs/foundations/dynamics/ode">进入文档 →</Link></main>; }
