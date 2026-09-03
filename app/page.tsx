'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, BookOpen, Check, CircleHelp, Download, FileArchive, FileText, GitBranch, Languages, Menu, Moon, Search, Sun, X } from 'lucide-react';

type Section = 'originals' | 'translations' | 'guide';
const asset = (path:string) => `${import.meta.env.BASE_URL}${path.replace(/^\//,'')}`;
const books = [
  { zh:'场的统计物理', en:'Statistical Physics of Fields', field:'统计场论', cover:asset('/covers/statistical-physics-of-fields.jpg'), original:asset('/pdfs/statistical-physics-of-fields-original.pdf'), sourceLabel:'原著 PDF', translation:asset('/pdfs/statistical-physics-of-fields-zh.pdf'), os:'2.1 MB', ts:'2.7 MB' },
  { zh:'集群运动的物理学', en:'The Physics of Flocking', field:'非平衡物理', cover:asset('/covers/the-physics-of-flocking.jpg'), original:asset('/pdfs/the-physics-of-flocking-original.pdf'), sourceLabel:'原著 PDF', translation:asset('/pdfs/the-physics-of-flocking-zh.pdf'), os:'2.5 MB', ts:'2.4 MB' },
  { zh:'相变与临界现象基础', en:'Elements of Phase Transitions and Critical Phenomena', field:'相变与临界现象', cover:asset('/covers/elements-phase-transitions.jpg'), original:asset('/pdfs/elements-phase-transitions-original.pdf'), sourceLabel:'原著 PDF', translation:asset('/pdfs/elements-phase-transitions-zh.pdf'), os:'3.4 MB', ts:'3.6 MB' },
  { zh:'非平衡统计物理', en:'Nonequilibrium Statistical Physics', field:'统计物理', cover:asset('/covers/nonequilibrium-statistical-physics.jpg'), original:asset('/pdfs/nonequilibrium-statistical-physics-original.pdf'), sourceLabel:'原著 PDF', translation:asset('/pdfs/nonequilibrium-statistical-physics-zh.pdf'), os:'7.0 MB', ts:'8.6 MB' },
  { zh:'精确可解的统计力学模型', en:'Exactly Solved Models in Statistical Mechanics', field:'统计力学', cover:asset('/covers/exactly-solved-models.jpg'), original:'https://physics.anu.edu.au/research/ftp/_files/Exactly.pdf', sourceLabel:'原著 PDF', translation:asset('/pdfs/exactly-solved-models-zh.pdf'), os:'ANU 官方 PDF', ts:'2.7 MB' },
  { zh:'非平衡相变：吸收态相变', en:'Non-Equilibrium Phase Transitions, Volume I', field:'非平衡相变', cover:asset('/covers/non-equilibrium-phase-transitions-v1.jpg'), original:asset('/pdfs/non-equilibrium-phase-transitions-v1-original.pdf'), sourceLabel:'原著 PDF', translation:asset('/pdfs/non-equilibrium-phase-transitions-v1-zh.pdf'), os:'5.3 MB', ts:'4.8 MB' },
  { zh:'神经网络的统计力学', en:'Statistical Mechanics of Neural Networks', field:'神经网络与统计物理', cover:asset('/covers/statistical-mechanics-of-neural-networks.jpg'), original:'https://link.springer.com/book/10.1007/978-981-16-7570-6', sourceLabel:'出版社页面', translation:asset('/pdfs/statistical-mechanics-of-neural-networks-zh.pdf'), os:'Springer', ts:'4.1 MB' },
  { zh:'统计物理的动力学视角', en:'A Kinetic View of Statistical Physics', field:'非平衡统计物理', cover:asset('/covers/a-kinetic-view-of-statistical-physics.jpg'), original:'https://www.cambridge.org/core/books/a-kinetic-view-of-statistical-physics/773F488A893B060A5A5FA287158AB229', sourceLabel:'出版社页面', translation:asset('/pdfs/a-kinetic-view-of-statistical-physics-zh.pdf'), os:'Cambridge', ts:'4.0 MB' },
  { zh:'神经网络的统计场论', en:'Statistical Field Theory for Neural Networks', field:'神经网络与场论', cover:asset('/covers/statistical-field-theory-for-neural-networks.jpg'), original:'https://link.springer.com/book/10.1007/978-3-030-46444-8', sourceLabel:'出版社页面', translation:asset('/pdfs/statistical-field-theory-for-neural-networks-zh.pdf'), os:'Springer', ts:'3.4 MB' },
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
      <a className="brand" href="#" onClick={e=>{e.preventDefault();change('translations')}}><img src={asset('/wuyi-logo.svg')} alt="物译 Logo"/><span><strong>物译</strong><small>PhysAI Translation</small></span></a>
      <button className="icon-button" onClick={toggleTheme} aria-label="切换明暗主题">{dark?<Sun/>:<Moon/>}</button><button className="icon-button" onClick={()=>setMenuOpen(!menuOpen)} aria-label="打开导航">{menuOpen?<X/>:<Menu/>}</button>
    </header>
    <div className={`mobile-nav ${menuOpen?'open':''}`}>{navItems.map(item=><button className={section===item.id?'active':''} onClick={()=>change(item.id)} key={item.id}>{item.label}<span>{item.en}</span></button>)}</div>
    <div className="content-layout">
      <aside className="sidebar">
        <a className="brand desktop-brand" href="#" onClick={e=>{e.preventDefault();change('translations')}}><img src={asset('/wuyi-logo.svg')} alt="物译 Logo"/><span><strong>物译</strong><small>PhysAI Translation</small></span></a>
        <label className="search-box"><Search size={16}/><input type="search" placeholder="搜索书名或领域" value={query} onChange={e=>setQuery(e.target.value)}/></label>
        <nav className="side-nav" aria-label="网站导航">{navItems.map(({id,label,en,icon:Icon})=><button className={section===id?'active':''} onClick={()=>change(id)} key={id}><Icon size={17}/><span><strong>{label}</strong><small>{en}</small></span>{(id==='translations'||id==='originals')&&<em>{books.length}</em>}</button>)}</nav>
        <section className="side-section"><h2>涉及领域</h2><div className="field-tags"><button onClick={()=>setQuery('统计物理')}>统计物理</button><button onClick={()=>setQuery('非平衡')}>非平衡物理</button><button onClick={()=>setQuery('相变')}>相变</button><button onClick={()=>setQuery('场论')}>场论</button></div></section>
        <div className="sidebar-actions"><button onClick={toggleTheme}>{dark?<Sun size={15}/>:<Moon size={15}/>} {dark?'浅色模式':'深色模式'}</button><a href="https://github.com/xixi-cc/physai-translation" target="_blank" rel="noreferrer"><GitBranch size={15}/>网站源码<ArrowUpRight size={12}/></a><a href="https://github.com/xixi-cc/mathtranslations-skill" target="_blank" rel="noreferrer"><GitBranch size={15}/>翻译工作流<ArrowUpRight size={12}/></a></div>
      </aside>
      <main className="main-content">
        <div className="content-header"><div><span>{active.en}</span><h1>{active.label}</h1></div>{(section==='translations'||section==='originals')&&<p>共 {filtered.length} 项</p>}</div>
        {section==='translations'&&<div className="translation-list">{filtered.length?filtered.map((item,index)=><article className="translation-card" key={item.en}>
          <img className="book-cover" src={item.cover} alt={`${item.zh}封面`} loading={index===0?'eager':'lazy'} fetchPriority={index===0?'high':'auto'}/><div className="translation-copy"><span className="field">{item.field}</span><h2>{item.zh}</h2><p>{item.en}</p><div className="meta"><span><Check size={13}/>完整译本</span><span><FileArchive size={13}/>PDF · LaTeX</span><time>2026-08</time></div><div className="file-actions"><a href={item.original} target="_blank" rel="noreferrer"><FileText size={14}/>{item.sourceLabel} <small>{item.os}</small></a><a className="primary" href={item.translation} target="_blank"><Download size={14}/>中文译本 <small>{item.ts}</small></a></div></div>
        </article>):<div className="empty">没有找到匹配的译本。</div>}</div>}
        {section==='originals'&&<div className="simple-list">{filtered.map(item=><article key={item.en}><img className="original-cover" src={item.cover} alt="" loading="lazy"/><div><h2>{item.en}</h2><p>{item.field} · {item.sourceLabel} · {item.os}</p></div><a href={item.original} target="_blank" rel="noreferrer"><FileText size={14}/>{item.sourceLabel==='原著 PDF'?'打开 PDF':'查看原著'}</a></article>)}</div>}
        {section==='guide'&&<div className="guide-page">
          <section className="guide-intro"><span>AI-ASSISTED TRANSLATION WORKFLOW</span><h2>怎样用 AI 辅助翻译一本物理原著</h2><p>每本书使用一个独立任务和一个独立目录。原著 PDF 是唯一内容依据；AI 工具协助提取、初译、LaTeX 编排与检查，人负责确定版本、处理物理歧义并批准最终交付。无论使用哪一种 AI 工具，都可以遵循下面的流程。</p></section>
          <div className="guide-principles"><article><strong>人负责决策</strong><p>选择原著与版本，确认版权边界，回答歧义问题并批准最终译文。</p></article><article><strong>AI 协助执行</strong><p>读取 PDF、维护术语和进度、分章翻译、整理 LaTeX，并协助检查问题。</p></article><article><strong>工具负责验证</strong><p>PDF 提取保证页码可追溯，XeLaTeX 生成成品，Git 和哈希保留版本证据。</p></article></div>
          <section className="workflow-start"><span>如何开始</span><h2>向 AI 工具提交原著 PDF 和交付要求</h2><p>建议直接说明完整交付标准，而不只说“请翻译这本书”。可以参考下面这段请求，并根据所用工具的能力调整：</p><blockquote>请协助我在独立目录中完整翻译这本物理原著。以我提供的 PDF 为唯一内容依据，保留公式、图表、编号和引用；建立中文 LaTeX 工程、术语表、问题记录与进度文件；逐章翻译并编译，完成三轮审核后交付可重新编译的工程、中文 PDF、清单和文件哈希。</blockquote></section>
          <div className="guide-content">
            <section><span>01</span><div><h2>先做只读预检</h2><p>读取 PDF 元数据、页数、目录、文本层、图片与字体，计算原文件哈希并建立来源清单。此时不翻译，先确认版本、缺页、扫描质量、版权边界和交付范围。</p><small><b>产物：</b>来源清单、页码映射、风险与问题列表。</small></div></section>
            <section><span>02</span><div><h2>建立可编译工程</h2><p>按原著目录建立章节文件、图片目录、主 LaTeX 文件、术语表、问题记录、进度表和编译说明。先生成一个能够通过 XeLaTeX 的空骨架，再开始写译文。</p><small><b>产物：</b>可编译基线，而不是零散的聊天文本。</small></div></section>
            <section><span>03</span><div><h2>固定翻译约定</h2><p>从前言和首章提取核心术语、符号、单位、人物名与书目格式，形成全书共享的约定。公式不改写，编号、标签、引用、粗斜体和定理环境与原著对应。</p><small><b>需要人工确认：</b>有多种合理译法的核心术语和专名。</small></div></section>
            <section><span>04</span><div><h2>按章、按小节翻译</h2><p>每次向 AI 提供当前小节及必要的前后文，将译文写入对应的 LaTeX 文件，并保留原著页码依据。图、表、脚注、引用和公式随正文一起处理；不要一次生成整本书后再猜测缺失内容。</p><small><b>执行原则：</b>小批次、可编译、可回查、可继续。</small></div></section>
            <section><span>05</span><div><h2>每完成一章立即编译</h2><p>运行 XeLaTeX，修复语法错误、缺图、断链引用、公式溢出和浮动体问题，同时更新进度表与遗留问题。编译成功只证明工程机械一致，并不等于翻译已经正确。</p><small><b>产物：</b>章节检查点 PDF 和可恢复的进度记录。</small></div></section>
            <section><span>06</span><div><h2>执行三轮审核</h2><p><b>忠实性审核</b>逐段对照 PDF，检查漏译、增译与语气；<b>物理审核</b>检查定义、推导、符号、量纲和因果关系；<b>中文与版面审核</b>统一术语、标点、引用并检查逐页视觉结果。</p><small><b>必须人工处理：</b>影响科学含义但原文仍有歧义的判断。</small></div></section>
            <section><span>07</span><div><h2>做全书覆盖审计</h2><p>比较原著目录、页码范围与中文工程，检查每章、附录、索引、参考文献、图表和公式是否有对应内容；再从干净环境完整编译，避免只在开发目录中偶然成功。</p><small><b>完成条件：</b>覆盖完整、干净编译、PDF 逐页可读。</small></div></section>
            <section><span>08</span><div><h2>打包并保留验证证据</h2><p>输出最终中文 PDF、可编辑 LaTeX、术语与问题记录、编译说明、文件清单和 SHA-256 哈希；随后解压交付包并重新编译一次，确认接收者能够复现成品。</p><small><b>最终批准：</b>由人工查看 PDF 和审核记录后决定是否发布。</small></div></section>
          </div>
          <section className="delivery-check"><div><span>最终交付</span><h2>一份译本不仅是一份 PDF</h2></div><ul><li>中文译本 PDF</li><li>可重新编译的 LaTeX</li><li>原著版本与来源记录</li><li>术语和符号约定</li><li>审核与遗留问题</li><li>版本日期与文件哈希</li></ul></section>
        </div>}
      </main>
    </div>
    <footer><span>物译 · PhysAI Translation</span><p>AI 辅助物理翻译资料库</p><div className="footer-links"><a href="https://github.com/xixi-cc/physai-translation" target="_blank" rel="noreferrer">网站源码</a><a href="https://github.com/xixi-cc/mathtranslations-skill" target="_blank" rel="noreferrer">翻译工作流</a></div></footer>
  </div>;
}
