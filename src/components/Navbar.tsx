import React from 'react';
import { Download, Github, Sun, Moon, Sparkles, Terminal } from 'lucide-react';

interface NavbarProps {
  onExportZip: () => void;
  onOpenGithubGuide: () => void;
  onOpenAiCustomizer: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDark: boolean;
  setIsDark: (val: boolean) => void;
  repoName: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onExportZip,
  onOpenGithubGuide,
  onOpenAiCustomizer,
  activeTab,
  setActiveTab,
  isDark,
  setIsDark,
  repoName,
}) => {
  const navItems = [
    { id: 'templates', label: 'Archetypes' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'code', label: 'Code Explorer' },
    { id: 'simulator', label: 'Live Simulator' },
    { id: 'git-cli', label: 'GitHub Setup' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/"
            className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 whitespace-nowrap"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-mono font-semibold text-sm shadow-sm">
              DF
            </div>
            <span>DataForge</span>
          </a>
          <span className="hidden sm:inline text-xs text-slate-400 dark:text-slate-500 font-mono">
            / {repoName}
          </span>
        </div>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`whitespace-nowrap transition-colors py-1 ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400 font-semibold border-b-2 border-indigo-600 dark:border-indigo-400'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions (AI customizer, CLI guide, Theme toggle, and Primary Export CTA) */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenAiCustomizer}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-md transition-colors"
            title="Customize with Gemini AI"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>AI Tailor</span>
          </button>

          <button
            onClick={onOpenGithubGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-md transition-colors"
            title="GitHub Push Commands"
          >
            <Terminal className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span className="hidden sm:inline">Git Commands</span>
          </button>

          <button
            onClick={() => setIsDark(!isDark)}
            className="p-1.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 rounded-md transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={onExportZip}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors shadow-sm whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Repo (.zip)</span>
          </button>
        </div>

      </div>
    </header>
  );
};
