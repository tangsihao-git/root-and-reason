import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: '自动控制理论算例',
  description: '覆盖反馈系统、伯德图、奈奎斯特判据、根轨迹、超前补偿和锁相环参数设计。',
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
