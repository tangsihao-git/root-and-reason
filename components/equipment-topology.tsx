import styles from './equipment-topology.module.css';

type Kind = 'pmsg' | 'dfig' | 'svg' | 'ups' | 'vsg' | 'dcdc';

function Box({ x, y, w, label, sub, accent = false }: { x: number; y: number; w: number; label: string; sub?: string; accent?: boolean }) {
  return <g>
    <rect className={accent ? styles.accent : styles.node} x={x} y={y} width={w} height="58" rx="4" />
    <text className={styles.label} x={x + w / 2} y={y + 26}>{label}</text>
    {sub ? <text className={styles.small} x={x + w / 2} y={y + 44}>{sub}</text> : null}
  </g>;
}

function Line({ x1, y1, x2, y2, signal = false, marker = true }: { x1: number; y1: number; x2: number; y2: number; signal?: boolean; marker?: boolean }) {
  return <line className={signal ? styles.signal : styles.wire} x1={x1} y1={y1} x2={x2} y2={y2} markerEnd={marker ? 'url(#arrow)' : undefined} />;
}

function Diagram({ kind }: { kind: Kind }) {
  if (kind === 'pmsg') return <>
    <text className={styles.section} x="36" y="35">机械能</text><text className={styles.section} x="353" y="35">全功率变流</text><text className={styles.section} x="720" y="35">交流端口</text>
    <Box x={35} y={80} w={120} label="风轮与轴系" sub="ωt, θs" /><Line x1={155} y1={109} x2={190} y2={109} />
    <Box x={190} y={80} w={115} label="PMSG" sub="dq 电磁状态" /><Line x1={305} y1={109} x2={340} y2={109} />
    <Box x={340} y={80} w={125} label="机侧变流器" sub="转矩 / 转速" /><Line x1={465} y1={109} x2={500} y2={109} />
    <Box x={500} y={80} w={105} label="DC 链" sub="Cdc, udc" accent /><Line x1={605} y1={109} x2={640} y2={109} />
    <Box x={640} y={80} w={125} label="网侧变流器" sub="udc / Q" /><Line x1={765} y1={109} x2={800} y2={109} />
    <Box x={800} y={80} w={70} label="电网" sub="PCC" />
    <path className={styles.signal} d="M402 174v-28M702 174v-28" /><text className={styles.small} x="402" y="194">MSC 控制</text><text className={styles.small} x="702" y="194">GSC + PLL</text>
  </>;

  if (kind === 'dfig') return <>
    <Box x={40} y={88} w={120} label="风轮与轴系" sub="ωt, θs" /><Line x1={160} y1={117} x2={200} y2={117} />
    <Box x={200} y={88} w={125} label="双馈感应机" sub="定子 / 转子" accent />
    <path className={styles.wire} d="M325 104H720" markerEnd="url(#arrow)"/><text className={styles.small} x="515" y="91">定子直接并网</text>
    <path className={styles.wire} d="M263 146v48h92" markerEnd="url(#arrow)"/>
    <Box x={355} y={165} w={115} label="转子侧 RSC" sub="P/Q 或转矩" /><Line x1={470} y1={194} x2={500} y2={194} />
    <Box x={500} y={165} w={95} label="DC 链" sub="udc" /><Line x1={595} y1={194} x2={625} y2={194} />
    <Box x={625} y={165} w={115} label="网侧 GSC" sub="udc / Q" />
    <path className={styles.wire} d="M740 194h35V117H720" markerEnd="url(#arrow)"/>
    <Box x={775} y={88} w={90} label="电网" sub="PCC" />
  </>;

  if (kind === 'svg') return <>
    <text className={styles.section} x="32" y="30">并联主电路</text><text className={styles.section} x="525" y="30">分层控制</text>
    <Box x={30} y={82} w={95} label="PCC" sub="ug, iL" /><Line x1={125} y1={111} x2={160} y2={111} />
    <Box x={160} y={82} w={95} label="连接电抗器" sub="L, R" /><Line x1={255} y1={111} x2={290} y2={111} />
    <Box x={290} y={56} w={155} label="A 相：H1—H2—…—HN" sub="独立电容，模块电压相加" accent />
    <Box x={290} y={127} w={155} label="B、C 相换流链" sub="三相星形连接" />
    <path className={styles.wire} d="M290 111h-16v45h16M445 85h24v98H445" />
    <Box x={520} y={52} w={145} label="外部任务" sub="恒电压 / 恒无功" /><Line x1={665} y1={81} x2={700} y2={81} signal />
    <Box x={700} y={52} w={155} label="dq 电流内环" sub="PI + 解耦 + 前馈" accent />
    <Box x={520} y={130} w={145} label="整机能量" sub="udc,ave → id*" /><Line x1={665} y1={159} x2={700} y2={159} signal />
    <Box x={700} y={130} w={155} label="相间 / 相内均压" sub="小量调制修正" />
    <path className={styles.signal} d="M777 188v27H367v-29" markerEnd="url(#arrow)" />
  </>;

  if (kind === 'ups') return <>
    <Box x={35} y={83} w={100} label="电网" sub="旁路输入" /><Line x1={135} y1={112} x2={175} y2={112} />
    <Box x={175} y={83} w={125} label="整流器 / PFC" sub="输入电流控制" /><Line x1={300} y1={112} x2={340} y2={112} />
    <Box x={340} y={83} w={105} label="DC 母线" sub="Cdc" accent /><Line x1={445} y1={112} x2={485} y2={112} />
    <Box x={485} y={83} w={115} label="逆变器" sub="电压 / 电流环" /><Line x1={600} y1={112} x2={640} y2={112} />
    <Box x={640} y={83} w={95} label="LC 滤波" sub="vo, io" /><Line x1={735} y1={112} x2={775} y2={112} />
    <Box x={775} y={83} w={90} label="关键负载" sub="Pload" />
    <Box x={270} y={177} w={115} label="电池 / 储能" sub="SOC" /><path className={styles.wire} d="M385 206h24v-65" markerEnd="url(#arrow)" />
    <path className={styles.signal} d="M85 72V45H820v38" /><text className={styles.small} x="455" y="36">静态旁路与模式切换</text>
  </>;

  if (kind === 'vsg') return <>
    <Box x={30} y={92} w={115} label="储能 / DC 源" sub="能量与功率约束" /><Line x1={145} y1={121} x2={190} y2={121} />
    <Box x={190} y={92} w={120} label="电压源变流器" sub="PWM" /><Line x1={310} y1={121} x2={355} y2={121} />
    <Box x={355} y={92} w={100} label="滤波器" sub="LC / LCL" /><Line x1={455} y1={121} x2={500} y2={121} />
    <Box x={500} y={92} w={100} label="PCC" sub="P, Q, v" /><Line x1={600} y1={121} x2={645} y2={121} />
    <Box x={645} y={92} w={105} label="电网" sub="Zg(s)" />
    <Box x={215} y={185} w={150} label="虚拟摆动方程" sub="P → ω, θ" accent /><Line x1={365} y1={214} x2={410} y2={214} signal />
    <Box x={410} y={185} w={150} label="Q—V 与虚拟阻抗" sub="E*, Zv" /><path className={styles.signal} d="M560 214h37V151" markerEnd="url(#arrow)" />
    <path className={styles.signal} d="M550 151v18H290v16" markerEnd="url(#arrow)" />
  </>;

  return <>
    <text className={styles.section} x="35" y="34">Buck：降压</text>
    <Box x={35} y={70} w={100} label="高压端" sub="Vin" /><Line x1={135} y1={99} x2={180} y2={99} />
    <Box x={180} y={70} w={105} label="开关桥臂" sub="占空比 d" /><Line x1={285} y1={99} x2={330} y2={99} />
    <Box x={330} y={70} w={90} label="电感 L" sub="iL" /><Line x1={420} y1={99} x2={465} y2={99} />
    <Box x={465} y={70} w={110} label="低压端" sub="C, Vo" accent />
    <text className={styles.section} x="35" y="168">Boost：升压</text>
    <Box x={35} y={184} w={100} label="低压端" sub="Vin" /><Line x1={135} y1={213} x2={180} y2={213} />
    <Box x={180} y={184} w={90} label="电感 L" sub="iL" /><Line x1={270} y1={213} x2={315} y2={213} />
    <Box x={315} y={184} w={105} label="开关网络" sub="d / 1-d" /><Line x1={420} y1={213} x2={465} y2={213} />
    <Box x={465} y={184} w={110} label="高压端" sub="C, Vo" accent />
    <Box x={650} y={126} w={185} label="双向储能接口" sub="电流内环 + 母线 / 功率外环" />
    <path className={styles.signal} d="M575 99h40v56h35M575 213h40v-58" markerEnd="url(#arrow)" />
  </>;
}

