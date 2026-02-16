
import React from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  History, 
  Zap, 
  Fingerprint, 
  ShieldAlert, 
  Bookmark, 
  ChevronRight,
  Shield,
  Clock,
  ExternalLink,
  Target,
  Quote,
  Terminal,
  Activity,
  Layers,
  Cpu,
  Lock,
  Search
} from 'lucide-react';

const COMMON_THREATS = [
  {
    id: "01",
    title: "Typosquatting",
    desc: "The exploitation of human typing errors. By registering domains like 'gogle.com' or 'facebok.com', attackers capture organic traffic from 'fat-finger' mistakes, often leading to credential harvesting or drive-by malware.",
    category: "REPUTATION",
    severity: "HIGH",
    color: "text-primary"
  },
  {
    id: "02",
    title: "Punycode Spoofing",
    desc: "A visual exploit using international characters that appear identical to Latin counterparts. Attackers register xn--80ak6aa92e.com which many browsers render as 'apple.com', bypassing visual scrutiny.",
    category: "VISUAL DECEIT",
    severity: "CRITICAL",
    color: "text-red-500"
  },
  {
    id: "03",
    title: "Subdomain Takeover",
    desc: "When a DNS record (CNAME) points to a third-party service that has been deleted but the DNS record remains. Attackers claim the resource on the host platform, inheriting the organization's trust.",
    category: "INFRASTRUCTURE",
    severity: "MEDIUM",
    color: "text-amber-400"
  }
];

const HISTORICAL_LOGS = [
  {
    year: "2008",
    title: "The Cameroon (.cm) Empire",
    body: "The nation-level TLD for Cameroon became a massive typosquatting hub. Because '.cm' is one character away from '.com', a wildcard registry captured millions of mistyped requests globally.",
    tag: "SYSTEMIC_ERROR",
    stat: "2.3M+ Requests/Mo"
  },
  {
    year: "2016",
    title: "DNC Phishing Campaign",
    body: "A pivotal political breach facilitated by a Bitly-shortened URL. Attackers used a visually plausible 'Security Alert' page to harvest high-level credentials via spear-phishing.",
    tag: "POLITICAL_INTEL",
    stat: "High Value Target"
  }
];

