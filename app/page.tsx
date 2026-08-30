import {
  BookMarked,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  ExternalLink,
  FileCode2,
  FileText,
  GitBranch,
  GitPullRequest,
  Languages,
  Search,
  Sparkles,
} from 'lucide-react';

const githubUser = 'xixi-cc';
const githubUrl = `https://github.com/${githubUser}`;

type GithubProfile = {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
};

async function getGithubProfile(): Promise<GithubProfile | null> {
  try {
    const response = await fetch(`https://api.github.com/users/${githubUser}`, {
      headers: { Accept: 'application/vnd.github+json' },
      next: { revalidate: 3600 },
    });
    if (!response.ok) return null;
    return (await response.json()) as GithubProfile;
  } catch {
    return null;
  }
}

const navItems = [
  { label: '原著', href: '#originals', icon: BookOpen },
  { label: '译本', href: '#translations', icon: Languages },
  { label: '术语', href: '#terms', icon: BookMarked },
  { label: '指南', href: '#guide', icon: FileText },
];

const translations = [
  {
    zh: '场的统计物理',
    en: 'Statistical Physics of Fields',
    field: '统计场论',
    status: '完整译本',
    format: 'PDF · LaTeX',
  },
  {
    zh: '集群运动的物理学',
    en: 'The Physics of Flocking',
    field: '非平衡物理',
    status: '完整译本',
    format: 'PDF · LaTeX',
  },
  {
    zh: '相变与临界现象基础',
    en: 'Elements of Phase Transitions and Critical Phenomena',
    field: '相变与临界现象',
    status: '完整译本',
    format: 'PDF · LaTeX',
  },
  {
    zh: '非平衡统计物理',
    en: 'Nonequilibrium Statistical Physics',
    field: '统计物理',
    status: '完整译本',
    format: 'PDF · LaTeX',
  },
];

const terms = [
  ['absorbing state', '吸收态', '非平衡相变'],
  ['coarsening', '粗化', '相变动力学'],
  ['flocking', '集群运动', '主动软物质'],
  ['order parameter', '序参量', '统计物理'],
];

