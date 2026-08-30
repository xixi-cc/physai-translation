import { ArrowRight, BookOpenText, Braces, Check, FileText, Languages, Mail, Quote, ScanSearch } from 'lucide-react';

const works = [
  { eyebrow: '统计物理 · 专著', title: 'Statistical Physics of Fields', zh: '场的统计物理', note: '术语统一、公式复核、中文 LaTeX 重排', tone: 'navy' },
  { eyebrow: '非平衡物理 · 专著', title: 'The Physics of Flocking', zh: '集群运动的物理学', note: '图表保留、参考文献整理、全书一致性检查', tone: 'copper' },
  { eyebrow: '相变与临界现象 · 专著', title: 'Elements of Phase Transitions', zh: '相变与临界现象基础', note: '物理语境校正、符号核验、可编译交付', tone: 'sage' },
];

const services = [
  { icon: Languages, title: 'AI 辅助翻译', copy: '以物理语境为核心生成初稿，不做逐字直译。' },
  { icon: ScanSearch, title: '人工物理审核', copy: '复核公式、符号、术语与论证关系，标出疑点。' },
  { icon: Braces, title: 'LaTeX 重排', copy: '保留公式、图表与引用结构，交付可继续编辑的工程。' },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="格物译研首页">
          <img src="/gewu-logo.png" alt="" className="brand-mark" />
          <span><strong>格物译研</strong><small>PHYSICS IN CHINESE</small></span>
        </a>
        <nav aria-label="主导航">
          <a href="#works">译作</a><a href="#services">服务</a><a href="#process">流程</a>
          <a className="nav-cta" href="#contact">联系我 <ArrowRight size={15} /></a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span /> AI × PHYSICS × TRANSLATION</div>
          <h1>让物理文章，<em>准确地说中文。</em></h1>
          <p className="hero-lead">面向物理学论文、专著与讲义的中文翻译。AI 提升效率，物理审核守住准确，LaTeX 保留专业表达。</p>
          <div className="hero-actions">
            <a className="primary-button" href="#works">查看翻译案例 <ArrowRight size={17} /></a>
            <a className="text-button" href="#process">了解工作流程</a>
          </div>
          <div className="trust-row" aria-label="服务特点">
            <span><Check size={14} /> 公式与符号复核</span><span><Check size={14} /> 术语全篇统一</span><span><Check size={14} /> 可编辑 LaTeX 交付</span>
          </div>
        </div>

        <div className="hero-visual" aria-label="从英文物理原文到中文译稿的示意图">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="paper paper-source">
            <div className="paper-tag">SOURCE</div><p className="formula">∂<sub>t</sub>ρ + ∇·(ρv) = 0</p>
            <div className="lines"><i /><i /><i /><i /></div><span>Non-equilibrium dynamics</span>
          </div>
          <div className="translation-path"><Languages size={20} /></div>
          <div className="paper paper-target">
            <div className="paper-tag">中文译稿</div><p className="formula">∂<sub>t</sub>ρ + ∇·(ρv) = 0</p><p>非平衡体系的连续性方程</p>
            <div className="review-stamp"><Check size={13} /> 已复核</div>
          </div>
          <div className="phi-badge">φ</div>
        </div>
      </section>

      <section className="statement"><Quote size={26} /><p>好的科学翻译，不只是换一种语言，<br />而是让推理、符号与语气一起抵达。</p></section>

      <section className="section" id="works">
        <div className="section-heading"><div><span className="section-index">01 / SELECTED WORKS</span><h2>近期译作</h2></div><p>以实际完成的物理专著为基础展示，后续可加入 PDF 预览与下载。</p></div>
        <div className="works-grid">
          {works.map((work, index) => (
            <article className={`work-card ${work.tone}`} key={work.title}>
              <div className="work-number">0{index + 1}</div><div className="book-glyph"><BookOpenText size={34} /></div>
              <span>{work.eyebrow}</span><h3>{work.zh}</h3><p className="work-original">{work.title}</p><p className="work-note">{work.note}</p>
              <div className="work-link"><Check size={15} /> 完整项目已完成</div>
            </article>
          ))}
        </div>
      </section>

      <section className="section service-section" id="services">
        <div className="section-heading compact"><div><span className="section-index">02 / WHAT I DO</span><h2>只做三件事，把它们做好</h2></div></div>
        <div className="services-grid">
          {services.map(({ icon: Icon, title, copy }, index) => (
            <article className="service-card" key={title}><span className="service-index">0{index + 1}</span><Icon size={27} /><h3>{title}</h3><p>{copy}</p></article>
          ))}
        </div>
      </section>

      <section className="process-section" id="process">
        <div className="process-intro"><span className="section-index">03 / PROCESS</span><h2>从原文到成稿，<br />每一步都可追溯。</h2><p>不把“AI 已翻译”当作完成。每个项目都经过结构提取、术语约定、物理复核与最终编译。</p></div>
        <ol className="process-list">
          <li><span>01</span><div><strong>接收原稿</strong><p>PDF、TeX 或 Word，确认范围与交付形式。</p></div><FileText /></li>
          <li><span>02</span><div><strong>翻译与排版</strong><p>分段处理，保留公式、图表与文献结构。</p></div><Languages /></li>
          <li><span>03</span><div><strong>物理审核</strong><p>检查术语、符号、逻辑与跨章节一致性。</p></div><ScanSearch /></li>
          <li><span>04</span><div><strong>完整交付</strong><p>提供中文 PDF、LaTeX 源码与问题记录。</p></div><Check /></li>
        </ol>
      </section>

      <section className="contact-section" id="contact">
        <div><span className="section-index">START A PROJECT</span><h2>有一篇物理文章<br />想让更多中文读者看见？</h2></div>
        <div className="contact-card"><Mail size={25} /><h3>发送原文与需求</h3><p>告诉我文章页数、领域、期望格式与时间。我会先确认是否适合翻译，再给出方案。</p><div className="contact-placeholder">联系邮箱 / 微信：上线前补充</div></div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top"><img src="/gewu-logo.png" alt="" className="brand-mark" /><span><strong>格物译研</strong><small>PHYSICS IN CHINESE</small></span></a>
        <p>AI 辅助 · 物理审核 · LaTeX 交付</p><p>© 2026 格物译研</p>
      </footer>
    </main>
  );
}
