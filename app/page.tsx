'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, BookOpen, Check, CircleHelp, Download, FileArchive, FileText, GitBranch, Languages, Menu, Moon, Search, Sun, X } from 'lucide-react';

type Section = 'originals' | 'translations' | 'guide';
const books = [
  { zh:'场的统计物理', en:'Statistical Physics of Fields', field:'统计场论', cover:'/covers/statistical-physics-of-fields.jpg', original:'/pdfs/statistical-physics-of-fields-original.pdf', translation:'/pdfs/statistical-physics-of-fields-zh.pdf', os:'2.1 MB', ts:'2.6 MB' },
  { zh:'集群运动的物理学', en:'The Physics of Flocking', field:'非平衡物理', cover:'/covers/the-physics-of-flocking.jpg', original:'/pdfs/the-physics-of-flocking-original.pdf', translation:'/pdfs/the-physics-of-flocking-zh.pdf', os:'5.5 MB', ts:'2.4 MB' },
  { zh:'相变与临界现象基础', en:'Elements of Phase Transitions and Critical Phenomena', field:'相变与临界现象', cover:'/covers/elements-phase-transitions.jpg', original:'/pdfs/elements-phase-transitions-original.pdf', translation:'/pdfs/elements-phase-transitions-zh.pdf', os:'3.4 MB', ts:'3.6 MB' },
  { zh:'非平衡统计物理', en:'Nonequilibrium Statistical Physics', field:'统计物理', cover:'/covers/nonequilibrium-statistical-physics.jpg', original:'/pdfs/nonequilibrium-statistical-physics-original.pdf', translation:'/pdfs/nonequilibrium-statistical-physics-zh.pdf', os:'18.2 MB', ts:'8.6 MB' },
  { zh:'精确可解的统计力学模型', en:'Exactly Solved Models in Statistical Mechanics', field:'统计力学', cover:'/covers/exactly-solved-models.jpg', original:'https://physics.anu.edu.au/research/ftp/_files/Exactly.pdf', translation:'/pdfs/exactly-solved-models-zh.pdf', os:'ANU 官方 PDF', ts:'2.7 MB' },
  { zh:'非平衡相变：吸收态相变', en:'Non-Equilibrium Phase Transitions, Volume I', field:'非平衡相变', cover:'/covers/non-equilibrium-phase-transitions-v1.jpg', original:'/pdfs/non-equilibrium-phase-transitions-v1-original.pdf', translation:'/pdfs/non-equilibrium-phase-transitions-v1-zh.pdf', os:'6.1 MB', ts:'4.8 MB' },
];
const navItems: { id:Section; label:string; en:string; icon:typeof BookOpen }[] = [
  { id:'originals', label:'原著', en:'Originals', icon:BookOpen }, { id:'translations', label:'译本', en:'Translations', icon:Languages },
  { id:'guide', label:'指南', en:'Guide', icon:CircleHelp },
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
        <label className="search-box"><Search size={16}/><input type="search" placeholder="搜索书名或领域" value={query} onChange={e=>setQuery(e.target.value)}/></label>
        <nav className="side-nav" aria-label="网站导航">{navItems.map(({id,label,en,icon:Icon})=><button className={section===id?'active':''} onClick={()=>change(id)} key={id}><Icon size={17}/><span><strong>{label}</strong><small>{en}</small></span>{(id==='translations'||id==='originals')&&<em>{books.length}</em>}</button>)}</nav>
        <section className="side-section"><h2>涉及领域</h2><div className="field-tags"><button onClick={()=>setQuery('统计物理')}>统计物理</button><button onClick={()=>setQuery('非平衡')}>非平衡物理</button><button onClick={()=>setQuery('相变')}>相变</button><button onClick={()=>setQuery('场论')}>场论</button></div></section>
        <div className="sidebar-actions"><button onClick={toggleTheme}>{dark?<Sun size={15}/>:<Moon size={15}/>} {dark?'浅色模式':'深色模式'}</button><a href="https://github.com/xixi-cc" target="_blank" rel="noreferrer"><GitBranch size={15}/>GitHub<ArrowUpRight size={12}/></a></div>
      </aside>
      <main className="main-content">
        <div className="content-header"><div><span>{active.en}</span><h1>{active.label}</h1></div>{(section==='translations'||section==='originals')&&<p>共 {filtered.length} 项</p>}</div>
        {section==='translations'&&<div className="translation-list">{filtered.length?filtered.map((item)=><article className="translation-card" key={item.en}>
          <img className="book-cover" src={item.cover} alt={`${item.en} 原著封面`}/><div className="translation-copy"><span className="field">{item.field}</span><h2>{item.zh}</h2><p>{item.en}</p><div className="meta"><span><Check size={13}/>完整译本</span><span><FileArchive size={13}/>PDF · LaTeX</span><time>2026-08</time></div><div className="file-actions"><a href={item.original} target="_blank"><FileText size={14}/>原著 PDF <small>{item.os}</small></a><a className="primary" href={item.translation} target="_blank"><Download size={14}/>中文译本 <small>{item.ts}</small></a></div></div>
        </article>):<div className="empty">没有找到匹配的译本。</div>}</div>}
        {section==='originals'&&<div className="simple-list">{filtered.map(item=><article key={item.en}><img className="original-cover" src={item.cover} alt=""/><div><h2>{item.en}</h2><p>{item.field} · English PDF · {item.os}</p></div><a href={item.original} target="_blank"><FileText size={14}/>打开 PDF</a></article>)}</div>}
        {section==='guide'&&<div className="guide-page">
          <section className="guide-intro"><span>TRANSLATION WORKFLOW</span><h2>我们如何翻译一本物理原著</h2><p>AI 用来提高提取、初译和一致性检查的效率；原著 PDF 始终是内容依据，最终译文仍需逐章核对物理含义、公式、图表和中文表达。</p></section>
          <div className="guide-principles"><article><strong>原著优先</strong><p>遇到歧义时回到 PDF 页码、上下文和作者采用的符号体系。</p></article><article><strong>可维护工程</strong><p>译文、图片、术语、问题记录和编译脚本都保留在 LaTeX 工程中。</p></article><article><strong>分层审核</strong><p>语言通顺不等于物理正确，忠实性、专业性和版面必须分别检查。</p></article></div>
          <div className="guide-content">
            <section><span>01</span><div><h2>选定原著与版本</h2><p>确认书名、作者、出版社、年份、版本、ISBN、总页数与获取来源。保存未经改动的原著 PDF，并记录文件哈希；同时确认版权状态与本站能够提供的阅读方式。</p></div></section>
            <section><span>02</span><div><h2>拆解 PDF，建立 LaTeX 骨架</h2><p>提取目录、章节结构、正文、公式、脚注、参考文献和原始图片。先建立能够稳定编译的中文 LaTeX 工程，再按原著层级设置章、节、编号和交叉引用。</p></div></section>
            <section><span>03</span><div><h2>固定术语、符号与排版约定</h2><p>翻译前建立术语表和符号表，记录同一概念在不同语境中的译法。公式本身不改写，变量、单位、上下标、粗斜体、定理环境和引用格式均与原著对应。</p></div></section>
            <section><span>04</span><div><h2>按小节进行 AI 辅助初译</h2><p>以可核对的小段落为单位提交原文与上下文，要求保留公式、标签、引用和逻辑连接。AI 负责产生初稿、发现术语冲突和辅助重排，但不独立决定新的物理结论。</p></div></section>
            <section><span>05</span><div><h2>三轮人工审核</h2><p><b>第一轮：忠实性</b>——逐段对照原文，检查漏译、误译与语气；<b>第二轮：物理性</b>——检查推导、定义、符号、量纲和因果关系；<b>第三轮：中文与一致性</b>——统一术语、标点、交叉引用和跨章节表述。</p></div></section>
            <section><span>06</span><div><h2>编译与逐页视觉核对</h2><p>使用 XeLaTeX 完整编译，处理字体、公式溢出、浮动图表、目录、索引和参考文献。把中文 PDF 与原著逐页对照，确认章节覆盖完整，图片清晰且页码引用可追溯。</p></div></section>
            <section><span>07</span><div><h2>交付、记录与持续修订</h2><p>发布中文 PDF 和可编辑 LaTeX 工程，并保留术语表、问题清单、审核记录、编译说明及文件哈希。读者反馈会进入问题记录，修订时更新版本日期而不覆盖历史依据。</p></div></section>
          </div>
          <section className="delivery-check"><div><span>最终交付</span><h2>一份译本不仅是一份 PDF</h2></div><ul><li>中文译本 PDF</li><li>可重新编译的 LaTeX</li><li>原著版本与来源记录</li><li>术语和符号约定</li><li>审核与遗留问题</li><li>版本日期与文件哈希</li></ul></section>
        </div>}
      </main>
    </div>
    <footer><span>物译 · PhysAI Translation</span><p>AI 辅助物理翻译资料库</p></footer>
  </div>;
}
