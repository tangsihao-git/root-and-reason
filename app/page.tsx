import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
export default function Home() {
  return <main id="main" className="home-entry">
    <div className="home-composition">
      <img className="home-tree" src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/home/meadow-oak-tonal-landscape.png`} alt="深蓝钢笔排线画：大橡树在明亮草地上投下向左延伸的树影，远处树林与白云层次分明" width="1536" height="1024" fetchPriority="high" />
      <div className="home-copy"><h1>让知识扎根，<br />让理解生长。</h1><p>关于电力系统、量测与数据的思考，<br className="mobile-break" />在这里慢慢积累。</p>
      <Link prefetch={false} className="entry-button" href="/docs/foundations/dynamics/ode/">进入文库<ArrowUpRight size={17} strokeWidth={1.35} /></Link></div>
    </div>
    <footer className="home-footer"><span>从原理出发，向问题深处。</span><span>理论 · 方法 · 实践</span></footer>
  </main>;
}
