'use client';
import { useLayoutEffect, useRef, type ReactNode } from 'react';

/** Keep navigation feedback on compositor transforms, outside React renders. */
export function HighlightNav({ label, children, variant = 'block' }: { label: string; children: ReactNode; variant?: 'block' | 'underline' }) {
  const nav = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const root = nav.current;
    if (!root) return;
    const fill = root.querySelector<HTMLElement>('.nav-highlight')!;
    const edge = root.querySelector<HTMLElement>('.nav-highlight-edge')!;
    let frame = 0, ready = false;
    let pending: HTMLAnchorElement | null = null;
    let committed = root.querySelector<HTMLAnchorElement>('a[aria-current]');
    let previous = '';
    let previousTarget: HTMLAnchorElement | null = null;
    const movingPanels = new Set<Element>();
    const measure = () => {
      const active = root.querySelector<HTMLAnchorElement>('a[aria-current]');
      // A resize during navigation must not pull the indicator back to the old link.
      if (active !== committed) { committed = active; pending = null; }
      const target = pending?.isConnected ? pending : active;
      const hiddenByPanel = target && (target.closest('.chapter-panel[data-closed],.chapter-panel[data-starting-style],.chapter-panel[data-ending-style]') || [...movingPanels].some(panel => panel.contains(target)));
      if (!target || hiddenByPanel || !target.getClientRects().length) {
        [fill, edge].forEach(layer => layer.getAnimations().forEach(animation => animation.cancel()));
        fill.style.opacity = edge.style.opacity = '0';
        // Suppress the link's fallback background while its panel is clipping it.
        if (hiddenByPanel) root.setAttribute('data-highlight-ready', '');
        else root.removeAttribute('data-highlight-ready');
        ready = false; previous = ''; previousTarget = null; return;
      }
      const rect = target.getBoundingClientRect(), parent = root.getBoundingClientRect();
      const x = rect.left - parent.left - root.clientLeft;
      const y = (variant === 'underline' ? rect.bottom : rect.top) - parent.top - root.clientTop;
      const height = variant === 'underline' ? 1 : rect.height;
      const transform = `translate3d(${x}px,${y}px,0)`;
      const signature = `${transform}:${rect.width}:${height}`;
      if (signature === previous) return;
      previous = signature;
      // A fixed-size rectangle travels as a whole; never stretch the highlight.
      previousTarget = target;
      for (const layer of [fill, edge]) {
        // Let CSS retarget an in-flight underline from its current position.
        if (variant !== 'underline' || !ready) layer.getAnimations().forEach(animation => animation.cancel());
        layer.style.width = `${layer === fill ? rect.width : 1}px`;
        layer.style.height = `${height}px`;
        layer.style.transform = transform;
      }
      fill.style.opacity = '1';
      edge.style.opacity = variant === 'underline' ? '0' : '1';
      root.setAttribute('data-highlight-ready', '');
      ready = true;
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(measure); };
    const click = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.defaultPrevented) return;
      const link = (event.target as Element).closest<HTMLAnchorElement>('a');
      if (!link || !root.contains(link)) return;
      pending = link;
      measure();
    };
    const resize = new ResizeObserver(schedule);
    resize.observe(root);
    const mutation = new MutationObserver(schedule);
    mutation.observe(root, { subtree: true, childList: true, attributes: true, attributeFilter: ['aria-current', 'hidden', 'data-open', 'data-closed', 'data-starting-style', 'data-ending-style'] });
    const panelTransition = (event: TransitionEvent) => {
      const panel = event.target;
      if (!(panel instanceof Element) || !panel.matches('.chapter-panel') || event.propertyName !== 'height') return;
      if (event.type === 'transitionrun') movingPanels.add(panel);
      else movingPanels.delete(panel);
      measure();
    };
    root.addEventListener('transitionrun', panelTransition);
    root.addEventListener('transitionend', panelTransition);
    root.addEventListener('transitioncancel', panelTransition);
    root.addEventListener('click', click, true);
    measure();
    return () => { resize.disconnect(); mutation.disconnect(); root.removeEventListener('click', click, true); root.removeEventListener('transitionrun', panelTransition); root.removeEventListener('transitionend', panelTransition); root.removeEventListener('transitioncancel', panelTransition); cancelAnimationFrame(frame); [fill, edge].forEach(layer => layer.getAnimations().forEach(animation => animation.cancel())); };
  }, [variant, label]);
  return <nav ref={nav} aria-label={label} className={`highlight-nav highlight-${variant}`}>
    <span aria-hidden="true" className="nav-highlight" />
    <span aria-hidden="true" className="nav-highlight-edge" />
    {children}
  </nav>;
}
