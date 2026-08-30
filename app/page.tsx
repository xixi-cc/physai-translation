'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, BookOpen, Check, CircleHelp, Download, FileArchive, FileText, GitBranch, Languages, Library, Menu, Moon, Search, Sun, X } from 'lucide-react';

type Section = 'originals' | 'translations' | 'terms' | 'guide';
const books = [
  { zh:'场的统计物理', en:'Statistical Physics of Fields', field:'统计场论', original:'/pdfs/statistical-physics-of-fields-original.pdf', translation:'/pdfs/statistical-physics-of-fields-zh.pdf', os:'2.1 MB', ts:'2.6 MB' },
  { zh:'集群运动的物理学', en:'The Physics of Flocking', field:'非平衡物理', original:'/pdfs/the-physics-of-flocking-original.pdf', translation:'/pdfs/the-physics-of-flocking-zh.pdf', os:'5.5 MB', ts:'2.4 MB' },
  { zh:'相变与临界现象基础', en:'Elements of Phase Transitions and Critical Phenomena', field:'相变与临界现象', original:'/pdfs/elements-phase-transitions-original.pdf', translation:'/pdfs/elements-phase-transitions-zh.pdf', os:'3.4 MB', ts:'3.6 MB' },
  { zh:'非平衡统计物理', en:'Nonequilibrium Statistical Physics', field:'统计物理', original:'/pdfs/nonequilibrium-statistical-physics-original.pdf', translation:'/pdfs/nonequilibrium-statistical-physics-zh.pdf', os:'18.2 MB', ts:'8.6 MB' },
  { zh:'精确可解的统计力学模型', en:'Exactly Solved Models in Statistical Mechanics', field:'统计力学', original:'/pdfs/exactly-solved-models-original.pdf', translation:'/pdfs/exactly-solved-models-zh.pdf', os:'17.2 MB', ts:'2.7 MB' },
  { zh:'非平衡相变：吸收态相变', en:'Non-Equilibrium Phase Transitions, Volume I', field:'非平衡相变', original:'/pdfs/non-equilibrium-phase-transitions-v1-original.pdf', translation:'/pdfs/non-equilibrium-phase-transitions-v1-zh.pdf', os:'6.1 MB', ts:'4.8 MB' },
];
const terms = [['absorbing state','吸收态','非平衡相变'],['active matter','主动物质','软凝聚态'],['coarsening','粗化','相变动力学'],['flocking','集群运动','主动软物质'],['order parameter','序参量','统计物理'],['renormalization group','重整化群','场论'],['scaling function','标度函数','临界现象'],['universality class','普适类','相变']];
const navItems: { id:Section; label:string; en:string; icon:typeof BookOpen }[] = [
  { id:'originals', label:'原著', en:'Originals', icon:BookOpen }, { id:'translations', label:'译本', en:'Translations', icon:Languages },
  { id:'terms', label:'术语', en:'Terms', icon:Library }, { id:'guide', label:'指南', en:'Guide', icon:CircleHelp },
];

