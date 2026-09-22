import type { ReactNode } from 'react';
import { navigation } from '@/lib/source';
import { ChapterNavigation } from '@/components/chapter-navigation';
export default function Layout({children}:{children:ReactNode}) {
 return <div className="docs-layout"><ChapterNavigation tree={navigation}/>{children}</div>;
}
