import type { Metadata } from 'next';
import Link from 'next/link';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const metadata: Metadata = {
  title: '耦合 120 V 与 480 V 电网回路的现场连续同步波形记录与次同步探测',
  description:
    '解读连续同步波形记录与亚同步主动探测现场实验：从 120 V 注入，到穿过变压器后在 480 V 侧检出。',
  openGraph: {
    title: '耦合 120 V 与 480 V 电网回路的现场连续同步波形记录与次同步探测',
    description: '同步波形、主动探测与亚同步信号处理的一次完整现场验证。',
    type: 'article',
  },
};

export default function SubsynchronousProbingPost() {
  return (
    <main className="reading-page">
      <article className="reading-article">
        <Link className="reading-back" href="/blog" prefetch={false}>返回博客</Link>

        <header className="article-head">
          <div className="article-type-line">
            <span>论文</span>
            <span>同步波形 · 主动探测 · 亚同步</span>
          </div>
          <h1>耦合 120 V 与 480 V 电网回路的现场连续同步波形记录与次同步探测</h1>
          <p className="article-original-title" lang="en">In Situ Continuous Synchronized Waveform Recording and Sub-Synchronous Probing of Coupled 120 V and 480 V Grid Circuits</p>
          <p className="article-deck">
            作者把一个普通插座、一台 1 kW 电阻加热器和两类连续波形测量装置连成现场实验：
            先注入一个已知的微弱亚同步扰动，再从噪声中把它找回来。
          </p>
          <div className="article-byline">
            <time dateTime="2026-09-16">记录于 2026 年 9 月 16 日</time>
          </div>
        </header>

        <aside className="paper-slip" aria-label="来源信息">
          <span className="paper-slip-label">来源信息</span>
          <cite>In Situ Continuous Synchronized Waveform Recording and Sub-Synchronous Probing of Coupled 120 V and 480 V Grid Circuits</cite>
          <dl>
            <div>
              <dt>作者</dt>
              <dd>Troy Hussain, Hossein Mohsenzadeh-Yazdi, Alex McEachern, Hamed Mohsenian-Rad</dd>
            </div>
            <div><dt>来源</dt><dd>2026 IEEE/PES T&amp;D Conference and Exposition</dd></div>
            <div><dt>类型</dt><dd>会议论文 · 现场实验</dd></div>
          </dl>
          <a href="https://doi.org/10.1109/TD48022.2026.11562532" target="_blank" rel="noreferrer">
            DOI 10.1109/TD48022.2026.11562532
          </a>
        </aside>

        <div className="article-body four-part-article">
          <section id="summary">
            <div className="section-heading"><span>01</span><h2>文章摘要</h2></div>
            <p className="section-lead">
              这篇论文验证了一件此前更多停留在实验室或较高电压等级的问题：从普通 120 V 插座注入的极弱亚同步扰动，
              能否穿过配电网络和星—三角变压器，被 480 V 侧的公用事业级测量装置识别。
            </p>
            <blockquote>
              实验表明可以识别，但不能依靠肉眼观察原始波形；需要共同时间基准、已知探测频率和相干信号处理，把微弱响应从背景扰动中积累出来。
            </blockquote>
          </section>

          <section id="analysis">
            <div className="section-heading"><span>02</span><h2>详细分析</h2></div>
            <p>
              传统监测通常等待电网自己发生事件，再从相量、告警或触发录波中判断系统特性。这种方法面对强故障很有效，
              但对幅值很小、持续存在或低于工频的动态，问题在于“没有足够明确的输入”，也缺少连续原始波形作为证据。
            </p>

            <div className="logic-compare" aria-label="传统监测与作者方法对比">
              <div className="logic-panel">
                <span>传统监测</span>
                <strong>等待未知事件发生</strong>
                <ol>
                  <li>系统自然产生扰动</li>
                  <li>测量装置输出相量或触发记录</li>
                  <li>根据响应反推系统状态</li>
                </ol>
                <p>输入未知或不够强时，响应很难从噪声中确认。</p>
              </div>

              <div className="logic-bridge" aria-hidden="true">
                <span>把输入变成已知标签</span>
                <svg viewBox="0 0 94 22"><path d="M2 11h84M76 3l10 8-10 8" /></svg>
              </div>

              <div className="logic-panel logic-panel-accent">
                <span>作者方法</span>
                <strong>主动注入已知微扰</strong>
                <ol>
                  <li>指定探测频率和发生时间</li>
                  <li>连续同步记录多点原始波形</li>
                  <li>只在已知频率上相干积累响应</li>
                </ol>
                <p>微扰很弱也没关系，因为频率、时间和相位关系都可以被利用。</p>
              </div>
            </div>

            <div className="plain-explanation">
              <strong>这里注入的并不是一条独立的 5 Hz 或 20 Hz 电压波。</strong>
              <p>
                GridSweep 周期性地改变加热器的电流消耗，使 60 Hz 电压载波的幅值缓慢起伏。
                作者要寻找的是这个“包络起伏”的频率，而不是直接在原始电压波形中寻找一条低频正弦波。
              </p>
            </div>
            <p>
              整套方法可以压缩为四步。数学上并不神秘，真正困难的是让不同设备、不同采样率和变压器两侧的数据能够放在同一条时间线上比较。
            </p>

            <ol className="method-flow">
              <li>
                <span>同步采集</span>
                <strong>先让不同装置对齐同一时刻</strong>
                <p>120 V GridSweep 约 4 kHz 采样；480 V Axion 以 3 kHz、每周波 50 点采样。两类记录都带 GPS 时间戳。</p>
              </li>
              <li>
                <span>电气换算</span>
                <strong>消除变压器连接方式带来的表达差异</strong>
                <p>将 Axion 的三相相电压换算为线电压，再与 120 V 侧波形比较；30° 相移不会被误认为时间未对齐。</p>
              </li>
              <li>
                <span>包络解调</span>
                <strong>从 60 Hz 载波中取出慢速幅值变化</strong>
                <p>使用同相/正交解调和 64 阶低通滤波，再对 30 秒数据窗进行 2<sup>17</sup> 点 FFT，只保留 1–40 Hz。</p>
              </li>
              <li>
                <span>相干积累</span>
                <strong>让已知探测信号累加，让无关成分抵消</strong>
                <p>在 15 分钟滑动窗内做矢量平均，并把每个 GPS 分钟后半段旋转 180°，削弱相位恒定的背景干扰。</p>
              </li>
            </ol>

            <div className="method-result">
              <span>最终输出</span>
              <p>
                横轴是时间，纵轴是调制频率，颜色表示幅值。若热力图中的高能量轨迹与预设探测计划同步移动，
                就说明测点确实观察到了注入信号。
              </p>
            </div>
          </section>

          <section id="data">
            <div className="section-heading"><span>03</span><h2>关键数据</h2></div>
            <div className="minute-grid">
              <div>
                <span>探测输入</span>
                <strong>1 kW 电阻加热器，1–40 Hz 调制</strong>
                <p>通过轻微改变负载电流，让 60 Hz 电压波形产生幅值调制。</p>
              </div>
              <div>
                <span>同步采样</span>
                <strong>120 V 约 4 kHz；480 V 为 3 kHz</strong>
                <p>两类设备均使用 GPS 时间戳，支持跨设备和跨电压等级对齐。</p>
              </div>
              <div>
                <span>信号处理</span>
                <strong>2¹⁷ 点 FFT，15 分钟矢量平均</strong>
                <p>分析范围保留在 1–40 Hz，并通过相干积累增强微弱探测轨迹。</p>
              </div>
            </div>
            <p>
              论文最关键的证据是原文图 7 和图 8。两张图使用相同的时间与频率坐标，分别展示远端 120 V 测点和变压器另一侧 480 V 测点的解调结果。
            </p>

            <div className="result-figures">
              <figure>
                <img
                  src={`${basePath}/images/blog/subsync-probing-120v.png`}
                  alt="远端 120 V GridSweep 测得的亚同步幅值调制时频热力图"
                  width={619}
                  height={471}
                  loading="lazy"
                />
                <figcaption>
                  <span>原文图 7 · 120 V 远端测点</span>
                  黑色和深蓝色轨迹随时间从约 25 Hz 降至 21 Hz，再回到 26 Hz 附近，与探测频率计划一致。
                </figcaption>
              </figure>

              <figure>
                <img
                  src={`${basePath}/images/blog/subsync-probing-480v.png`}
                  alt="480 V Axion 测得的亚同步幅值调制时频热力图"
                  width={619}
                  height={479}
                  loading="lazy"
                />
                <figcaption>
                  <span>原文图 8 · 480 V Axion 测点</span>
                  背景噪声更强、轨迹幅值更弱，但同一条频率变化路径仍然存在，说明微扰穿过了星—三角变压器。
                </figcaption>
              </figure>
            </div>

            <p className="figure-source">
              图表节选自 Hussain 等人的原文图 7、图 8，用于说明实验结果；坐标与数据未重新绘制。
            </p>
          </section>

          <section id="conclusions">
            <div className="section-heading"><span>04</span><h2>重要结论</h2></div>
            <p>
              这项现场实验说明，低压端主动探测与连续同步波形可以组成一条可运行的测量链路。真正发挥作用的不是单一设备的高采样率，
              而是已知输入、多点同步记录和针对幅值调制的处理方法共同形成的可辨识条件。
            </p>
            <div className="result-reading">
              <div>
                <span>实验已经证明</span>
                <p>低压侧的微弱亚同步调制可以在现场环境中跨电压等级被同步波形装置检出。</p>
              </div>
              <div>
                <span>实验尚未证明</span>
                <p>热力图还不能直接给出完整馈线模型或稳定裕度；这些应用仍需要校准注入幅值、传播路径和背景扰动。</p>
              </div>
            </div>
          </section>
        </div>
      </article>
    </main>
  );
}