export const StudySection: React.FC = () => {
  return (
    <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12 lg:py-24 pb-64 animate-in fade-in duration-1000 overflow-x-hidden selection:bg-primary selection:text-background-dark">
      
      {/* MAGAZINE MASTHEAD */}
      <header className="mb-32 lg:mb-48 border-b border-white/10 pb-16 lg:pb-32 relative">
        <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none select-none">
          <span className="text-[20rem] font-black italic tracking-tighter">ARCHIVE</span>
        </div>
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 relative z-10">
           <div className="max-w-4xl">
              <div className="flex items-center gap-6 mb-12">
                <span className="text-primary font-black text-[10px] lg:text-xs tracking-[1em] uppercase border-l-4 border-primary pl-6">Neural_Archive // Volume_04</span>
                <div className="h-[1px] w-24 bg-white/10" />
              </div>
              <h1 className="text-[clamp(4.5rem,15vw,12rem)] font-black text-white italic tracking-tighter uppercase leading-[0.7] mb-8 select-none">
                THE_FORENSIC<br/>
                <span className="text-primary">MANUSCRIPT_</span>
              </h1>
              <p className="max-w-2xl text-xl lg:text-3xl text-slate-100 font-light leading-snug italic border-l-4 border-primary/20 pl-10 py-4">
                Investigating the intersection of visual habits and structural network fallibility.
              </p>
           </div>
           
           <div className="flex flex-col items-start lg:items-end space-y-4">
              <span className="text-white/20 font-mono text-[10px] uppercase tracking-[0.5em]">Issue_Data_Core</span>
              <span className="text-white font-black text-xl uppercase tracking-widest italic">{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
              <div className="h-[1px] w-48 bg-white/10" />
           </div>
        </div>
      </header>

      {/* CORE CONTENT: TWO COLUMN MAGAZINE ARTICLES */}
      <div className="space-y-48 lg:space-y-72">
        
        {/* FEATURE ARTICLE 01: THE VISUAL TRUST GAP */}
        <article className="flex flex-col lg:grid lg:grid-cols-12 gap-16 lg:gap-24">
          {/* COLUMN 1: TITLES AND IMAGES */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-[1px] bg-primary" />
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.6em]">Case_Study_001</span>
              </div>
              <h2 className="text-6xl lg:text-8xl font-black text-white uppercase italic tracking-tighter leading-[0.8] drop-shadow-2xl">
                THE_GAP_IN_<br/>
                <span className="text-primary">VISUAL_TRUST_</span>
              </h2>
            </div>
            
            <div className="aspect-[3/4] lg:aspect-square bg-[#0d1326] rounded-[4rem] border border-white/10 flex items-center justify-center relative overflow-hidden group shadow-3xl">
               <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-transparent opacity-80" />
               <Fingerprint className="w-32 h-32 lg:w-48 lg:h-48 text-primary/5 group-hover:scale-110 transition-transform duration-[8000ms] ease-out" />
               <div className="absolute bottom-10 left-10 p-4 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 flex items-center gap-4">
                  <Activity className="w-4 h-4 text-primary animate-pulse" />
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Spectral_Analysis: Active</span>
               </div>
            </div>

            <div className="p-8 border-l-2 border-primary/20 bg-primary/5 rounded-r-3xl">
               <span className="text-[10px] font-black text-primary uppercase tracking-widest block mb-4">Analyst_Verdict</span>
               <p className="text-sm text-slate-400 italic font-light leading-relaxed">
                 "Our conditioned reliance on visual brand consistency is the single largest attack surface in the modern workspace."
               </p>
            </div>
          </div>

          {/* COLUMN 2: MAIN TEXT */}
          <div className="lg:col-span-7 pt-0 lg:pt-32 space-y-12">
            <div className="flex items-center gap-6 opacity-40 mb-8">
               <span className="text-[10px] font-mono uppercase tracking-[0.4em]">Forensic_Report // Page_12</span>
               <div className="h-[1px] flex-1 bg-white/10" />
            </div>

            <div className="space-y-12 text-lg lg:text-2xl text-slate-300 font-light leading-relaxed italic relative">
              <Quote className="absolute -top-16 -left-12 w-24 h-24 text-white/[0.03] rotate-12" />
              <p className="first-letter:text-[10rem] first-letter:font-black first-letter:text-primary first-letter:mr-8 first-letter:float-left first-letter:leading-[0.65] selection:bg-primary selection:text-background-dark">
                The most sophisticated cyber threats today don't target your firewall; they target your eyes. We have been conditioned over decades to trust specific visual cues—the padlock icon, a familiar brand logo, or a clean, professional user interface. This is the visual trust gap.
              </p>
              
              <div className="h-[1px] w-24 bg-primary/30 my-16" />

              <p>
                When a browser renders a Punycode domain as 'apple.com', it isn't a technical error. It is a psychological bypass. The machine is telling you a truth that your eyes interpret as a different reality. This exploitation of visual habituation allows attackers to bypass even the most rigorous organizational training.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-16 border-t border-white/5">
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-white uppercase tracking-[0.4em] flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" /> Key_Exploit
                  </h4>
                  <p className="text-sm text-slate-500 font-light leading-relaxed">
                    Character mirroring and homograph substitution allow for near-perfect visual clones of trusted portals.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-white uppercase tracking-[0.4em] flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" /> Countermeasure
                  </h4>
                  <p className="text-sm text-slate-500 font-light leading-relaxed">
                    Neural pattern analysis of registration metadata and character entropy detection are the only effective shields.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* FEATURE ARTICLE 02: HISTORICAL MISHAPS */}
        <article className="flex flex-col lg:grid lg:grid-cols-12 gap-16 lg:gap-24">
          {/* COLUMN 1: TITLES AND IMAGES */}
          <div className="lg:col-span-5 space-y-12 lg:order-2">
            <div className="space-y-6">
              <div className="flex items-center gap-4 lg:justify-end">
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.6em]">Chronicle_Log_002</span>
                <div className="w-10 h-[1px] bg-primary" />
              </div>
              <h2 className="text-6xl lg:text-8xl font-black text-white uppercase italic tracking-tighter leading-[0.8] drop-shadow-2xl lg:text-right">
                THE_ARCHIVE_OF<br/>
                <span className="text-primary">MISHAPS_</span>
              </h2>
            </div>
            
            <div className="aspect-[16/9] bg-[#0d1326] rounded-[4rem] border border-white/10 flex items-center justify-center relative overflow-hidden group shadow-3xl">
               <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent opacity-80" />
               <History className="w-32 h-32 text-primary/5 group-hover:rotate-[-10deg] transition-transform duration-[3000ms]" />
               <div className="absolute top-10 right-10 p-6 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                  <Clock className="w-6 h-6 text-primary" />
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               {HISTORICAL_LOGS.map((log, i) => (
                 <div key={i} className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                    <span className="text-2xl font-black text-primary/40 italic block mb-2">{log.year}</span>
                    <span className="text-[9px] font-black text-white uppercase tracking-widest block opacity-40">{log.tag}</span>
                 </div>
               ))}
            </div>
          </div>

          {/* COLUMN 2: MAIN TEXT */}
          <div className="lg:col-span-7 pt-0 lg:pt-32 space-y-12 lg:order-1">
             <div className="flex items-center gap-6 opacity-40 mb-8">
               <div className="h-[1px] flex-1 bg-white/10" />
               <span className="text-[10px] font-mono uppercase tracking-[0.4em]">Archival_Data // Page_48</span>
            </div>

            <div className="space-y-16">
              {HISTORICAL_LOGS.map((log, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <h5 className="text-3xl font-black text-white uppercase italic tracking-tighter group-hover:text-primary transition-colors">{log.title}</h5>
                  </div>
                  <p className="text-lg lg:text-xl text-slate-400 font-light leading-relaxed italic border-l-2 border-white/5 pl-8 group-hover:border-primary/40 transition-all">
                    {log.body}
                  </p>
                  <div className="mt-8 flex items-center gap-6 opacity-0 group-hover:opacity-100 transition-all">
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em]">Forensic_Stats: {log.stat}</span>
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>

        {/* SECTION: COMMON THREATS CATALOG */}
        <section className="space-y-16 lg:space-y-24">
           <div className="flex items-center gap-8 border-b border-white/10 pb-8">
             <Target className="w-8 h-8 text-primary" />
             <h3 className="text-xs font-black text-white uppercase tracking-[1em]">Active_Threat_Index</h3>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
             {COMMON_THREATS.map((threat) => (
               <div key={threat.id} className="p-12 rounded-[3.5rem] bg-[#0d1326] border border-white/5 hover:border-primary/40 transition-all duration-700 flex flex-col justify-between group">
                  <div>
                    <div className="flex justify-between items-start mb-12">
                      <span className="text-5xl font-black text-primary/10 group-hover:text-primary transition-colors italic tracking-tighter">0{threat.id}</span>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${threat.color}`}>{threat.severity}</span>
                    </div>
                    <h5 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-6 leading-tight">{threat.title}</h5>
                    <p className="text-base text-slate-500 leading-relaxed font-light italic mb-8">{threat.desc}</p>
                  </div>
                  <div className="flex items-center justify-between pt-8 border-t border-white/5">
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">{threat.category}</span>
                    <ChevronRight className="w-5 h-5 text-primary/20 group-hover:text-primary group-hover:translate-x-2 transition-all" />
                  </div>
               </div>
             ))}
           </div>
        </section>

        {/* HARDENING MANIFESTO: FULL WIDTH MAGAZINE SPREAD */}
        <section className="bg-primary rounded-[5rem] p-12 lg:p-32 relative overflow-hidden group shadow-3xl">
           <div className="absolute top-0 right-0 p-32 opacity-10 group-hover:opacity-20 transition-all duration-1000 rotate-12 scale-150 pointer-events-none">
              <ShieldCheck className="w-[30rem] h-[30rem] text-background-dark" />
           </div>
           
           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-12">
                 <div className="inline-flex items-center gap-6 px-8 py-3 rounded-full bg-background-dark/95 text-primary border border-primary/40">
                    <Bookmark className="w-5 h-5" />
                    <span className="text-[11px] font-black uppercase tracking-[0.5em]">Global_Hardening</span>
                 </div>
                 <h4 className="text-6xl lg:text-9xl font-black text-background-dark italic tracking-tighter leading-[0.8] uppercase select-none">
                    THE_FINAL_DEFENSE_LAYER.
                 </h4>
              </div>
              <div className="grid grid-cols-1 gap-8">
                 <div className="p-12 bg-background-dark/95 rounded-[3.5rem] border border-white/10 space-y-6">
                    <Lock className="w-8 h-8 text-primary" />
                    <h6 className="text-2xl font-black text-white uppercase italic tracking-tighter">COGNITIVE_AUDIT_</h6>
                    <p className="text-white/60 text-lg leading-relaxed italic font-light">
                      Beyond firewalls and neural filters lies the human element. The ultimate protection is the cultivation of a critical cognitive audit for every digital interaction.
                    </p>
                    <button className="flex items-center gap-4 text-xs font-black text-primary uppercase tracking-[0.4em] pt-6 group/btn">
                       Download_Whitepaper <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                    </button>
                 </div>
              </div>
           </div>
        </section>
      </div>

      {/* MAGAZINE FOOTER */}
      <footer className="mt-64 pt-24 border-t border-white/10 flex flex-col lg:flex-row justify-between items-center gap-12 opacity-40 italic">
        <div className="flex items-center gap-8">
           <span className="text-[11px] font-mono tracking-[0.8em] uppercase font-black text-primary">CyberScan_Core</span>
           <div className="h-[1px] w-12 bg-white/10" />
           <span className="text-[11px] font-mono tracking-[0.4em] uppercase">Page_Index: 48-125</span>
        </div>
        
        <div className="flex gap-16">
           {['Archive', 'Forensics', 'Protocols'].map(link => (
             <button key={link} className="text-[11px] font-black uppercase tracking-[0.5em] text-white/40 hover:text-primary transition-all">{link}_IDX</button>
           ))}
        </div>

        <div className="text-right flex flex-col items-end">
          <span className="text-[10px] font-mono tracking-[0.4em] uppercase mb-2">Neural_Security_Manuscript</span>
          <span className="text-[8px] font-mono text-white/30 uppercase">©2025 CyberScan Group // All_Rights_Reserved</span>
        </div>
      </footer>

    </div>
  );
};
