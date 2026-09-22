'use client';
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';

type Panel = 'chapters' | 'outline' | null;
const Context = createContext({ panel: null as Panel, collapsed: false, toggleChapters: () => {}, toggle: (_: Exclude<Panel, null>) => {}, close: () => {} });
export const useDocsNavigation = () => useContext(Context);

export function DocsNavigation({ children }: { children: ReactNode }) {
 const [panel, setPanel] = useState<Panel>(null);
 const [collapsed, setCollapsed] = useState(false);
 const root = useRef<HTMLDivElement>(null);
 const path = usePathname();
 useEffect(() => setPanel(null), [path]);
 useEffect(() => {
  if (panel !== 'chapters') return;
  const drawer = root.current?.querySelector<HTMLElement>('#chapter-nav');
  const trigger = root.current?.querySelector<HTMLButtonElement>('[data-docs-trigger="chapters"]');
  const previousOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  drawer?.querySelector<HTMLButtonElement>('.chapter-close')?.focus();
  const trapFocus = (event: KeyboardEvent) => {
   if (event.key !== 'Tab' || !drawer) return;
   const items = Array.from(drawer.querySelectorAll<HTMLElement>('a[href],button:not([disabled])')).filter(item => item.getClientRects().length > 0);
   const first = items[0], last = items.at(-1);
   if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
   else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  };
  document.addEventListener('keydown', trapFocus);
  return () => {
   document.body.style.overflow = previousOverflow;
   document.removeEventListener('keydown', trapFocus);
   if (drawer?.contains(document.activeElement)) trigger?.focus();
  };
 }, [panel]);
 useEffect(() => {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const measure = () => root.current?.style.setProperty('--docs-header-height', `${header.getBoundingClientRect().height}px`);
  measure();
  const observer = new ResizeObserver(measure); observer.observe(header);
  const resize = () => setPanel(null);
  window.addEventListener('resize', resize);
  return () => { observer.disconnect(); window.removeEventListener('resize', resize); };
 }, []);
 useEffect(() => {
  if (!panel) return;
  const dismiss = (event: PointerEvent) => {
   if (!(event.target instanceof Element) || event.target.closest('[data-docs-menu]')) return;
   setPanel(null);
  };
  const escape = (event: KeyboardEvent) => {
   if (event.key !== 'Escape') return;
   setPanel(null);
   root.current?.querySelector<HTMLButtonElement>(`[data-docs-trigger="${panel}"]`)?.focus();
  };
  document.addEventListener('pointerdown', dismiss); document.addEventListener('keydown', escape);
  return () => { document.removeEventListener('pointerdown', dismiss); document.removeEventListener('keydown', escape); };
 }, [panel]);
 return <Context.Provider value={{ panel, collapsed, toggleChapters: () => matchMedia('(max-width:760px)').matches ? setPanel(current => current === 'chapters' ? null : 'chapters') : setCollapsed(value => !value), toggle: next => setPanel(current => current === next ? null : next), close: () => setPanel(null) }}>
  <div ref={root} className="site-shell" data-sidebar-collapsed={collapsed || undefined}>{children}</div>
 </Context.Provider>;
}
