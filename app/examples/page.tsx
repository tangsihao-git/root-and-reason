import Link from 'next/link';
import { Code } from 'pixelarticons/react/Code';
export const metadata = { title: '示例', description: '配合理论文档阅读的完整推导与工程计算。' };
const examples = [
  ['微分方程与动态系统', '常微分方程、线性代数、状态空间与拉普拉斯变换的完整求解。', '/examples/dynamics'],
  ['信号与网络', '采样、频谱、互功率谱、坐标变换和 RLC 网络的典型计算。', '/examples/signals-networks'],
  ['自动控制理论', '反馈、伯德图、奈奎斯特判据、根轨迹、补偿器与锁相环设计。', '/examples/control'],
  ['电网量测', '电气量、同步相量估计、量测链路与电能质量的工程算例。', '/examples/measurement'],
  ['时间同步', '从环路指标到载波 PLL 参数的定量设计。', '/examples/timing'],
];
export default function Examples() { return <main className="section-page"><Code className="section-icon" /><h1>示例</h1><p className="intro">公式推导和数值计算集中在这里。理论文档保持简洁，并在相关位置链接到对应算例。</p>{examples.map(([title,desc,url])=><Link className="resource-row" href={url} prefetch={false} key={url}><strong>{title} <span aria-hidden="true">↗</span></strong><p>{desc}</p></Link>)}</main>; }