const captions: Record<Kind, string> = {
  pmsg: '永磁同步风电机组采用全功率背靠背变流器，机械侧与电网之间的主要动态耦合通过直流链和控制器建立。',
  dfig: '双馈风电机组的定子直接并网，转子功率经部分容量背靠背变流器交换，因此保留了更直接的电磁—网络耦合。',
  svg: '星形级联 H 桥 SVG：各模块直流电容彼此独立，模块电压串联叠加；外部无功任务与内部三层能量平衡共同决定调制指令。',
  ups: '在线双变换 UPS 将输入电能经直流母线重新合成为负载电压，并由储能支路和静态旁路维持供电连续性。',
  vsg: '虚拟同步机把有功功率误差送入虚拟摆动方程形成频率和相角，再由电压控制与虚拟阻抗塑造交流端口。',
  dcdc: 'Buck 与 Boost 的差异来自开关周期内电感所连接的电压状态；双向储能接口通常把两种工作方向统一在同步半桥中。',
};

export function EquipmentTopology({ kind }: { kind: Kind }) {
  return <figure className={styles.figure}>
    <svg viewBox="0 0 900 260" role="img" aria-label={captions[kind]}>
      <defs><marker id="arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 8 4 0 8Z" fill="currentColor" /></marker></defs>
      <Diagram kind={kind} />
    </svg>
    <figcaption>{captions[kind]}</figcaption>
  </figure>;
}

