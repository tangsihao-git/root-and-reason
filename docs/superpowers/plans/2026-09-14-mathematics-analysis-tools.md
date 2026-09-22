# 数学基础与分析工具 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** 将“宽频振荡分析”下六个基础页面补充为可连续学习、可查公式、可照例计算的完整手册章节。

**Architecture:** 保留现有六页目录与 URL，按“模型—求解—变换—网络—坐标—分析”组织内容。每页采用概念、公式、典型例题、工程解释和检查表的统一结构，并让相邻页面通过文内链接衔接。

**Tech Stack:** Fumadocs、MDX、remark-math、rehype-katex、KaTeX、Next.js 静态导出。

**Spec:** 本计划直接落实用户对“先把宽频振荡分析中的数学基础和分析工具这一章填写好”的要求。

## Global Constraints

- 保留 `content/docs/oscillation/mathematics/meta.json` 中六页顺序及现有 URL。
- 中文采用手册式表述，公式给出符号定义、适用条件和工程含义。
- 典型例题必须展示步骤和可核对的结果。
- 不扩写机理、溯源和抑制章节，只提供必要的后续链接。
- 所有公式必须通过 KaTeX 构建，所有站内链接必须可解析。

---

### Task 1: 补齐线性代数与拉普拉斯变换

**Files:**
- Modify: `content/docs/oscillation/mathematics/linear-algebra.mdx`
- Modify: `content/docs/oscillation/mathematics/laplace.mdx`

- [x] 写清状态空间、特征值、矩阵指数、模态分解、若尔当形和参与因子，并用二状态系统贯穿计算。
- [x] 补齐拉氏变换定义、性质、方程组求解、逆变换、传递函数和极零点解释，保留现有五个例题。
- [x] 交叉核对两页中的极点、特征值、阻尼和初值约定。

### Task 2: 补齐端口网络与坐标变换

**Files:**
- Modify: `content/docs/oscillation/mathematics/port-networks.mdx`
- Modify: `content/docs/oscillation/mathematics/coordinates.mdx`

- [x] 从 KCL/KVL 和 RLC 元件建立端口阻抗、导纳、二端口与动态端口模型。
- [x] 给出串并联互联、受控源、功率和无源性的判定边界。
- [x] 统一 Clarke、Park、正负序及 dq/序域频率映射的变换约定，并给出三相算例。

### Task 3: 补齐稳定性与信号分析工具

**Files:**
- Modify: `content/docs/oscillation/mathematics/stability-signals.mdx`

- [x] 写清特征值稳定性、阻尼、灵敏度、Bode/Nyquist 判据的适用对象。
- [x] 写清 DFT/STFT、采样、混叠、泄漏、窗函数、PSD/CPSD/相干性的计算流程。
- [x] 给出频率分辨率、相位关系和信息熵的典型算例及误用边界。

### Task 4: 完整性与构建验证

**Files:**
- Modify: `tools/verify-build.cjs`

- [x] 增加六页无占位文字、标题数量和公式渲染的内容完整性检查。
- [x] 运行静态构建、站内链接检查、搜索索引检查和 `git diff --check`。
- [x] 发布经过验证的静态站点版本。

