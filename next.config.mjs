import createMDX from '@next/mdx';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import equationReferences from './tools/rehype-equation-references.mjs';
import readableMath from './tools/rehype-readable-math.mjs';
import rehypeBasePath from './tools/rehype-base-path.mjs';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const withMDX = createMDX({ extension: /\.(md|mdx)$/, options: {
  remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm, remarkMath],
  rehypePlugins: [rehypeSlug, equationReferences, [rehypeKatex, { strict: false }], readableMath, [rehypeBasePath, { base: basePath }]],
}});
export default withMDX({
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  output: 'export',
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  experimental: { cpus: 4 },
});
