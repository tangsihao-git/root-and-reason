import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: '时间同步算例',
  description: '以载波锁相环为例，完成从环路指标到参数的定量设计。',
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
