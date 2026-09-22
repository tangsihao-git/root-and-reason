import Link from 'next/link';
import type { ReactNode } from 'react';
import { ExampleReturn } from '@/components/example-return';

export default function ExampleWorkbookLayout({ children }: { children: ReactNode }) {
  return (
    <main id="main" className="example-workbook" data-pagefind-body>
      <ExampleReturn />
      <article className="prose">{children}</article>
    </main>
  );
}
