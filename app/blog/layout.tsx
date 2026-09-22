import type { ReactNode } from 'react';
import './blog.css';

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <div data-pagefind-body>{children}</div>;
}
