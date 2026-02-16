
import React from 'react';
import { 
  ChevronDown, FileText, Cpu, ShieldCheck, 
  Globe, MapPin, Database, Link as LinkIcon, 
  Server, ShieldAlert, Activity, Search,
  Clock, Hash, Map, User, Shield, Lock, SearchCode, Zap, Palette, Info, XCircle, AlertTriangle, ExternalLink,
  BookOpen
} from 'lucide-react';
import { AnalysisData } from '../types';

interface ReportSectionProps {
  data: AnalysisData | null;
  sources?: any[];
  onBack: () => void;
}

const ENGINE_ICONS: Record<string, string> = {
  "BitDefender": "🛡️",
  "Fortinet": "🔒",
  "Seclookup": "🔍",
  "APVA": "⚡",
  "Artists Against 419": "🎨",
  "Avira": "🔴",
  "AZORult Tracker": "📊",
  "Badbitcoin": "🪙",
  "Bambenek Consulting": "🔬",
  "CERT Polska": "🇵🇱",
  "DrWeb": "🟢",
  "Fake Website Buster": "💥",
  "Gridlnsoft": "🟣",
  "OpenPhish": "🎣",
  "RedScama": "🔴",
  "PhishFort": "⚔️",
  "Phishing Database": "💾",
  "PhishingBait": "🎯",
  "PhishStats": "📈",
  "PhishTank": "🐟",
  "Phishunt": "🔎",
  "Scam Directory": "📖",
  "SCUMWARE": "🗑️",
  "SecureReliant Phishing List": "📋",
  "Spam404": "🚫",
  "StopForumSpam": "💬",
  "SURBL": "🌐",
  "Threat Sourcing": "⚠️",
  "ThreatLog": "🟣",
  "TweetFeed": "🐦",
  "urlDNA": "🧬",
  "URLhaus": "🏠"
};

const getStatusColor = (result: string) => {
  const lower = result.toLowerCase();
  if (lower.includes('clean') || lower.includes('found') || lower.includes('safe') || lower.includes('nothing')) return 'text-emerald-400';
  if (lower.includes('malware') || lower.includes('phish') || lower.includes('malicious') || lower.includes('threat')) return 'text-red-500';
  return 'text-amber-400';
};

const getStatusIcon = (result: string) => {
  const lower = result.toLowerCase();
  if (lower.includes('clean') || lower.includes('found') || lower.includes('safe') || lower.includes('nothing')) return <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />;
  if (lower.includes('malware') || lower.includes('phish') || lower.includes('malicious') || lower.includes('threat')) return <XCircle className="w-3.5 h-3.5 text-red-500" />;
  return <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />;
};

