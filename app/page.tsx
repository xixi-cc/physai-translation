'use client';

import { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  BookOpen,
  Check,
  CircleHelp,
  FileArchive,
  FileText,
  GitBranch,
  Languages,
  Library,
  Menu,
  Search,
  X,
} from 'lucide-react';

type Section = 'originals' | 'translations' | 'terms' | 'guide';

const translations = [
  { zh: '场的统计物理', en: 'Statistical Physics of Fields', field: '统计场论', pages: '完整译本', format: 'PDF · LaTeX', updated: '2026-08' },
  { zh: '集群运动的物理学', en: 'The Physics of Flocking', field: '非平衡物理', pages: '完整译本', format: 'PDF · LaTeX', updated: '2026-08' },
  { zh: '相变与临界现象基础', en: 'Elements of Phase Transitions and Critical Phenomena', field: '相变与临界现象', pages: '完整译本', format: 'PDF · LaTeX', updated: '2026-08' },
  { zh: '非平衡统计物理', en: 'Nonequilibrium Statistical Physics', field: '统计物理', pages: '完整译本', format: 'PDF · LaTeX', updated: '2026-08' },
  { zh: '精确可解的统计力学模型', en: 'Exactly Solved Models in Statistical Mechanics', field: '统计力学', pages: '完整译本', format: 'PDF · LaTeX', updated: '2026-08' },
  { zh: '非平衡相变：吸收态相变', en: 'Non-Equilibrium Phase Transitions, Volume I', field: '非平衡相变', pages: '完整译本', format: 'PDF · LaTeX', updated: '2026-08' },
];

const originals = translations.map(({ en, field, updated }) => ({ title: en, field, source: 'English PDF', checked: updated }));

const terms = [
  ['absorbing state', '吸收态', '非平衡相变'], ['active matter', '主动物质', '软凝聚态'], ['coarsening', '粗化', '相变动力学'],
  ['flocking', '集群运动', '主动软物质'], ['order parameter', '序参量', '统计物理'], ['renormalization group', '重整化群', '场论'],
  ['scaling function', '标度函数', '临界现象'], ['universality class', '普适类', '相变'],
];

const navItems: { id: Section; label: string; en: string; icon: typeof BookOpen }[] = [
  { id: 'originals', label: '原著', en: 'Originals', icon: BookOpen },
  { id: 'translations', label: '译本', en: 'Translations', icon: Languages },
  { id: 'terms', label: '术语', en: 'Terms', icon: Library },
  { id: 'guide', label: '指南', en: 'Guide', icon: CircleHelp },
];