export default function Home() {
  const [section,setSection] = useState<Section>('translations');
  const [query,setQuery] = useState('');
  const [menuOpen,setMenuOpen] = useState(false);
  const [dark,setDark] = useState(false);
  useEffect(() => { const saved=localStorage.getItem('wuyi-theme'); const value=saved?saved==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches; setDark(value); document.documentElement.dataset.theme=value?'dark':'light'; },[]);
  const filtered=useMemo(()=>{const q=query.trim().toLowerCase(); return q?books.filter(b=>[b.zh,b.en,b.field].join(' ').toLowerCase().includes(q)):books;},[query]);
  const active=navItems.find(item=>item.id===section)!;
  function change(next:Section){setSection(next);setQuery('');setMenuOpen(false);}
  function toggleTheme(){const next=!dark;setDark(next);document.documentElement.dataset.theme=next?'dark':'light';localStorage.setItem('wuyi-theme',next?'dark':'light');}
  return <div className="site-frame">
    <header className="mobile-header">
      <a className="brand" href="#" onClick={e=>{e.preventDefault();change('translations')}}><img src="/wuyi-logo.svg" alt="物译 Logo"/><span><strong>物译</strong><small>PhysAI Translation</small></span></a>
      <button className="icon-button" onClick={toggleTheme} aria-label="切换明暗主题">{dark?<Sun/>:<Moon/>}</button><button className="icon-button" onClick={()=>setMenuOpen(!menuOpen)} aria-label="打开导航">{menuOpen?<X/>:<Menu/>}</button>
    </header>
    <div className={`mobile-nav ${menuOpen?'open':''}`}>{navItems.map(item=><button className={section===item.id?'active':''} onClick={()=>change(item.id)} key={item.id}>{item.label}<span>{item.en}</span></button>)}</div>
    <div className="content-layout">
      <aside className="sidebar">
        <a className="brand desktop-brand" href="#" onClick={e=>{e.preventDefault();change('translations')}}><img src="/wuyi-logo.svg" alt="物译 Logo"/><span><strong>物译</strong><small>PhysAI Translation</small></span></a>
        <label className="search-box"><Search size={16}/><input type="search" placeholder="搜索书名、领域或术语" value={query} onChange={e=>setQuery(e.target.value)}/></label>
        <nav className="side-nav" aria-label="网站导航">{navItems.map(({id,label,en,icon:Icon})=><button className={section===id?'active':''} onClick={()=>change(id)} key={id}><Icon size={17}/><span><strong>{label}</strong><small>{en}</small></span>{(id==='translations'||id==='originals')&&<em>{books.length}</em>}</button>)}</nav>
        <section className="side-section"><h2>涉及领域</h2><div className="field-tags"><button onClick={()=>setQuery('统计物理')}>统计物理</button><button onClick={()=>setQuery('非平衡')}>非平衡物理</button><button onClick={()=>setQuery('相变')}>相变</button><button onClick={()=>setQuery('场论')}>场论</button></div></section>
        <div className="sidebar-actions"><button onClick={toggleTheme}>{dark?<Sun size={15}/>:<Moon size={15}/>} {dark?'浅色模式':'深色模式'}</button><a href="https://github.com/xixi-cc" target="_blank" rel="noreferrer"><GitBranch size={15}/>GitHub<ArrowUpRight size={12}/></a></div>
      </aside>
      <main className="main-content">
        <div className="content-header"><div><span>{active.en}</span><h1>{active.label}</h1></div>{(section==='translations'||section==='originals')&&<p>共 {filtered.length} 项</p>}</div>
        {section==='translations'&&<div className="translation-list">{filtered.length?filtered.map((item,index)=><article className="translation-card" key={item.en}>
          <div className="cover-chip"><span>WY</span><strong>{String(index+1).padStart(2,'0')}</strong></div><div className="translation-copy"><span className="field">{item.field}</span><h2>{item.zh}</h2><p>{item.en}</p><div className="meta"><span><Check size={13}/>完整译本</span><span><FileArchive size={13}/>PDF · LaTeX</span><time>2026-08</time></div><div className="file-actions"><a href={item.original} target="_blank"><FileText size={14}/>原著 PDF <small>{item.os}</small></a><a className="primary" href={item.translation} target="_blank"><Download size={14}/>中文译本 <small>{item.ts}</small></a></div></div>
        </article>):<div className="empty">没有找到匹配的译本。</div>}</div>}
        {section==='originals'&&<div className="simple-list">{filtered.map(item=><article key={item.en}><BookOpen size={19}/><div><h2>{item.en}</h2><p>{item.field} · English PDF · {item.os}</p></div><a href={item.original} target="_blank"><FileText size={14}/>打开 PDF</a></article>)}</div>}
        {section==='terms'&&<div className="terms-card"><div className="terms-head"><span>英文</span><span>推荐译法</span><span>领域</span></div>{terms.filter(row=>!query||row.join(' ').toLowerCase().includes(query.toLowerCase())).map(([en,zh,field])=><div className="term-row" key={en}><code>{en}</code><strong>{zh}</strong><span>{field}</span></div>)}</div>}
        {section==='guide'&&<div className="guide-content"><section><span>01</span><div><h2>确认原文</h2><p>记录原著版本、来源、页数和版权状态，PDF 是内容核验依据。</p></div></section><section><span>02</span><div><h2>建立约定</h2><p>开始翻译前固定术语、符号、公式与 LaTeX 排版规范。</p></div></section><section><span>03</span><div><h2>翻译与审核</h2><p>AI 生成初稿，随后检查物理语境、逻辑关系和跨章节一致性。</p></div></section><section><span>04</span><div><h2>编译与交付</h2><p>交付中文 PDF、可编辑 LaTeX 工程、术语表和问题记录。</p></div></section></div>}
      </main>
    </div>
    <footer><span>物译 · PhysAI Translation</span><p>AI 辅助物理翻译资料库</p></footer>
  </div>;
}
