import React from 'react';
import { PipelineStage } from '../types/repository';
import { ArrowRight, Code2, ShieldCheck, Database, Layers, Server } from 'lucide-react';

interface ArchitectureGraphProps {
  stages: PipelineStage[];
  selectedStageId: string;
  onSelectStage: (stage: PipelineStage) => void;
  onJumpToFile: (filePath: string) => void;
  metrics: {
    throughput: string;
    latency: string;
    sla: string;
    testCoverage: string;
  };
}

export const ArchitectureGraph: React.FC<ArchitectureGraphProps> = ({
  stages,
  selectedStageId,
  onSelectStage,
  onJumpToFile,
  metrics,
}) => {
  const currentStage = stages.find((s) => s.id === selectedStageId) || stages[0];

  const getStageIcon = (category: string) => {
    switch (category) {
      case 'source':
      case 'ingestion':
        return <Server className="w-4 h-4 text-indigo-500" />;
      case 'bronze':
        return <Database className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      case 'quality':
        return <ShieldCheck className="w-4 h-4 text-emerald-500" />;
      case 'silver':
        return <Layers className="w-4 h-4 text-slate-400" />;
      case 'gold':
      case 'serving':
        return <Database className="w-4 h-4 text-yellow-500" />;
      default:
        return <Database className="w-4 h-4 text-indigo-500" />;
    }
  };

  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
            03. Pipeline Architecture & Lineage DAG
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Click any pipeline node to inspect its execution semantics, data contracts, and source code.
          </p>
        </div>

        {/* Tabular Numerals KPI Strip adhering to 60-30-10 design */}
        <div className="flex items-center gap-4 text-xs font-mono tabular-nums text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800">
          <div>
            <span className="text-slate-400 dark:text-slate-500 text-[10px] block">THROUGHPUT</span>
            <span className="font-semibold text-slate-900 dark:text-slate-200">{metrics.throughput}</span>
          </div>
          <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">|</span>
          <div>
            <span className="text-slate-400 dark:text-slate-500 text-[10px] block">LATENCY</span>
            <span className="font-semibold text-slate-900 dark:text-slate-200">{metrics.latency}</span>
          </div>
          <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">|</span>
          <div>
            <span className="text-slate-400 dark:text-slate-500 text-[10px] block">AVAILABILITY SLA</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">{metrics.sla}</span>
          </div>
        </div>
      </div>

      {/* Horizontal Pipeline DAG Flow */}
      <div className="relative overflow-x-auto pb-2">
        <div className="flex items-center gap-3 min-w-[760px] py-2">
          {stages.map((stage, idx) => {
            const isSelected = selectedStageId === stage.id;
            return (
              <React.Fragment key={stage.id}>
                <button
                  onClick={() => onSelectStage(stage)}
                  className={`flex-1 text-left p-3.5 rounded-lg border transition-all duration-150 relative ${
                    isSelected
                      ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-600 dark:border-indigo-500 ring-1 ring-indigo-500 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      Stage {idx + 1}
                    </span>
                    {getStageIcon(stage.category)}
                  </div>
                  <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                    {stage.label}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-1">
                    {stage.category}
                  </p>
                </button>

                {idx < stages.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-700 shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Active Stage Deep-Dive Card */}
      {currentStage && (
        <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                {currentStage.label}
              </span>
              <span className="text-slate-300 dark:text-slate-700">·</span>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                {currentStage.category.toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
              {currentStage.description}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              {currentStage.filePath}
            </span>
            <button
              onClick={() => onJumpToFile(currentStage.filePath)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md transition-colors"
            >
              <Code2 className="w-3.5 h-3.5 text-indigo-500" />
              <span>Inspect Code</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