export default function Home() {
  const [section, setSection] = useState<Section>('translations');
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredTranslations = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return translations;
    return translations.filter((item) => [item.zh, item.en, item.field].join(' ').toLowerCase().includes(q));
  }, [query]);

  const activeNav = navItems.find((item) => item.id === section)!;

  function changeSection(next: Section) {
    setSection(next);
    setQuery('');
    setMenuOpen(false);
  }

  return (
    <div className="site-frame">
      <header className="site-header">
        <a className="brand" href="#" onClick={(event) => { event.preventDefault(); changeSection('translations'); }}>
          <img src="/wuyi-logo.png" alt="物译 Logo" />
          <span><strong>物译</strong><small>PhysAI Translation</small></span>
        </a>
        <nav aria-label="网站导航">
          {navItems.map((item) => <button className={section === item.id ? 'active' : ''} onClick={() => changeSection(item.id)} key={item.id}>{item.label}</button>)}
        </nav>
        <a className="github-entry" href="https://github.com/xixi-cc" target="_blank" rel="noreferrer"><GitBranch size={16} /> GitHub <ArrowUpRight size={13} /></a>
        <button className="mobile-menu" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="打开导航">{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <div className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
        {navItems.map((item) => <button className={section === item.id ? 'active' : ''} onClick={() => changeSection(item.id)} key={item.id}>{item.label}<span>{item.en}</span></button>)}
      </div>

      <div className="content-layout">
        <aside className="sidebar">
          <div className="side-title"><span>LIBRARY</span><h1>物理译作资料库</h1></div>
          <label className="search-box">
            <Search size={16} /><input type="search" placeholder="搜索书名、领域或术语" value={query} onChange={(event) => setQuery(event.target.value)} />
          </label>
          <div className="side-nav">
            {navItems.map(({ id, label, en, icon: Icon }) => (
              <button className={section === id ? 'active' : ''} onClick={() => changeSection(id)} key={id}>
                <Icon size={17} /><span><strong>{label}</strong><small>{en}</small></span>
                {id === 'translations' && <em>{translations.length}</em>}
              </button>
            ))}
          </div>
          <section className="side-section">
            <h2>涉及领域</h2>
            <div className="field-tags"><button onClick={() => setQuery('统计物理')}>统计物理</button><button onClick={() => setQuery('非平衡')}>非平衡物理</button><button onClick={() => setQuery('相变')}>相变</button><button onClick={() => setQuery('场论')}>场论</button></div>
          </section>
          <section className="side-section about-side">
            <h2>关于本站</h2>
            <p>独立维护的 AI 辅助物理翻译资料库。GitHub 用于项目入口与更新记录。</p>
            <a href="https://github.com/xixi-cc" target="_blank" rel="noreferrer">访问 xixi-cc <ArrowUpRight size={12} /></a>
          </section>
        </aside>

        <main className="main-content">
          <div className="content-header">
            <div><span>{activeNav.en}</span><h2>{activeNav.label}</h2></div>
            {section === 'translations' && <p>共 {filteredTranslations.length} 个译本</p>}
          </div>

          {section === 'translations' && (
            <div className="translation-list">
              {filteredTranslations.length ? filteredTranslations.map((item, index) => (
                <article className="translation-card" key={item.en}>
                  <div className="cover-chip"><span>PHYS</span><strong>{String(index + 1).padStart(2, '0')}</strong></div>
                  <div className="translation-copy"><span className="field">{item.field}</span><h3>{item.zh}</h3><p>{item.en}</p><div className="meta"><span><Check size={13} /> {item.pages}</span><span><FileArchive size={13} /> {item.format}</span><time>{item.updated}</time></div></div>
                </article>
              )) : <div className="empty">没有找到匹配的译本。</div>}
            </div>
          )}

          {section === 'originals' && (
            <div className="simple-list">
              {originals.filter((item) => !query || [item.title, item.field].join(' ').toLowerCase().includes(query.toLowerCase())).map((item) => (
                <article key={item.title}><BookOpen size={19} /><div><h3>{item.title}</h3><p>{item.field} · {item.source}</p></div><time>{item.checked}</time></article>
              ))}
            </div>
          )}

          {section === 'terms' && (
            <div className="terms-card">
              <div className="terms-head"><span>英文</span><span>推荐译法</span><span>领域</span></div>
              {terms.filter((row) => !query || row.join(' ').toLowerCase().includes(query.toLowerCase())).map(([en, zh, field]) => <div className="term-row" key={en}><code>{en}</code><strong>{zh}</strong><span>{field}</span></div>)}
            </div>
          )}

          {section === 'guide' && (
            <div className="guide-content">
              <section><span>01</span><div><h3>确认原文</h3><p>记录原著版本、来源、页数和版权状态，PDF 是内容核验依据。</p></div></section>
              <section><span>02</span><div><h3>建立约定</h3><p>开始翻译前固定术语、符号、公式与 LaTeX 排版规范。</p></div></section>
              <section><span>03</span><div><h3>翻译与审核</h3><p>AI 生成初稿，随后检查物理语境、逻辑关系和跨章节一致性。</p></div></section>
              <section><span>04</span><div><h3>编译与交付</h3><p>交付中文 PDF、可编辑 LaTeX 工程、术语表和问题记录。</p></div></section>
            </div>
          )}
        </main>
      </div>

      <footer><div><img src="/wuyi-logo.png" alt="" /><span><strong>物译</strong><small>PhysAI Translation</small></span></div><p>独立物理翻译资料库</p><a href="https://github.com/xixi-cc" target="_blank" rel="noreferrer"><GitBranch size={14} /> GitHub</a></footer>
    </div>
  );
}
