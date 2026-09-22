import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '同步波形：通向电力系统数据分析未来的窗口',
  description: '同步波形量测保留了什么信息，又给电力系统数据分析带来了哪些工程代价。',
  openGraph: {
    title: '同步波形：通向电力系统数据分析未来的窗口',
    description: '理解 WMU 的信息增量、工程链路和适用边界。',
    type: 'article',
  },
};

export default function SynchroWaveformsPost() {
  return (
    <main className="reading-page">
      <article className="reading-article">
        <Link className="reading-back" href="/blog" prefetch={false}>返回博客</Link>

        <header className="article-head">
          <div className="article-type-line">
            <span>论文</span>
            <span>同步波形 · WMU · 数据分析</span>
          </div>
          <h1>同步波形：通向电力系统数据分析未来的窗口</h1>
          <p className="article-original-title" lang="en">Synchro-Waveforms: A Window to the Future of Power Systems Data Analytics</p>
          <p className="article-deck">
            PMU 用相量压缩连续波形，换来了可传输、可比较的广域动态数据。
            WMU 则把波形细节重新放回共同时间轴，让后端算法决定哪些信息值得保留。
          </p>
          <div className="article-byline">
            <time dateTime="2026-09-15">记录于 2026 年 9 月 15 日</time>
          </div>
        </header>

        <aside className="paper-slip" aria-label="来源信息">
          <span className="paper-slip-label">来源信息</span>
          <cite>Synchro-Waveforms: A Window to the Future of Power Systems Data Analytics</cite>
          <dl>
            <div><dt>作者</dt><dd>Hamed Mohsenian-Rad, Wilsun Xu</dd></div>
            <div><dt>来源</dt><dd>IEEE Power &amp; Energy Magazine, 21(5), 68–77</dd></div>
            <div><dt>年份</dt><dd>2023</dd></div>
          </dl>
          <a href="https://doi.org/10.1109/MPE.2023.3288583" target="_blank" rel="noreferrer">
            DOI 10.1109/MPE.2023.3288583
          </a>
        </aside>

        <div className="article-body four-part-article">
          <section>
            <div className="section-heading"><span>01</span><h2>文章摘要</h2></div>
            <p className="section-lead">
              文章提出的核心问题是：当电力电子设备带来更多亚周波暂态、谐波、间谐波和快速控制响应时，
              只保存基波相量是否仍然足够。
            </p>
            <blockquote>
              同步波形不是“采样率更高的 PMU”。它改变的是被保存的信息边界，以及后续算法还能提出哪些问题。
            </blockquote>
            <div className="overview-points">
              <div><strong>保留瞬时波形</strong><p>不在前端把信号立即压缩为幅值和相角，亚周波与宽频信息仍可在后端重新分析。</p></div>
              <div><strong>建立共同时间轴</strong><p>不同地点的波形可以比较事件到达时间、传播次序和相位关系。</p></div>
              <div><strong>把压力移到数据链路</strong><p>更大的吞吐量、存储量和时钟精度要求必须与应用价值一起评估。</p></div>
            </div>
          </section>

          <section>
            <div className="section-heading"><span>02</span><h2>详细分析</h2></div>
            <p>
              PMU 在设备端就假定信号可以用基波相量、频率和频率变化率描述。这个假设让数据量大幅下降，
              但被模型排除的细节也无法在后端恢复。作者提出的同步波形路线先保留连续点波形，再根据具体任务提取特征。
            </p>
            <div className="logic-compare">
              <div className="logic-panel">
                <span>相量路线</span>
                <strong>先规定特征，再保存结果</strong>
                <ol><li>滑动窗获取波形</li><li>估计相量、频率与 ROCOF</li><li>上传低速特征流</li></ol>
                <p>适合成熟、明确且以基波为中心的监视任务。</p>
              </div>
              <div className="logic-bridge" aria-hidden="true"><span>保留更多解释权</span><svg viewBox="0 0 94 22"><path d="M2 11h84M76 3l10 8-10 8" /></svg></div>
              <div className="logic-panel logic-panel-accent">
                <span>同步波形路线</span>
                <strong>先保存证据，再选择特征</strong>
                <ol><li>连续采集原始点波形</li><li>用统一时间标记跨点对齐</li><li>按事件或任务选择算法</li></ol>
                <p>适合机制尚未完全明确、需要回看波形细节的研究任务。</p>
              </div>
            </div>
          </section>

          <section>
            <div className="section-heading"><span>03</span><h2>关键数据</h2></div>
            <p>
              这篇文章不以单一实验数据为中心，真正需要记录的是同步波形链路中的四类信息：可见频带、时间精度、连续记录能力和后端实际使用的特征。
              任意一项不足，都会限制原始波形能够支持的分析任务。
            </p>
            <ol className="method-flow">
              <li><span>感知</span><strong>模拟前端决定真正可见的频带</strong><p>传感器带宽、抗混叠滤波、量化噪声和通道延迟共同限制波形是否可信。</p></li>
              <li><span>同步</span><strong>时间误差会变成跨点关系误差</strong><p>多个站点只有在同一时间基准下记录，才能利用到达时间、相位和传播关系。</p></li>
              <li><span>记录</span><strong>连续不等于全部实时上传</strong><p>边缘缓存、事件索引、压缩和分层保存决定系统是否能长期运行。</p></li>
              <li><span>分析</span><strong>算法应说明自己真正使用了哪些细节</strong><p>若应用最终只依赖基波附近信息，高速波形的成本就没有转化为新的辨识能力。</p></li>
            </ol>
          </section>

          <section>
            <div className="section-heading"><span>04</span><h2>重要结论</h2></div>
            <p>
              这篇文章不以某一组实验结果为中心。它给出的关键结论，是同步波形可以把故障萌芽、快速暂态、设备开关行为和宽频振荡放到统一的数据形态中处理，
              并让不同地点的波形直接建立联系。
            </p>
            <div className="result-reading">
              <div><span>真正新增的能力</span><p>研究者可以在事件发生后回到原始证据，重新选择时间尺度、频段和特征，而不受前端相量模型限制。</p></div>
              <div><span>必须付出的代价</span><p>采样链路标定、时间同步、数据治理和任务驱动的压缩算法必须一起设计，否则“更多数据”不会自然变成“更多知识”。</p></div>
            </div>
            <p>
              因此，WMU 更适合作为 PMU 的补充：PMU 继续承担成熟的实时广域监视，WMU 则服务于需要波形证据、机制探索和更高时间分辨率的任务。
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
