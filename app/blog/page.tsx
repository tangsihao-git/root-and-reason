import type { Metadata } from 'next';
import { BlogIndex } from '@/components/blog-index';
import { blogPosts } from '@/lib/blog-posts';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const metadata: Metadata = {
  title: '博客',
  description: '按时间整理电力系统量测与数据应用相关的论文、报告和书籍章节。',
};

export default function Blog() {
  return (
    <main className="blog-index">
      <BlogIndex posts={blogPosts} basePath={basePath} />
    </main>
  );
}
