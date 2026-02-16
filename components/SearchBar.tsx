
import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

interface SearchBarProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onAnalyze, isLoading }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAnalyze(url.trim());
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="relative w-full group"
    >
      <div className="absolute -inset-1 bg-primary/20 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-40 transition duration-700"></div>
      <div className="relative flex items-center bg-black/40 border border-white/10 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 group-focus-within:border-primary/30">
        <div className="pl-6 text-primary/40">
          <Search className="w-5 h-5" />
        </div>
        <input 
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter target URL for neural analysis..."
          disabled={isLoading}
          className="w-full bg-transparent border-none py-6 px-6 text-white placeholder-slate-500 focus:ring-0 focus:outline-none text-lg font-light tracking-tight"
        />
        <button 
          type="submit"
          disabled={isLoading || !url.trim()}
          className="mr-3 px-8 py-3 bg-primary text-background-dark hover:bg-white disabled:opacity-30 disabled:grayscale text-xs uppercase font-black tracking-widest rounded-xl transition-all duration-300 flex items-center gap-2 active:scale-95 shadow-[0_0_20px_rgba(6,249,241,0.2)]"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            'Execute'
          )}
        </button>
      </div>
      
      {/* Quick Access Targets */}
      <div className="mt-4 flex gap-6 justify-center opacity-40 group-focus-within:opacity-70 transition-opacity">
        <button type="button" onClick={() => setUrl('https://google.com')} className="text-[9px] text-slate-400 hover:text-primary transition-colors uppercase tracking-[0.2em] font-black mono">google.com</button>
        <button type="button" onClick={() => setUrl('https://malicious-site.tk')} className="text-[9px] text-slate-400 hover:text-primary transition-colors uppercase tracking-[0.2em] font-black mono">malicious.net</button>
        <button type="button" onClick={() => setUrl('https://github.com')} className="text-[9px] text-slate-400 hover:text-primary transition-colors uppercase tracking-[0.2em] font-black mono">github.io</button>
      </div>
    </form>
  );
};
