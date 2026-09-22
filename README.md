# 技术研究文库

基于 Next.js App Router、React、TypeScript、shadcn/ui（Base UI）与 Tailwind CSS 的静态研究网站。

## 本地使用

安装 Node.js 24 和 pnpm 11，执行：

```sh
pnpm install --frozen-lockfile
pnpm dev
```

开发地址 http://127.0.0.1:4321。运行 `pnpm check` 检查类型，`pnpm build` 生成静态网站到 `out/`，`pnpm preview` 预览。开发与预览不要同时运行。完整全文搜索需要生产构建。

## 编辑内容

- `content/docs/`：Markdown/MDX 文档，各级 `meta.json` 控制目录顺序。
- `app/blog/` 和 `lib/blog-posts.ts`：博客内容与列表元数据。
- `app/examples/(workbooks)/`：交互算例。
- `public/`：当前图片与静态素材。
- `components/`：导航、搜索、公式交互和本地 UI 组件。
- `tools/prepare-docs.mjs`：自动生成 `lib/generated/`，不要手动编辑生成文件。

公式使用 LaTeX，由 KaTeX 渲染。独立公式自动编号，支持 `\tag{…}`、`\label{eq:名称}` 和 `[[eq:名称]]` 引用。图片通过 `DocFigure` 设置 src、alt、caption。

电路图的可选生成脚本为 `tools/draw-series-rl.py`，需要独立 Python 环境中的 matplotlib 与 schemdraw；日常网站构建直接使用已生成的 SVG。

## GitHub Pages

在仓库 Settings → Pages 中选择 GitHub Actions。推送到 `main` 后，工作流自动构建并发布，自动设置仓库子路径。其他静态服务器可直接托管 `out/`；需要子路径时设置 `NEXT_PUBLIC_BASE_PATH`。

依赖、构建输出、生成索引、缓存、临时导出和本地托管配置不上传。旧网址的静态跳转配置仍保留，以维持链接兼容性。
