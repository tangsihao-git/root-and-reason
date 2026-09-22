import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: '信号与网络算例',
  description: '通过采样、频谱、互功率谱、坐标变换和 RLC 网络计算连接公式与工程判断。',
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
