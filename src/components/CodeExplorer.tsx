import React, { useState } from 'react';
import { RepoFile } from '../types/repository';
import {
  FileCode,
  FileText,
  FileJson,
  Settings,
  Copy,
  Check,
  Search,
  Download,
  FolderTree,
} from 'lucide-react';

interface CodeExplorerProps {
  files: RepoFile[];
  selectedFilePath: string;
  onSelectFile: (filePath: string) => void;
  username: string;
}

export const CodeExplorer: React.FC<CodeExplorerProps> = ({
  files,
  selectedFilePath,
  onSelectFile,
  username,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [hasCopied, setHasCopied] = useState(false);

  const filteredFiles = files.filter(
    (f) =>
      f.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeFile = files.find((f) => f.path === selectedFilePath) || files[0];

  const processedContent = activeFile
    ? activeFile.content.replace(/USERNAME/g, username)
    : '';

  const handleCopy = () => {
    if (!processedContent) return;
    navigator.clipboard.writeText(processedContent);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  const handleDownloadSingleFile = () => {
    if (!activeFile) return;
    const blob = new Blob([processedContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = activeFile.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getFileIcon = (lang: string, name: string) => {
    if (name.includes('docker')) return <Settings className="w-4 h-4 text-sky-500" />;
    switch (lang) {
      case 'python':
        return <FileCode className="w-4 h-4 text-amber-500" />;
      case 'sql':
        return <FileCode className="w-4 h-4 text-emerald-500" />;
      case 'yaml':
        return <Settings className="w-4 h-4 text-rose-500" />;
      case 'markdown':
        return <FileText className="w-4 h-4 text-blue-500" />;
      case 'json':
        return <FileJson className="w-4 h-4 text-yellow-500" />;
      default:
        return <FileCode className="w-4 h-4 text-slate-400" />;
    }
  };

  const codeLines = processedContent.split('\n');

  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
      <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <FolderTree className="w-5 h-5 text-indigo-500" />
            04. Repository File Tree & Source Code Inspector
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Browse and inspect production scripts, Airflow DAGs, dbt models, Docker configs, and CI/CD pipelines.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-md text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-44 sm:w-56"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[540px]">
        {/* Left File Tree Sidebar */}
        <div className="md:col-span-4 lg:col-span-3 border-r border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 p-3 overflow-y-auto max-h-[580px]">
          <div className="text-[11px] font-mono text-slate-400 dark:text-slate-500 px-2 py-1 uppercase tracking-wider mb-1">
            Repository Files ({filteredFiles.length})
          </div>
          <div className="space-y-0.5">
            {filteredFiles.map((file) => {
              const isSelected = activeFile?.path === file.path;
              return (
                <button
                  key={file.path}
                  onClick={() => onSelectFile(file.path)}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-left text-xs font-mono transition-colors ${
                    isSelected
                      ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {getFileIcon(file.language, file.name)}
                  <span className="truncate">{file.path}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Code Viewer Area */}
        <div className="md:col-span-8 lg:col-span-9 flex flex-col bg-white dark:bg-slate-950">
          {activeFile ? (
            <>
              {/* File Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 py-2.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {activeFile.path}
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">·</span>
                  <span className="text-slate-400 dark:text-slate-500 tabular-nums">
                    {codeLines.length} lines
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">·</span>
                  <span className="text-slate-400 dark:text-slate-500 uppercase">
                    {activeFile.language}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDownloadSingleFile}
                    className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded transition-colors"
                    title="Download this single file"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>

                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded transition-colors"
                  >
                    {hasCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                          Copied!
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Description banner */}
              <div className="px-4 py-1.5 bg-slate-100/50 dark:bg-slate-900/30 text-[11px] text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800/80">
                {activeFile.description}
              </div>

              {/* Code Lines Display */}
              <div className="flex-1 overflow-auto p-4 font-mono text-xs max-h-[500px] leading-relaxed selection:bg-indigo-500/20">
                <table className="w-full border-collapse">
                  <tbody>
                    {codeLines.map((line, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                        <td className="w-10 text-right pr-4 text-slate-300 dark:text-slate-600 select-none text-[11px] tabular-nums align-top">
                          {idx + 1}
                        </td>
                        <td className="text-slate-800 dark:text-slate-200 whitespace-pre font-mono">
                          {line}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8 text-xs text-slate-400">
              Select a file to inspect source code.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
