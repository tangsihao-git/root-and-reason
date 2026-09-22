import Link from 'next/link';
import { LegacyExampleRedirect } from '../../../../components/legacy-example-redirect';

const examples = [
  ['一阶自由衰减：分离变量法', '分离变量、代入初值并检查时间常数。', '/examples/dynamics/ode-free-decay'],
  ['一阶阶跃响应：积分因子法', '使用可交互的分步推导理解积分因子法。', '/examples/dynamics/ode-step-response'],
  ['衰减振荡：从特征根求完整响应', '从共轭特征根得到衰减频率、包络和初值响应。', '/examples/dynamics/ode-damped-oscillation'],
  ['周期输入：齐次解与待定系数特解', '组合齐次解与待定系数特解求受迫响应。', '/examples/dynamics/ode-periodic-input'],
  ['从二阶方程到耦合微分方程组', '把二阶方程改写为耦合的一阶状态方程组。', '/examples/dynamics/ode-state-system'],
  ['非线性方程：平衡点与小扰动线性化', '从平衡点出发构造小扰动线性模型。', '/examples/dynamics/ode-linearization'],
  ['拉普拉斯变换求解', '用拉普拉斯变换处理初值、耦合方程和延时输入。', '/examples/dynamics/laplace'],
  ['线性代数：两个实模态', '通过特征值与特征向量解耦两个实模态。', '/examples/dynamics/linear-two-modes'],
  ['状态空间：二阶振荡模态', '由状态矩阵特征值计算振荡频率和阻尼。', '/examples/dynamics/state-space-oscillation'],
];

export default function DynamicsExamples() {
  return (
    <>
      <LegacyExampleRedirect />
      <h1>微分方程与动态系统算例</h1>
      <p className="example-lead">按题目分别加载完整推导。选择一个算例后，可在公式、步骤和方法之间逐项核对。</p>
      <div className="example-index">
        {examples.map(([title, description, href]) => (
          <Link className="resource-row" href={href} prefetch={false} key={href}>
            <strong>{title} <span aria-hidden="true">→</span></strong>
            <p>{description}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
