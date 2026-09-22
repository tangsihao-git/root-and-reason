'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Bookmark, ThumbsUp } from 'lucide-react';
import type { BlogPost } from '@/lib/blog-posts';
import { Button } from '@/components/ui/button';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import styles from './blog-index.module.css';

type Reaction = { liked: boolean; favorited: boolean };
const storageKey = 'research-library-blog-reactions';
type Option = { value: string; label: string };
function Filter({ label, value, options, onChange }: { label: string; value: string; options: Option[]; onChange: (value: string) => void }) {
  return <Select items={options} value={value} onValueChange={next => { if (next !== null) onChange(next); }}>
    <SelectTrigger aria-label={label} className={styles.filter}><SelectValue /></SelectTrigger>
    <SelectContent className={styles.popup} align="start" alignItemWithTrigger={false}>
      {options.map(option => <SelectItem className={styles.option} key={option.value} value={option.value}>{option.label}</SelectItem>)}
    </SelectContent>
  </Select>;
}
export function BlogIndex({ posts, basePath = '' }: { posts: BlogPost[]; basePath?: string }) {
  const [sort, setSort] = useState('date');
  const [reactions, setReactions] = useState<Record<string, Reaction>>({});
  useEffect(() => {
    try { const saved = localStorage.getItem(storageKey); if (saved) setReactions(JSON.parse(saved)); } catch {}
  }, []);
  function react(slug: string, field: keyof Reaction) {
    setReactions(current => {
      const old = current[slug] ?? { liked: false, favorited: false };
      const next = { ...current, [slug]: { ...old, [field]: !old[field] } };
      try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch {}
      return next;
    });
  }
  const popularity = (post: BlogPost) => post.likes + Number(!!reactions[post.slug]?.liked) + 2 * (post.favorites + Number(!!reactions[post.slug]?.favorited));
  const visible = [...posts].sort((a, b) => sort === 'popularity' ? popularity(b) - popularity(a) : sort === 'oldest' ? a.publishedAt.localeCompare(b.publishedAt) : b.publishedAt.localeCompare(a.publishedAt));
  return <div className={styles.journal}>
    <section className={styles.controls} aria-label="博客排序">
      <Filter label="排序方式" value={sort} onChange={setSort} options={[{value:'date',label:'最新发布'},{value:'oldest',label:'最早发布'},{value:'popularity',label:'按热度'}]} />
    </section>    <section aria-label="博客条目" className={styles.list}>
      {visible.map(post => <article className={styles.entry} key={post.slug}>
        <div className={styles.body}>
          <h2><Link href={`/blog/${post.slug}`}>{post.listTitle}</Link></h2>
          <p className={styles.summary}>{post.subtitle}</p>
          <div className={styles.entryFooter}><time dateTime={post.publishedAt}>{post.publishedLabel}</time><div className={styles.actions}>
            <Button variant="ghost" size="icon-sm" aria-label={`${reactions[post.slug]?.liked ? '取消点赞' : '点赞'}：${post.listTitle}`} aria-pressed={!!reactions[post.slug]?.liked} onClick={() => react(post.slug, 'liked')}><ThumbsUp size={14}/></Button>
            <Button variant="ghost" size="icon-sm" aria-label={`${reactions[post.slug]?.favorited ? '取消收藏' : '收藏'}：${post.listTitle}`} aria-pressed={!!reactions[post.slug]?.favorited} onClick={() => react(post.slug, 'favorited')}><Bookmark size={14}/></Button>
          </div></div>
        </div>
        <Link className={styles.cover} href={`/blog/${post.slug}`} tabIndex={-1} aria-label={`阅读：${post.listTitle}`}><img src={`${basePath}${post.cover}`} alt={post.coverAlt} width={620} height={350} loading="lazy" /></Link>
      </article>)}
      {!visible.length && <p className={styles.empty}>暂无文章</p>}
    </section>
  </div>;
}

