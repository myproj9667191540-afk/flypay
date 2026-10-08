import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronDown, ChevronUp, Search, ShieldCheck } from 'lucide-react';
import { policy } from './PrivacyPolicy.jsx';
import { useLanguage } from './LanguageContext.jsx';

export default function PrivacyPolicyView() {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(1);
  const [collapsed, setCollapsed] = useState(() => new Set());
  const [progress, setProgress] = useState(0);
  const visiblePolicy = useMemo(() => {
    const term = query.trim().toLowerCase();
    const indexed = policy.map((section, index) => ({ section, index }));
    return term ? indexed.filter(({ section }) => `${section.title} ${section.content.join(' ')}`.toLowerCase().includes(term)) : indexed;
  }, [query]);

  useEffect(() => {
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, Math.max(0, window.scrollY / max * 100)) : 0);
    };
    const observer = new IntersectionObserver(entries => {
      const current = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (current) setActive(Number(current.target.dataset.policyIndex));
    }, { rootMargin: '-18% 0px -65% 0px', threshold: [0, .2, .5, .8] });
    document.querySelectorAll('.policy-section').forEach(section => observer.observe(section));
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
    return () => { observer.disconnect(); window.removeEventListener('scroll', updateProgress); };
  }, [visiblePolicy]);

  const toggle = index => setCollapsed(previous => { const next = new Set(previous); next.has(index) ? next.delete(index) : next.add(index); return next; });
  const allCollapsed = visiblePolicy.length > 0 && visiblePolicy.every(({ index }) => collapsed.has(index));
  const toggleAll = () => setCollapsed(allCollapsed ? new Set() : new Set(visiblePolicy.map(({ index }) => index)));

  return <main className="policy-page" id="privacy-policy">
    <div className="policy-progress" aria-label={`Reading progress ${Math.round(progress)} percent`}><span style={{ width: `${progress}%` }}/></div>
    <section className="policy-hero"><div className="policy-hero-inner"><motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}><span className="policy-kicker"><ShieldCheck size={14}/> YOUR INFORMATION, YOUR RIGHTS</span><h1>{t("Privacy Policy")}</h1><p>FlyPay Technology Private Limited</p></motion.div><motion.div className="policy-hero-mark" aria-hidden="true" animate={{ rotate: 360 }} transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}>✳</motion.div></div></section>
    <div className="policy-layout">
      <aside className="policy-index"><span>{t("ON THIS PAGE")}</span><label className="policy-search"><Search size={15}/><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Find in policy" aria-label="Find in privacy policy"/>{query&&<button onClick={()=>setQuery('')} aria-label="Clear search">×</button>}</label>
        {visiblePolicy.map(({ section, index }) => <a className={active===index+1?'policy-index-active':''} key={section.title} href={`#policy-${index + 1}`} onClick={()=>setActive(index+1)}>{t(section.title.replace(/^\d+\. /, ''))}<span>{String(index+1).padStart(2,'0')}</span></a>)}
        {visiblePolicy.length===0&&<p className="policy-no-results">No sections match “{query}”.</p>}<a className="policy-back" href="#home">Back to FlyPay <ArrowUpRight size={13}/></a>
      </aside>
      <article className="policy-content"><div className="policy-tools"><span>{visiblePolicy.length} sections{query?` matching “${query}”`:''}</span><button onClick={toggleAll}>{allCollapsed?'Expand all':'Collapse all'} {allCollapsed?<ChevronDown size={14}/>:<ChevronUp size={14}/>}</button></div>
        {visiblePolicy.map(({ section, index }) => <motion.section id={`policy-${index + 1}`} data-policy-index={index+1} className={`policy-section ${active===index+1?'policy-section-active':''}`} key={section.title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .08 }} transition={{ duration: .35 }}><span className="policy-section-number">{String(index + 1).padStart(2, '0')}</span><button className="policy-section-toggle" onClick={()=>toggle(index)} aria-expanded={!collapsed.has(index)}><h2>{t(section.title.replace(/^\d+\. /, ''))}</h2>{collapsed.has(index)?<ChevronDown size={17}/>:<ChevronUp size={17}/>}</button>{!collapsed.has(index)&&<motion.div className="policy-paragraphs" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: .25 }}>{section.content.map((paragraph, j) => <p key={j}>{paragraph}</p>)}</motion.div>}</motion.section>)}
        {visiblePolicy.length>0&&<div className="policy-endnote">Questions about your data? <a href="mailto:care.flypay@gmail.com">care.flypay@gmail.com</a></div>}
      </article>
    </div><a className="policy-top" href="#privacy-policy" aria-label="Back to top"><ChevronUp size={18}/></a>
  </main>;
}
