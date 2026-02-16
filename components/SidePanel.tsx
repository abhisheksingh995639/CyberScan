
import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface SidePanelProps {
  side: 'left' | 'right';
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: (open: boolean) => void;
}

export const SidePanel: React.FC<SidePanelProps> = ({ side, title, icon, children, isOpen, onToggle }) => {
  const isLeft = side === 'left';

  return (
    <div 
      className={`fixed top-1/2 -translate-y-1/2 z-50 transition-all duration-500 ease-out flex items-center pointer-events-none
        ${isLeft ? (isOpen ? 'left-0' : '-left-[320px]') : (isOpen ? 'right-0' : '-right-[320px]')}
        ${!isLeft && 'flex-row-reverse'}
      `}
    >
      <div className={`
        w-[320px] h-[480px] pointer-events-auto
        bg-black/80 backdrop-blur-3xl border-y border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]
        ${isLeft ? 'border-r rounded-r-[2rem] border-primary/20' : 'border-l rounded-l-[2rem] border-primary/20'}
        flex flex-col overflow-hidden relative
      `}>
        <div className={`absolute top-0 ${isLeft ? 'right-0' : 'left-0'} w-4 h-4 border-t-2 border-primary/40 ${isLeft ? 'border-r-2' : 'border-l-2'} rounded-bl-sm pointer-events-none`} />
        <div className={`absolute bottom-0 ${isLeft ? 'right-0' : 'left-0'} w-4 h-4 border-b-2 border-primary/40 ${isLeft ? 'border-r-2' : 'border-l-2'} rounded-tl-sm pointer-events-none`} />

        <div className="py-3 px-6 border-b border-white/5 flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-4">
            <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/20">
              <span className="text-primary scale-90 block">{icon}</span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/90 font-mono">{title}</span>
          </div>
          <button 
            onClick={() => onToggle(false)}
            className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all"
          >
            {isLeft ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {children}
        </div>
        
        <div className="px-6 py-3 border-t border-white/5 bg-black/40 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[9px] font-mono text-primary/60 uppercase tracking-widest font-bold">Encrypted_Uplink</span>
          </div>
          <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.2em]">Node_A109</span>
        </div>
      </div>

      <button
        onClick={() => onToggle(!isOpen)}
        className={`
          pointer-events-auto h-40 w-10 flex flex-col items-center
          bg-primary/5 backdrop-blur-xl border border-primary/30
          hover:bg-primary/20 hover:border-primary/60 transition-all duration-500 group relative
          ${isLeft ? 'rounded-r-2xl border-l-0' : 'rounded-l-2xl border-r-0'}
          shadow-[0_0_20px_rgba(6,249,241,0.1)]
        `}
      >
        <div className={`absolute top-0 ${isLeft ? 'left-0' : 'right-0'} w-[2px] h-full bg-primary/30 group-hover:bg-primary transition-colors`} />

        {/* Separated icon area */}
        <div className={`h-12 flex items-center justify-center transition-all duration-500 ${isOpen ? 'rotate-180 scale-110' : ''}`}>
           {isLeft ? (
             <ChevronRight className={`w-4 h-4 text-primary ${!isOpen && 'animate-pulse'}`} />
           ) : (
             <ChevronLeft className={`w-4 h-4 text-primary ${!isOpen && 'animate-pulse'}`} />
           )}
        </div>
        
        {/* Separated text area with centered content */}
        <div className="flex-1 flex items-center justify-center w-full pb-4">
          <span className={`
            whitespace-nowrap text-[9px] font-black uppercase tracking-[0.6em] text-primary/60 group-hover:text-primary transition-colors pointer-events-none font-mono
            ${isLeft ? '-rotate-90' : 'rotate-90'}
          `}>
            {isOpen ? 'CLOSE' : title.split('_')[0]}
          </span>
        </div>

        <div className={`absolute bottom-2 ${isLeft ? 'right-2' : 'left-2'} w-1 h-1 bg-primary/20 rounded-full group-hover:bg-primary/50 transition-colors`} />
      </button>
    </div>
  );
};
