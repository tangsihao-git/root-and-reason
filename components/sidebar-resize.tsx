'use client';
import { useEffect, useState } from 'react';

export function SidebarResize() {
  const [width, setWidth] = useState(264);
  const [limits, setLimits] = useState({ min: 220, max: 360 });
  const apply = (value: number) => {
    const style = getComputedStyle(document.documentElement);
    const min = parseFloat(style.getPropertyValue('--sidebar-min')) || 220;
    const max = parseFloat(style.getPropertyValue('--sidebar-max')) || 360;
    const next = Math.round(Math.min(max, Math.max(min, value)));
    document.documentElement.style.setProperty('--sidebar-width', `${next}px`);
    setWidth(next); setLimits({ min, max });
    try { localStorage.setItem('library-sidebar-width', String(next)); } catch {}
  };
  useEffect(() => {
    let saved = 264;
    try { saved = Number(localStorage.getItem('library-sidebar-width')) || 264; } catch {}
    apply(saved);
    const resize = () => apply(parseFloat(document.documentElement.style.getPropertyValue('--sidebar-width')) || 264);
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);
  return <div className="sidebar-resize" role="separator" aria-label="调整章节目录宽度" aria-orientation="vertical" aria-valuemin={limits.min} aria-valuemax={limits.max} aria-valuenow={width} tabIndex={0}
    title="拖动调整目录宽度；方向键微调，双击恢复默认"
    onPointerDown={event => { event.preventDefault(); event.currentTarget.setPointerCapture(event.pointerId); event.currentTarget.dataset.dragging = 'true'; }}
    onPointerMove={event => {
      if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
      const left = event.currentTarget.parentElement!.getBoundingClientRect().left;
      apply(event.clientX - left);
    }}
    onPointerUp={event => { event.currentTarget.releasePointerCapture(event.pointerId); delete event.currentTarget.dataset.dragging; }}
    onLostPointerCapture={event => { delete event.currentTarget.dataset.dragging; }}
    onDoubleClick={() => apply(264)}
    onKeyDown={event => {
      if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
      event.preventDefault(); apply(event.key === 'Home' ? limits.min : event.key === 'End' ? limits.max : width + (event.key === 'ArrowRight' ? 10 : -10));
    }} />;
}
