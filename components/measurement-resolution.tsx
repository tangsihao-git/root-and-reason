'use client';

import { useId, useState } from 'react';

const modes = {
  scada: {
    label: 'SCADA',
    subtitle: '状态快照',
    note: '适合观察慢变化运行量；快速扰动被采样间隔隐藏。',
    path: 'M18 116 L96 116 L96 102 L176 102 L176 110 L258 110 L258 74 L338 74 L338 88 L420 88 L420 60 L542 60',
    points: [[18, 116], [96, 102], [176, 110], [258, 74], [338, 88], [420, 60], [542, 60]],
  },
  pmu: {
    label: 'PMU',
    subtitle: '相量轨迹',
    note: '统一时标下观察基波相量、频率与阻尼过程。',
    path: 'M18 104 C56 42 92 48 122 100 S188 154 220 96 S286 54 316 92 S380 132 412 88 S478 62 542 82',
    points: [[18, 104], [122, 100], [220, 96], [316, 92], [412, 88], [542, 82]],
  },
  wmu: {
    label: 'WMU',
    subtitle: '同步波形',
    note: '保留亚周波暂态、谐波与快速控制响应，交由后端解释。',
    path: 'M18 100 C35 35 50 35 66 100 S96 165 112 100 S142 35 158 100 S188 165 204 100 C220 35 236 36 250 100 C258 146 264 34 272 104 C278 170 286 30 294 98 C302 162 310 42 320 100 C336 165 350 165 366 100 S396 35 412 100 S442 165 458 100 S488 35 504 100 S528 144 542 102',
    points: [[18, 100], [112, 100], [204, 100], [272, 104], [320, 100], [412, 100], [504, 100]],
  },
} as const;

type Mode = keyof typeof modes;

export function MeasurementResolution() {
  const [active, setActive] = useState<Mode>('pmu');
  const titleId = useId();
  const mode = modes[active];

  return (
    <section className="resolution-lab" aria-labelledby={titleId}>
      <div className="resolution-head">
        <div><span>观察尺度</span><h2 id={titleId}>同一事件，会留下多少信息？</h2></div>
        <div className="resolution-tabs" role="tablist" aria-label="选择量测方式">
          {(Object.keys(modes) as Mode[]).map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={active === key}
              onClick={() => setActive(key)}
            >{modes[key].label}</button>
          ))}
        </div>
      </div>
      <div className="resolution-screen" role="tabpanel">
        <svg viewBox="0 0 560 180" aria-label={`${mode.label} 观测示意图`}>
          <defs>
            <pattern id="minorGrid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" /></pattern>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse"><rect width="100" height="100" fill="url(#minorGrid)" /><path d="M 100 0 L 0 0 0 100" /></pattern>
          </defs>
          <rect width="560" height="180" fill="url(#grid)" />
          <line x1="18" y1="100" x2="542" y2="100" className="axis" />
          <path key={active} d={mode.path} className="signal-trace" />
          {mode.points.map(([x, y], index) => <rect key={`${active}-${index}`} x={x - 2.5} y={y - 2.5} width="5" height="5" className="sample-dot" />)}
        </svg>
        <div className="resolution-caption"><strong>{mode.subtitle}</strong><span>{mode.note}</span></div>
      </div>
    </section>
  );
}