export default async function Home() {
  const profile = await getGithubProfile();

  return (
    <main>
      <header className="topbar">
        <div className="topbar-inner">
          <a className="brand" href="#top" aria-label="物译 AI 首页">
            <span className="brand-icon">φ<span>AI</span></span>
            <strong>物译 AI</strong>
            <small>PhysAI</small>
          </a>
          <div className="site-search" role="search">
            <Search size={16} />
            <span>搜索原著、译本或术语</span>
            <kbd>/</kbd>
          </div>
          <a className="github-link" href={githubUrl} target="_blank" rel="noreferrer">
            <GitBranch size={19} /><span>{githubUser}</span><ExternalLink size={13} />
          </a>
        </div>
      </header>

      <div className="repo-nav" id="top">
        <div className="repo-nav-inner">
          {navItems.map(({ label, href, icon: Icon }, index) => (
            <a href={href} className={index === 1 ? 'active' : ''} key={label}>
              <Icon size={16} /> {label}
              {index === 1 && <span className="count">{translations.length}</span>}
            </a>
          ))}
        </div>
      </div>

      <div className="page-shell">
        <aside className="profile-column">
          <a href={profile?.html_url ?? githubUrl} target="_blank" rel="noreferrer">
            <img className="avatar" src={profile?.avatar_url ?? `https://github.com/${githubUser}.png?size=220`} alt={`${githubUser} 的 GitHub 头像`} />
          </a>
          <h1>{profile?.name ?? 'xineng cao'}</h1>
          <p className="username">{profile?.login ?? githubUser}</p>
          <p className="profile-note">物理研究 · AI 工具 · 中文科学翻译</p>
          <a className="profile-button" href={githubUrl} target="_blank" rel="noreferrer">
            <GitBranch size={16} /> 查看 GitHub 主页
          </a>
          <div className="profile-stats">
            <span><strong>{profile?.public_repos ?? '—'}</strong> 公开仓库</span>
            <span className="live-dot"><i /> GitHub 已联动</span>
          </div>
          <div className="profile-links">
            <a href="https://github.com/xixi-cc/physics_AI" target="_blank" rel="noreferrer"><FileCode2 size={15} /> physics_AI</a>
            <a href="https://github.com/xixi-cc/article-share" target="_blank" rel="noreferrer"><FileText size={15} /> article-share</a>
            <a href="https://github.com/xixi-cc/paper-collection" target="_blank" rel="noreferrer"><BookOpen size={15} /> paper-collection</a>
          </div>
        </aside>

        <div className="content-column">
          <section className="repo-heading">
            <div className="repo-path"><Languages size={18} /><a href={githubUrl}>{githubUser}</a><span>/</span><strong>physics-translations</strong><span className="visibility">Public</span></div>
            <a className="outline-button" href={githubUrl} target="_blank" rel="noreferrer"><GitBranch size={15} /> GitHub</a>
          </section>

          <section className="overview-grid" aria-label="资料概览">
            <a href="#originals"><BookOpen size={20} /><span><strong>原著</strong><small>英文原版与来源信息</small></span><ChevronRight size={16} /></a>
            <a href="#translations"><Languages size={20} /><span><strong>译本</strong><small>中文 PDF 与 LaTeX 工程</small></span><ChevronRight size={16} /></a>
            <a href="#terms"><BookMarked size={20} /><span><strong>术语</strong><small>中英物理术语对照</small></span><ChevronRight size={16} /></a>
            <a href="#guide"><FileText size={20} /><span><strong>指南</strong><small>翻译、审核与交付规范</small></span><ChevronRight size={16} /></a>
          </section>

          <section className="panel" id="translations">
            <div className="panel-header">
              <div><Languages size={18} /><strong>最新译本</strong></div>
              <span>AI 初译 · 物理审核 · LaTeX 交付</span>
            </div>
            <div className="file-list">
              {translations.map((item) => (
                <article className="file-row" key={item.en}>
                  <FileText className="file-icon" size={18} />
                  <div className="file-main"><h2>{item.zh}</h2><p>{item.en}</p></div>
                  <span className="field-label">{item.field}</span>
                  <span className="status"><CheckCircle2 size={14} /> {item.status}</span>
                  <span className="format">{item.format}</span>
                </article>
              ))}
            </div>
          </section>

          <section className="split-grid">
            <div className="panel" id="originals">
              <div className="panel-header"><div><BookOpen size={18} /><strong>原著</strong></div><span>Source</span></div>
              <div className="compact-list">
                {translations.slice(0, 3).map((item) => <div key={item.en}><FileText size={16} /><span>{item.en}</span><CircleDot size={13} /></div>)}
              </div>
            </div>
            <div className="panel" id="guide">
              <div className="panel-header"><div><GitPullRequest size={18} /><strong>制作指南</strong></div><span>Guide</span></div>
              <ol className="guide-list">
                <li><span>1</span>确认原文版本与翻译范围</li>
                <li><span>2</span>建立术语表与符号约定</li>
                <li><span>3</span>逐章翻译、编译与物理审核</li>
                <li><span>4</span>交付 PDF、源码与问题记录</li>
              </ol>
            </div>
          </section>

          <section className="panel" id="terms">
            <div className="panel-header"><div><BookMarked size={18} /><strong>常用术语</strong></div><span>Terms</span></div>
            <div className="terms-table" role="table" aria-label="物理术语表">
              <div className="terms-head" role="row"><span>English</span><span>中文</span><span>领域</span></div>
              {terms.map(([en, zh, field]) => <div className="term-row" role="row" key={en}><code>{en}</code><strong>{zh}</strong><span>{field}</span></div>)}
            </div>
          </section>

          <section className="readme-panel">
            <div className="readme-title"><FileText size={17} /> README.md</div>
            <div className="readme-body">
              <h2><Sparkles size={20} /> 关于物译 AI</h2>
              <p>个人维护的 AI 辅助物理翻译项目。译本以原文为内容依据，保留公式、符号、图表和参考文献结构，并通过物理语境审核与 LaTeX 编译检查。</p>
              <p>本站只展示公开资料入口；项目源码、研究工具与更新记录通过 <a href={githubUrl} target="_blank" rel="noreferrer">GitHub @xixi-cc</a> 持续维护。</p>
            </div>
          </section>
        </div>
      </div>

      <footer><span>物译 AI · PhysAI</span><a href={githubUrl} target="_blank" rel="noreferrer"><GitBranch size={15} /> xixi-cc</a><span>© 2026</span></footer>
    </main>
  );
}
