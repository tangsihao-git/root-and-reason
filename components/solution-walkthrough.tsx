'use client';

import { useEffect, useId, useMemo, useState } from 'react';
import katex from 'katex';
import { ArrowLeft } from 'pixelarticons/react/ArrowLeft';
import { ArrowRight } from 'pixelarticons/react/ArrowRight';

type WalkthroughStep = {
  title: string;
  body: string;
  formula: string;
  insight?: string;
};

type SolutionWalkthroughProps = {
  title: string;
  problem: string;
  steps: WalkthroughStep[];
  visual?: 'first-order-step';
};

function MathBlock({ value, label }: { value: string; label: string }) {
  const html = useMemo(
    () => katex.renderToString(value, { displayMode: true, throwOnError: false, strict: false }),
    [value],
  );
  return <div className="solution-math" aria-label={label} dangerouslySetInnerHTML={{ __html: html }} />;
}

function FirstOrderPlot({ progress }: { progress: number }) {
  const gradientId = useId().replaceAll(':', '');
  const [probe, setProbe] = useState(0);
  const width = 520;
  const height = 278;
  const left = 48;
  const right = 18;
  const top = 20;
  const bottom = 42;
  const tMax = 3;
  const yMin = 0.8;
  const yMax = 2.08;
  const px = (t: number) => left + (t / tMax) * (width - left - right);
  const py = (x: number) => top + ((yMax - x) / (yMax - yMin)) * (height - top - bottom);
  const points = Array.from({ length: 121 }, (_, index) => {
    const t = (index / 120) * tMax;
    return `${index === 0 ? 'M' : 'L'}${px(t).toFixed(2)},${py(2 - Math.exp(-2 * t)).toFixed(2)}`;
  }).join(' ');
  const visibleT = tMax * progress;
  const activeProbe = Math.min(probe, visibleT);
  const probeValue = 2 - Math.exp(-2 * activeProbe);

  useEffect(() => setProbe(visibleT), [visibleT]);

  return <div className="solution-plot-panel">
    <div className="solution-plot-heading">
      <div><span>响应轨迹</span><strong>暂态靠近平衡点</strong></div>
      <output aria-live="polite"><b>t</b> {activeProbe.toFixed(2)} s&nbsp;&nbsp;<b>x</b> {probeValue.toFixed(3)}</output>
    </div>
    <svg className="solution-plot" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="一阶阶跃响应从初值 1 上升并趋近于平衡值 2">
      <defs>
        <linearGradient id={gradientId} x1="0" x2="1">
          <stop offset="0" stopColor="#587c86" />
          <stop offset="1" stopColor="#087966" />
        </linearGradient>
      </defs>
      {[1, 1.5, 2].map(value => <g key={value}>
        <line className="solution-grid" x1={left} x2={width - right} y1={py(value)} y2={py(value)} />
        <text className="solution-axis-label" x={left - 10} y={py(value) + 4} textAnchor="end">{value.toFixed(1)}</text>
      </g>)}
      {[0, 1, 2, 3].map(value => <g key={value}>
        <line className="solution-tick" x1={px(value)} x2={px(value)} y1={height - bottom} y2={height - bottom + 5} />
        <text className="solution-axis-label" x={px(value)} y={height - 17} textAnchor="middle">{value}</text>
      </g>)}
      <line className="solution-axis" x1={left} x2={width - right} y1={height - bottom} y2={height - bottom} />
      <line className="solution-axis" x1={left} x2={left} y1={top} y2={height - bottom} />
      <line className="solution-equilibrium" x1={left} x2={width - right} y1={py(2)} y2={py(2)} />
      <text className="solution-equilibrium-label" x={width - right - 3} y={py(2) - 8} textAnchor="end">平衡值 2</text>
      <path className="solution-curve" d={points} pathLength={1} style={{ stroke: `url(#${gradientId})`, strokeDashoffset: 1 - progress }} />
      <line className="solution-probe-line" x1={px(activeProbe)} x2={px(activeProbe)} y1={py(probeValue)} y2={height - bottom} />
      <circle className="solution-initial" cx={px(0)} cy={py(1)} r="5" />
      {progress > 0 && <circle className="solution-probe-dot" cx={px(activeProbe)} cy={py(probeValue)} r="6" />}
      <text className="solution-axis-title" x={width - right} y={height - 4} textAnchor="end">t / s</text>
      <text className="solution-axis-title" x={15} y={top} textAnchor="middle">x</text>
    </svg>
    <label className="solution-scrubber">
      <span>沿曲线读取数值</span>
      <input type="range" min="0" max={Math.max(0.001, visibleT)} step="0.01" value={activeProbe} disabled={progress === 0} onChange={event => setProbe(Number(event.target.value))} />
    </label>
  </div>;
}

export function SolutionWalkthrough({ title, problem, steps, visual = 'first-order-step' }: SolutionWalkthroughProps) {
  const [current, setCurrent] = useState(0);
  const last = Math.max(0, steps.length - 1);
  const step = steps[current];
  const progress = last === 0 ? 1 : current / last;
  const move = (target: number) => setCurrent(Math.max(0, Math.min(last, target)));

  return <section className="solution-lab" aria-label={`${title}交互推导`} onKeyDown={event => {
    if (event.key === 'ArrowLeft') move(current - 1);
    if (event.key === 'ArrowRight') move(current + 1);
  }}>
    <header className="solution-lab-header">
      <div><span>交互演算</span><h3>{title}</h3></div>
      <MathBlock value={problem} label="待求解的微分方程" />
    </header>
    <div className="solution-lab-grid">
      <div className="solution-stage">
        <nav className="solution-progress" aria-label="推导步骤">
          {steps.map((item, index) => <button key={item.title} type="button" data-active={index === current} data-complete={index < current} aria-current={index === current ? 'step' : undefined} onClick={() => move(index)}>
            <span>{index + 1}</span><i />
          </button>)}
        </nav>
        <div className="solution-step" key={current} aria-live="polite">
          <p className="solution-step-count">第 {current + 1} 步，共 {steps.length} 步</p>
          <h4>{step.title}</h4>
          <p>{step.body}</p>
          <MathBlock value={step.formula} label={step.title} />
          {step.insight && <p className="solution-insight"><span>观察</span>{step.insight}</p>}
        </div>
        <div className="solution-actions">
          <button className="solution-action secondary" type="button" disabled={current === 0} onClick={() => move(current - 1)}><ArrowLeft width={16} height={16} />上一步</button>
          {current < last
            ? <button className="solution-action primary" type="button" onClick={() => move(current + 1)}>下一步<ArrowRight width={16} height={16} /></button>
            : <button className="solution-action primary" type="button" onClick={() => move(0)}>重新演算</button>}
          {current < last - 1 && <button className="solution-skip" type="button" onClick={() => move(last)}>查看结论</button>}
        </div>
      </div>
      {visual === 'first-order-step' && <FirstOrderPlot progress={progress} />}
    </div>
  </section>;
}
