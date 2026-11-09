import React, { useState } from 'react';
import { X, Copy, Check, Terminal, ExternalLink, ShieldCheck, Tag } from 'lucide-react';

interface GitHubGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  repoName: string;
  username: string;
  topics: string[];
  description: string;
}

export const GitHubGuideModal: React.FC<GitHubGuideModalProps> = ({
  isOpen,
  onClose,
  repoName,
  username,
  topics,
  description,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const cliQuickCommand = `gh repo create ${repoName} --public --description "${description}" --source=. --remote=origin --push`;

  const standardGitCommands = `# 1. Create a project directory and extract files
mkdir ${repoName} && cd ${repoName}
# (extract the downloaded .zip here)

# 2. Initialize git repository with main branch
git init -b main

# 3. Stage all files (including hidden .github/ workflows)
git add .

# 4. Create your initial architecture commit
git commit -m "feat: initial data engineering lakehouse pipeline"

# 5. Link to your GitHub remote
git remote add origin https://github.com/${username}/${repoName}.git

# 6. Push to GitHub
git push -u origin main`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-lg">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                How to Push Your Data Engineer Repository to GitHub
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Commands customized for <span className="font-mono text-indigo-600 dark:text-indigo-400 font-semibold">{username}/{repoName}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 text-xs">
          {/* Option 1: Fast GitHub CLI */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px]">1</span>
                Option A: Instant push with GitHub CLI (<code className="text-indigo-600 dark:text-indigo-400">gh</code>)
              </span>
              <button
                onClick={() => copyToClipboard(cliQuickCommand, 'gh')}
                className="flex items-center gap-1 px-2.5 py-1 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors font-medium"
              >
                {copiedKey === 'gh' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg font-mono text-[11px] text-slate-800 dark:text-slate-200 overflow-x-auto whitespace-pre-wrap">
              {cliQuickCommand}
            </pre>
          </div>

          {/* Option 2: Standard Git Terminal flow */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px]">2</span>
                Option B: Standard Git Commands (Terminal / Bash)
              </span>
              <button
                onClick={() => copyToClipboard(standardGitCommands, 'git')}
                className="flex items-center gap-1 px-2.5 py-1 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors font-medium"
              >
                {copiedKey === 'git' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy All</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg font-mono text-[11px] text-slate-800 dark:text-slate-200 overflow-x-auto leading-relaxed whitespace-pre-wrap">
              {standardGitCommands}
            </pre>
          </div>

          {/* Suggested Topics and Description */}
          <div className="p-4 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/50 rounded-lg space-y-3">
            <div className="flex items-center gap-2 text-indigo-900 dark:text-indigo-200 font-semibold">
              <Tag className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Recommended GitHub Topics (for Recruiter Discovery)</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-xs">
              Add these repository topics in GitHub (click the gear icon on your repo page) so hiring managers finding Data Engineering projects discover yours:
            </p>
            <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
              {topics.map((topic) => (
                <span
                  key={topic}
                  className="px-2.5 py-0.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <a
              href="https://github.com/new"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 hover:underline font-medium text-xs"
            >
              <span>Open GitHub.com to Create New Repo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
