import Link from 'next/link';
import { Sliders } from 'pixelarticons/react/Sliders';
export const metadata = { title: '工具', description: '电力量测与数据分析工具。' };
export default function Tools() { return <main className="section-page"><Sliders className="section-icon" /><h1>工具</h1><p className="intro">用于量测、计算与分析的小工具，逐步整理。</p><div className="resource-row"><strong>工具尚未上线</strong><p>后续会在这里收录研究中可重复使用的计算与分析工具。</p></div><Link className="text-fd-primary text-sm" href="/examples">先看已有求解示例 →</Link></main>; }
