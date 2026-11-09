import React from 'react';
import { RepositoryTemplate, ArchetypeId } from '../types/repository';
import { Database, Activity, Layers, UserCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

interface TemplateSelectorProps {
  templates: RepositoryTemplate[];
  selectedTemplateId: ArchetypeId;
  onSelectTemplate: (id: ArchetypeId) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  templates,
  selectedTemplateId,
  onSelectTemplate,
}) => {
  const getIcon = (id: ArchetypeId) => {
    switch (id) {
      case 'streaming-lakehouse':
        return <Activity className="w-5 h-5 text-indigo-500" />;
      case 'modern-data-stack':
        return <Database className="w-5 h-5 text-amber-500" />;
      case 'cloud-medallion':
        return <Layers className="w-5 h-5 text-emerald-500" />;
      case 'profile-portfolio':
        return <UserCheck className="w-5 h-5 text-sky-500" />;
    }
  };

  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            01. Choose Repository Archetype
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Select a verified production architecture pattern to scaffold for your GitHub repository.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {templates.map((tpl) => {
          const isSelected = selectedTemplateId === tpl.id;
          return (
            <div
              key={tpl.id}
              onClick={() => onSelectTemplate(tpl.id)}
              className={`group relative flex flex-col justify-between p-5 rounded-xl cursor-pointer transition-all duration-150 border ${
                isSelected
                  ? 'bg-white dark:bg-slate-900 border-indigo-600 dark:border-indigo-500 ring-2 ring-indigo-600/10 dark:ring-indigo-500/20 shadow-sm'
                  : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                    {getIcon(tpl.id)}
                  </div>
                  {isSelected ? (
                    <span className="flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400">
                      <CheckCircle2 className="w-4 h-4" /> Active
                    </span>
                  ) : (
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                      {tpl.difficulty}
                    </span>
                  )}
                </div>

                <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-base leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {tpl.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                  {tpl.summary}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                {/* Zero-pill metadata list */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono">
                  <span>{tpl.techStack.engine}</span>
                  <span aria-hidden="true">·</span>
                  <span>{tpl.techStack.orchestrator}</span>
                  <span aria-hidden="true">·</span>
                  <span>{tpl.techStack.storage}</span>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-400 dark:text-slate-500 tabular-nums">
                    {tpl.files.length} production files
                  </span>
                  <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-medium group-hover:translate-x-0.5 transition-transform">
                    {isSelected ? 'Configured' : 'Select'} <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
