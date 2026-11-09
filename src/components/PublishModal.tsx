import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  Terminal,
  ExternalLink,
  Download,
  FolderGit2,
  FileText,
  Sparkles,
} from 'lucide-react';

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'es' | 'en';
  readmeContent: string;
  onDownloadProjectZip: () => void;
}

export const PublishModal: React.FC<PublishModalProps> = ({
  isOpen,
  onClose,
  lang,
  readmeContent,
  onDownloadProjectZip,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const cloneAndPushCommands = `# 1. Clone your GitHub repository
git clone https://github.com/inelsonv/Portafolio.git
cd Portafolio

# 2. Extract the downloaded project files into this folder
# (unzip Portafolio-Project.zip into here)

# 3. Stage all files, commit and push to main
git add .
git commit -m "feat: publish data engineering portfolio website"
git push origin main`;

  const pushExistingCommands = `# If you already have your project files locally:
git init -b main
git add .
git commit -m "feat: initial data engineering portfolio"
git remote add origin https://github.com/inelsonv/Portafolio.git
git push -u origin main --force`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-xl">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base sm:text-lg">
                {lang === 'es'
                  ? 'Publicar en inelsonv/Portafolio'
                  : 'Publish to inelsonv/Portafolio'}
              </h3>
              <a
                href="https://github.com/inelsonv/Portafolio"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 mt-0.5"
              >
                <span>github.com/inelsonv/Portafolio</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 text-xs">
          {/* Quick Action: Download Project Zip */}
          <div className="p-4 bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/60 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="font-semibold text-indigo-950 dark:text-indigo-200 text-sm flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                {lang === 'es' ? 'Descargar Proyecto Completo' : 'Download Full Project ZIP'}
              </h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs">
                {lang === 'es'
                  ? 'Incluye todos los archivos listos: web, README.md y flujo de despliegue automático a GitHub Pages.'
                  : 'Includes all ready-to-run files: web app, README.md, and automatic GitHub Pages deployment workflow.'}
              </p>
            </div>

            <button
              onClick={onDownloadProjectZip}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors shadow-xs whitespace-nowrap shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>{lang === 'es' ? 'Descargar .ZIP' : 'Download .ZIP'}</span>
            </button>
          </div>

          {/* Option A: Git Clone & Push */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px]">1</span>
                {lang === 'es' ? 'Opción A: Clonar y Subir (Recomendado)' : 'Option A: Clone & Push (Recommended)'}
              </span>

              <button
                onClick={() => copyToClipboard(cloneAndPushCommands, 'clone')}
                className="flex items-center gap-1 px-2.5 py-1 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors font-medium"
              >
                {copiedKey === 'clone' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">
                      {lang === 'es' ? '¡Copiado!' : 'Copied!'}
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{lang === 'es' ? 'Copiar Comandos' : 'Copy Commands'}</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg font-mono text-[11px] text-slate-800 dark:text-slate-200 overflow-x-auto leading-relaxed whitespace-pre-wrap">
              {cloneAndPushCommands}
            </pre>
          </div>

          {/* Option B: Direct Git Remote Push */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px]">2</span>
                {lang === 'es' ? 'Opción B: Subir desde una carpeta local existente' : 'Option B: Push from Existing Local Folder'}
              </span>

              <button
                onClick={() => copyToClipboard(pushExistingCommands, 'push')}
                className="flex items-center gap-1 px-2.5 py-1 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors font-medium"
              >
                {copiedKey === 'push' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">
                      {lang === 'es' ? '¡Copiado!' : 'Copied!'}
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{lang === 'es' ? 'Copiar Comandos' : 'Copy Commands'}</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg font-mono text-[11px] text-slate-800 dark:text-slate-200 overflow-x-auto leading-relaxed whitespace-pre-wrap">
              {pushExistingCommands}
            </pre>
          </div>

          {/* Option C: Direct Web README Edit */}
          <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
            <span className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-indigo-500" />
              {lang === 'es' ? 'Opción C: Solo actualizar el README.md en la web de GitHub' : 'Option C: Just Update README.md on GitHub Web'}
            </span>
            <p className="text-slate-600 dark:text-slate-400 text-xs">
              {lang === 'es'
                ? 'Si solo deseas publicar la presentación en la página de tu repositorio:'
                : 'If you only want to showcase the Data Engineer presentation on your repository homepage:'}
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                onClick={() => copyToClipboard(readmeContent, 'readme')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-xs font-medium text-slate-800 dark:text-slate-200 transition-colors"
              >
                {copiedKey === 'readme' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{lang === 'es' ? '¡README Copiado!' : 'README Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{lang === 'es' ? 'Copiar README.md' : 'Copy README.md'}</span>
                  </>
                )}
              </button>

              <a
                href="https://github.com/inelsonv/Portafolio"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 text-indigo-600 dark:text-indigo-400 hover:underline text-xs font-medium"
              >
                <span>{lang === 'es' ? 'Abrir GitHub inelsonv/Portafolio' : 'Open GitHub inelsonv/Portafolio'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
          <span className="text-[11px] text-slate-400 dark:text-slate-500">
            Target: inelsonv/Portafolio
          </span>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            {lang === 'es' ? 'Entendido' : 'Got it'}
          </button>
        </div>
      </div>
    </div>
  );
};
