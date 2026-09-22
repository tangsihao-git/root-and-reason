export type BlogPost = {
  slug: string;
  title: string;
  listTitle: string;
  topics: string[];
  titleEn: string;
  subtitle: string;
  type: '论文' | '报告' | '书籍章节';
  authors: string[];
  source: string;
  publicationYear: number;
  publishedAt: string;
  publishedLabel: string;
  keywords: string[];
  likes: number;
  favorites: number;
  cover: string;
  coverAlt: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'subsynchronous-probing',
    listTitle: '用同步波形追踪跨电压等级的次同步扰动',
    topics: ['同步量测', '振荡分析', '现场实验'],
    title: '耦合 120 V 与 480 V 电网回路的现场连续同步波形记录与次同步探测',
    titleEn: 'In Situ Continuous Synchronized Waveform Recording and Sub-Synchronous Probing of Coupled 120 V and 480 V Grid Circuits',
    subtitle:
      '研究通过 GPS 同步连续波形记录与主动负载调制，验证低压侧微弱次同步扰动跨变压器传播并在 480 V 侧被识别的可行性。',
    type: '论文',
    authors: [
      'Troy Hussain',
      'Hossein Mohsenzadeh-Yazdi',
      'Alex McEachern',
      'Hamed Mohsenian-Rad',
    ],
    source: '2026 IEEE/PES Transmission and Distribution Conference and Exposition',
    publicationYear: 2026,
    publishedAt: '2026-09-16',
    publishedLabel: '2026.09.16',
    keywords: ['同步波形', '主动探测', '亚同步', '现场实验'],
    likes: 36,
    favorites: 21,
    cover: '/images/blog/subsync-probing-480v.png',
    coverAlt: '480 V 测点记录的亚同步幅值调制时频热力图',
  },
  {
    slug: 'synchro-waveforms',
    listTitle: '从同步相量到同步波形：量测数据的新边界',
    topics: ['同步量测', '数据分析'],
    title: '同步波形：通向电力系统数据分析未来的窗口',
    titleEn: 'Synchro-Waveforms: A Window to the Future of Power Systems Data Analytics',
    subtitle:
      '文章比较同步相量与同步波形的信息边界，讨论连续高分辨率波形在快速动态辨识、宽频分析及数据工程中的价值与代价。',
    type: '论文',
    authors: ['Hamed Mohsenian-Rad', 'Wilsun Xu'],
    source: 'IEEE Power & Energy Magazine, 21(5), 68–77',
    publicationYear: 2023,
    publishedAt: '2026-09-15',
    publishedLabel: '2026.09.15',
    keywords: ['同步波形', 'WMU', '数据分析', '量测分辨率'],
    likes: 28,
    favorites: 17,
    cover: '/images/blog/synchro-waveforms-cover.svg',
    coverAlt: '连续同步波形与离散相量采样的示意图',
  },
];
