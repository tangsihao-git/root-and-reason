import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: '微分方程与动态系统算例',
  description: '集中展示常微分方程、线性代数、状态空间和拉普拉斯变换的完整求解过程。',
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
