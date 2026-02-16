
// @ts-nocheck
import React, { Suspense, useState, useCallback, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import { Globe } from './components/Globe';
import { SearchBar } from './components/SearchBar';
import { SidePanel } from './components/SidePanel';
import { ReportSection } from './components/ReportSection';
import { StudySection } from './components/StudySection';
import { AppState, AnalysisData } from './types';
import { analyzeUrlWithGemini } from './services/geminiService';
import { 
  ShieldAlert, 
  Activity, 
  Globe as GlobeIcon, 
  MapPin, 
  Terminal,
  Scan,
  Database,
  ChevronUp,
  RotateCcw,
  Server,
  Zap,
  RefreshCw
} from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [groundingSources, setGroundingSources] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [lastInput, setLastInput] = useState<string>('');
  const [mode, setMode] = useState<'analysis' | 'study'>('analysis');
  const [showReport, setShowReport] = useState(false);
  const [panelsOpen, setPanelsOpen] = useState(false);

  useEffect(() => {
    if (appState === AppState.RESULT && !showReport) {
      setPanelsOpen(true);
    } else if (showReport || appState === AppState.IDLE) {
      setPanelsOpen(false);
    }
  }, [appState, showReport]);

  const handleAnalyze = useCallback(async (inputUrl: string) => {
    if (!inputUrl) return;
    
    setLastInput(inputUrl);
    setAppState(AppState.LOADING);
    setError(null);
    setAnalysisData(null);
    setGroundingSources([]);
    setShowReport(false);
    setPanelsOpen(false);
    
    try {
      const result = await analyzeUrlWithGemini(inputUrl);
      setAnalysisData(result.data);
      setGroundingSources(result.sources);
      setAppState(AppState.RESULT);
    } catch (err) {
      console.error(err);
      setError(err?.message || "Analysis failed. Security protocol anomaly detected.");
      setAppState(AppState.ERROR);
    }
  }, []);

  const handleReset = () => {
    setAppState(AppState.IDLE);
    setAnalysisData(null);
    setGroundingSources([]);
    setError(null);
    setShowReport(false);
    setPanelsOpen(false);
  };

  return (
    <div className={`w-full h-screen bg-[#020617] relative font-['Space_Grotesk'] ${mode === 'study' ? 'overflow-y-auto custom-scrollbar' : 'overflow-hidden'}`}>
      
      <div className={`fixed inset-0 z-0 transition-opacity duration-1000 ${ (showReport || mode === 'study') ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <Canvas
          dpr={[1, 1.5]}
          gl={{ 
            powerPreference: "high-performance",
            antialias: false,
            stencil: true,
            depth: true,
            alpha: true,
            precision: 'mediump',
          }}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Stars radius={100} depth={50} count={4000} factor={4} saturation={0} fade speed={0.5} />
          
          <Suspense fallback={null}>
            <Globe analyzing={appState === AppState.LOADING} data={analysisData} />
          </Suspense>

          <OrbitControls 
            enablePan={false} 
            enableZoom={!showReport} 
            enableRotate={!showReport && appState !== AppState.LOADING}
            maxDistance={15} minDistance={4}
            rotateSpeed={0.4}
            autoRotate={appState === AppState.IDLE && !showReport}
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>

      <div 
        className={`relative z-20 w-full h-full transition-transform duration-1000 cubic-bezier(0.16, 1, 0.3, 1) ${mode === 'study' ? 'pointer-events-auto' : 'pointer-events-none'}`}
        style={{ transform: (showReport && mode === 'analysis') ? 'translateY(-100vh)' : 'translateY(0)' }}
      >
        <div className="sticky top-0 left-0 w-full h-16 px-8 flex items-center bg-black/40 backdrop-blur-xl border-b border-white/5 pointer-events-auto z-50">
          <div className="flex items-center gap-4 group cursor-default">
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <div className="absolute inset-0 bg-primary/50 blur-sm rounded-full animate-ping" />
            </div>
            <h1 className="text-white font-black text-xl tracking-tighter italic select-none uppercase">
              CYBER<span className="text-primary">SCAN</span>
            </h1>
          </div>
          
          <div className="ml-auto flex items-center gap-6">
            {(mode === 'analysis' && (appState === AppState.RESULT || appState === AppState.ERROR)) && (
              <button 
                onClick={handleReset}
                className="px-4 py-2 border border-white/10 rounded-xl bg-white/5 text-[9px] font-black uppercase tracking-widest text-white/60 hover:text-primary hover:border-primary/40 transition-all flex items-center gap-2"
              >
                <RotateCcw className="w-3 h-3" />
                Reset_Uplink
              </button>
            )}

            <div className="bg-slate-900/60 border border-white/10 p-1 rounded-2xl flex items-center gap-1 shadow-3xl relative overflow-hidden group/slider backdrop-blur-2xl ring-1 ring-white/5">
              <div 
                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] transition-all duration-500 cubic-bezier(0.23, 1, 0.32, 1) ${mode === 'analysis' ? 'left-1' : 'left-[calc(50%+3px)]'}`}
              >
                <div className="absolute inset-0 bg-primary/10 border border-primary/30 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(6,249,241,0.1)]">
                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent translate-x-[-100%] animate-[shimmer_3s_infinite]" />
                </div>
              </div>

              <button 
                onClick={() => setMode('analysis')} 
                className={`relative z-10 px-6 py-2 rounded-xl flex items-center gap-3 transition-all duration-500 group/btn ${mode === 'analysis' ? 'text-primary' : 'text-white/20 hover:text-white/50'}`}
              >
                <Scan className={`w-4 h-4 transition-transform duration-500 ${mode === 'analysis' ? 'scale-110' : 'group-hover/btn:scale-110 opacity-40'}`} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] hidden sm:block font-mono">Analysis</span>
              </button>

              <button 
                onClick={() => setMode('study')} 
                className={`relative z-10 px-6 py-2 rounded-xl flex items-center gap-3 transition-all duration-500 group/btn ${mode === 'study' ? 'text-primary' : 'text-white/20 hover:text-white/50'}`}
              >
                <Database className={`w-4 h-4 transition-transform duration-500 ${mode === 'study' ? 'scale-110' : 'group-hover/btn:scale-110 opacity-40'}`} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] hidden sm:block font-mono">Archive</span>
              </button>
            </div>
          </div>
        </div>

        {mode === 'analysis' ? (
          <>
            <section className="w-full h-[calc(100vh-64px)] relative flex flex-col items-center pt-24 px-6 overflow-hidden">
              <div className={`w-full max-w-2xl pointer-events-auto mt-20 transition-all duration-700 ${ (appState === AppState.RESULT || appState === AppState.LOADING) ? 'opacity-0 scale-95 pointer-events-none -translate-y-12' : 'opacity-100 scale-100' }`}>
                <SearchBar onAnalyze={handleAnalyze} isLoading={appState === AppState.LOADING} />
              </div>

              <div className="mt-12 text-center max-w-lg pointer-events-none">
                {appState === AppState.LOADING && (
                  <div className="flex flex-col items-center gap-4 animate-pulse">
                    <div className="w-12 h-12 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                    <p className="text-primary text-[10px] font-black uppercase tracking-[0.4em] font-mono">Decrypting Target Architecture...</p>
                  </div>
                )}

                {appState === AppState.RESULT && analysisData && (
                  <div className="flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 pointer-events-auto">
                     <div className={`text-7xl font-black uppercase tracking-tighter italic ${
                       analysisData.security.status === 'Safe' ? 'text-emerald-400 drop-shadow-[0_0_30px_rgba(52,211,153,0.3)]' : 'text-red-500 drop-shadow-[0_0_30px_rgba(239,68,68,0.3)]'
                     }`}>
                       {analysisData.security.status === 'Safe' ? 'SAFE' : 'HARMFUL'}
                     </div>
                     
                     <div className="px-6 py-2 rounded-full border border-white/10 bg-black/60 backdrop-blur-md flex items-center gap-3 shadow-2xl">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-white">
                          {analysisData.location.city || 'Unknown_City'}, {analysisData.location.country}
                        </span>
                     </div>
                  </div>
                )}
                
                {appState === AppState.ERROR && (
                  <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in pointer-events-auto">
                    <div className="flex items-center gap-3 px-6 py-3 bg-red-500/10 border border-red-500/20 rounded-xl backdrop-blur-md">
                      <ShieldAlert className="w-4 h-4 text-red-500" />
                      <p className="text-red-500 text-[10px] font-black uppercase tracking-widest">{error}</p>
                    </div>
                    <button 
                      onClick={() => handleAnalyze(lastInput)}
                      className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-[0.4em] hover:text-white transition-colors"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Retry_Uplink
                    </button>
                  </div>
                )}
              </div>

              <SidePanel 
                side="left" 
                title="SCAN_SUMMARY" 
                icon={<Terminal className="w-4 h-4" />}
                isOpen={panelsOpen}
                onToggle={setPanelsOpen}
              >
                <div className="space-y-6">
                  {!analysisData ? (
                    <div className="flex flex-col items-center pt-20 text-center opacity-20">
                      <Terminal className="w-8 h-8 mb-4" />
                      <p className="text-[9px] font-mono uppercase tracking-widest">Awaiting Analysis...</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="p-4 border border-primary/20 bg-primary/5 rounded-xl">
                        <div className="flex items-center gap-2 mb-3 text-primary/60">
                          <Zap className="w-3 h-3" />
                          <span className="text-[9px] font-black uppercase tracking-widest">Neural_Verdict</span>
                        </div>
                        <p className="text-slate-300 text-xs leading-relaxed italic font-light">
                          "{analysisData.security.summary}"
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 border border-white/5 bg-white/5 rounded-xl">
                          <span className="text-[8px] text-white/30 uppercase font-black block mb-1">Vendors_Flagged</span>
                          <span className={`text-xl font-black ${analysisData.security.vendorsFlagged > 0 ? 'text-red-400' : 'text-white/60'}`}>
                            {analysisData.security.vendorsFlagged}/{analysisData.security.totalVendors}
                          </span>
                        </div>
                        <div className="p-3 border border-white/5 bg-white/5 rounded-xl">
                          <span className="text-[8px] text-white/30 uppercase font-black block mb-1">Risk_Index</span>
                          <span className="text-xl font-black text-primary/80">{analysisData.security.score}%</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </SidePanel>

              <SidePanel 
                side="right" 
                title="NETWORK_INTEL" 
                icon={<Server className="w-4 h-4" />}
                isOpen={panelsOpen}
                onToggle={setPanelsOpen}
              >
                <div className="space-y-4">
                  {!analysisData ? (
                    <div className="flex flex-col items-center pt-20 text-center opacity-20">
                      <Activity className="w-8 h-8 mb-4" />
                      <p className="text-[9px] font-mono uppercase tracking-widest">Scanning Network...</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-4 border border-primary/20 bg-primary/5 rounded-xl">
                        <span className="text-[9px] text-primary/60 uppercase font-black block mb-2">Primary_IP</span>
                        <span className="text-sm font-mono text-white block break-all font-bold">{analysisData.ip}</span>
                      </div>
                      <div className="p-4 border border-white/5 bg-white/5 rounded-xl">
                        <span className="text-[8px] text-white/40 uppercase font-black block mb-1">ASN_Signature</span>
                        <span className="text-[10px] font-mono text-white/80 leading-tight block">{analysisData.asn}</span>
                      </div>
                    </div>
                  )}
                </div>
              </SidePanel>

              <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-xl flex flex-col items-center pointer-events-none transition-all duration-700 ${!analysisData ? 'translate-y-20' : ''}`}>
                 <button
                  onClick={() => analysisData && setShowReport(true)}
                  className={`pointer-events-auto w-72 h-10 flex items-center justify-center gap-4 bg-primary/10 backdrop-blur-md border-t border-x border-primary/30 hover:bg-primary/20 hover:border-primary/60 transition-all duration-300 group rounded-t-2xl shadow-[0_-15px_40px_rgba(6,249,241,0.15)] ${!analysisData ? 'opacity-40 grayscale-[0.5] cursor-not-allowed' : 'opacity-100'}`}
                >
                  <ChevronUp className={`w-4 h-4 text-primary transition-transform duration-500 group-hover:-translate-y-1 ${analysisData ? 'animate-bounce' : ''}`} />
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary select-none">ACCESS_DETAILED_REPORT</span>
                </button>
              </div>
            </section>

            <div className="w-full h-screen pointer-events-auto">
              <ReportSection data={analysisData} sources={groundingSources} onBack={() => setShowReport(false)} />
            </div>
          </>
        ) : (
          <StudySection />
        )}

      </div>
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};

export default App;