export const ReportSection: React.FC<ReportSectionProps> = ({ data, sources = [], onBack }) => {
  return (
    <section className="w-full h-screen bg-[#020617] border-t border-white/10 flex flex-col relative overflow-hidden text-slate-300">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{ backgroundImage: 'linear-gradient(#06f9f1 1px, transparent 1px), linear-gradient(90deg, #06f9f1 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      <div className="px-12 py-8 flex items-center justify-between relative z-10 border-b border-white/5 bg-black/60 backdrop-blur-xl">
        <button 
          onClick={onBack}
          className="flex items-center gap-4 text-white/40 hover:text-primary transition-all group"
        >
          <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary/40 group-hover:bg-primary/5 transition-all">
            <ChevronDown className="w-6 h-6" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">EXIT_ANALYSIS</span>
            <span className="text-[8px] font-mono text-white/20">Return to Visualizer_</span>
          </div>
        </button>

        <div className="flex items-center gap-8">
          <div className="text-right">
             <div className="flex items-center justify-end gap-3 mb-1">
               <span className="text-[9px] font-black text-primary/60 uppercase tracking-widest">DETAILED_REPORT</span>
               <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
             </div>
             <h2 className="text-white font-black uppercase tracking-tighter text-3xl italic leading-none">SECURITY_AUDIT</h2>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center border border-primary/20">
            <FileText className="w-8 h-8 text-primary" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10">
        {!data ? (
          <div className="h-full flex flex-col items-center justify-center text-white/10">
            <Search className="w-24 h-24 mb-6 animate-pulse" />
            <p className="text-2xl font-black uppercase tracking-[0.5em]">Waiting for Target...</p>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto p-12 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-primary/5 border border-primary/20 rounded-[2rem] p-8 flex flex-col gap-1">
                <span className="text-[10px] text-primary/60 uppercase font-black tracking-widest block mb-2">Report Summary</span>
                <span className={`text-2xl font-black uppercase tracking-tighter flex items-center gap-2 ${data.security.status === 'Safe' ? 'text-emerald-400' : data.security.status === 'Warning' ? 'text-amber-400' : 'text-red-500'}`}>
                  {data.security.status === 'Safe' && <ShieldCheck className="w-6 h-6" />}
                  {data.security.status === 'Malicious' && <ShieldAlert className="w-6 h-6" />}
                  {data.security.status === 'Safe' ? '✓ Clean' : data.security.status}
                </span>
              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-[2rem] p-8">
                <span className="text-[10px] text-white/30 uppercase font-black tracking-widest block mb-2">Website Address</span>
                <span className="text-lg font-bold text-white truncate block">{data.url}</span>
              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-[2rem] p-8">
                <span className="text-[10px] text-white/30 uppercase font-black tracking-widest block mb-2">Last Analysis</span>
                <span className="text-sm font-bold text-white tracking-tight">{data.lastAnalysis}</span>
              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-[2rem] p-8">
                <span className="text-[10px] text-white/30 uppercase font-black tracking-widest block mb-2">Detection Counts</span>
                <span className={`text-xl font-bold ${data.security.vendorsFlagged > 0 ? 'text-red-400' : 'text-white'}`}>
                  {data.security.vendorsFlagged}/{data.security.totalVendors}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 space-y-8">
                <div className="flex items-center justify-between border-b border-primary/10 pb-6">
                  <div className="flex items-center gap-4 text-primary/60">
                    <Database className="w-6 h-6" />
                    <h3 className="text-sm font-black uppercase tracking-[0.4em]">Domain Information</h3>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">LIVE_WHOIS_VERIFIED</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-1">
                    <span className="text-[9px] text-white/40 uppercase font-black">Domain Registration Date</span>
                    <p className="text-white font-mono text-base font-bold">{data.registrationDate}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Clock className="w-3 h-3 text-primary/60" />
                      <span className="text-xs text-primary font-bold">Verified Age: {data.domainAge}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[9px] text-white/40 uppercase font-black">Intelligence Links</span>
                    <div className="flex flex-wrap gap-3">
                      <a href={`https://whois.domaintools.com/${data.url}`} target="_blank" className="px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-black text-primary hover:bg-primary/20 transition-all flex items-center gap-2">
                        <ExternalLink className="w-3 h-3" /> WHOIS Lookup
                      </a>
                      <a href={`https://www.virustotal.com/gui/domain/${data.url}`} target="_blank" className="px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-black text-primary hover:bg-primary/20 transition-all flex items-center gap-2">
                        <Shield className="w-3 h-3" /> Threat Intel
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 space-y-8">
                <div className="flex items-center gap-4 text-primary/60 border-b border-primary/10 pb-6">
                  <Server className="w-6 h-6" />
                  <h3 className="text-sm font-black uppercase tracking-[0.4em]">Network Details</h3>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <span className="text-[9px] text-white/40 uppercase font-black">IP Address</span>
                    <p className="text-white font-mono text-xs font-bold">{data.ip}</p>
                  </div>
                  <div>
                    <span className="text-[9px] text-white/40 uppercase font-black">Reverse DNS</span>
                    <p className="text-white font-mono text-[10px] truncate">{data.reverseDns}</p>
                  </div>
                  <div>
                    <span className="text-[9px] text-white/40 uppercase font-black">ASN</span>
                    <p className="text-white font-mono text-xs">{data.asn}</p>
                  </div>
                  <div>
                    <span className="text-[9px] text-white/40 uppercase font-black">Server Location</span>
                    <p className="text-white font-mono text-xs">🇺🇸 {data.location.country}</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 border border-white/5 rounded-2xl bg-black/20">
                   <div className="flex-1">
                      <span className="text-[8px] text-white/20 uppercase font-black block">Coordinates</span>
                      <span className="text-[10px] text-white/60 font-mono">{data.location.latitude} / {data.location.longitude}</span>
                   </div>
                   <div className="flex-1">
                      <span className="text-[8px] text-white/20 uppercase font-black block">Locality</span>
                      <span className="text-[10px] text-white/60 font-mono">{data.location.city || 'Unknown'} / {data.location.region || 'Unknown'}</span>
                   </div>
                </div>
              </div>
            </div>

            {/* GROUNDING SOURCES SECTION */}
            {sources.length > 0 && (
              <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 space-y-6">
                <div className="flex items-center gap-4 text-primary/60 border-b border-primary/10 pb-4">
                  <BookOpen className="w-5 h-5" />
                  <h3 className="text-sm font-black uppercase tracking-[0.4em]">Verified Web References</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sources.map((source, idx) => (
                    source.web && (
                      <a 
                        key={idx} 
                        href={source.web.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group p-4 bg-black/40 border border-white/5 rounded-2xl hover:border-primary/40 transition-all flex flex-col gap-2"
                      >
                        <span className="text-[10px] font-black text-white/80 line-clamp-1 group-hover:text-primary transition-colors">
                          {source.web.title || "External Source"}
                        </span>
                        <div className="flex items-center justify-between">
                          <span className="text-[8px] font-mono text-white/20 truncate max-w-[80%]">{source.web.uri}</span>
                          <ExternalLink className="w-3 h-3 text-white/20 group-hover:text-primary transition-colors" />
                        </div>
                      </a>
                    )
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-sm font-black uppercase tracking-[0.4em] text-primary/60">Scanning Engines</h3>
                <span className="text-[10px] font-mono text-white/20">32 TOTAL AUDITS</span>
              </div>

              <div className="bg-black/40 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-white/5 text-[10px] font-black uppercase tracking-widest text-white/40">
                      <th className="px-10 py-6">Engine</th>
                      <th className="px-10 py-6">Result</th>
                      <th className="px-10 py-6">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {data.security.engines.map((engine, i) => (
                      <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-10 py-5">
                          <span className="mr-3">{ENGINE_ICONS[engine.name] || '🛡️'}</span>
                          <span className="text-xs font-bold text-white/80">{engine.name}</span>
                        </td>
                        <td className="px-10 py-5">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(engine.result)}
                            <span className={`text-[11px] font-black tracking-widest ${getStatusColor(engine.result)}`}>
                              {engine.result}
                            </span>
                          </div>
                        </td>
                        <td className="px-10 py-5">
                          <div className="text-[10px] font-mono text-white/30 truncate max-w-[200px]">
                             {engine.details}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="px-12 py-4 bg-black border-t border-white/5 flex justify-between items-center opacity-40">
        <span className="text-[8px] font-mono uppercase tracking-widest">ENCRYPTION: AES_256</span>
        <span className="text-[10px] font-black uppercase tracking-[1em]">CYBERSCAN_REPORT_SYSTEM</span>
      </div>
    </section>
  );
};
