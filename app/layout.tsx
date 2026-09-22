import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site-header';
import { MathInteractions } from '@/components/math-interactions';
import './globals.css';
import { DocsNavigation } from '@/components/docs-navigation';
export const metadata: Metadata = {
  title: { default: '技术研究文库', template: '%s · 技术研究文库' },
  description: '电力系统量测与数据应用。让知识扎根，让理解生长。',
};
export default function Layout({ children }: { children: ReactNode }) {
  return <html lang="zh-CN"><body><a className="skip-link" href="#main">跳转到正文</a><DocsNavigation><SiteHeader />{children}</DocsNavigation><MathInteractions /></body></html>;
}
