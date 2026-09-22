import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: '电网量测算例',
  description: '集中演示电气量、同步相量估计、量测链路和电能质量中的典型计算。',
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
