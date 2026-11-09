import React, { useState } from 'react';
import { SimulationRecord } from '../types/repository';
import { SAMPLE_SIMULATION_RECORDS } from '../data/simulationData';
import {
  Play,
  RotateCcw,
  ShieldCheck,
  AlertTriangle,
  XCircle,
  Database,
  ArrowRight,
  Cpu,
} from 'lucide-react';

export const PipelineSimulator: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'raw' | 'contracts' | 'silver' | 'gold'>('contracts');
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const activeRecord: SimulationRecord = SAMPLE_SIMULATION_RECORDS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SAMPLE_SIMULATION_RECORDS.length);
  };

  const handleReset = () => {
    setCurrentIndex(0);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  React.useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SAMPLE_SIMULATION_RECORDS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-500" />
            05. Live Pipeline Simulator & Contract Enforcement
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Simulate real-time streaming events, data contract validation failures (DLQ routing), and watermark deduplication.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleAutoPlay}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              isAutoPlaying
                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-700'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>{isAutoPlaying ? 'Pause Stream' : 'Auto-Stream'}</span>
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors shadow-xs"
          >
            <span>Next Event</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleReset}
            className="p-1.5 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Reset Simulator"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Simulator Event Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {SAMPLE_SIMULATION_RECORDS.map((rec, idx) => {
          const isSelected = currentIndex === idx;
          const hasFailure = rec.qualityChecks.some((q) => q.status === 'failed');
          const hasWarning = rec.qualityChecks.some((q) => q.status === 'warning');

          return (
            <button
              key={rec.id + idx}
              onClick={() => setCurrentIndex(idx)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono transition-all border ${
                isSelected
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <span>{rec.id}</span>
              {hasFailure ? (
                <XCircle className="w-3.5 h-3.5 text-rose-500" />
              ) : hasWarning ? (
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              ) : (
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              )}
            </button>
          );
        })}
      </div>

      {/* Stage Inspection Tabs */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden bg-slate-50/50 dark:bg-slate-950/40">
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('raw')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === 'raw'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            1. Raw Ingestion (Kafka JSON)
          </button>
          <button
            onClick={() => setActiveTab('contracts')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === 'contracts'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            2. Data Contract Suite (Great Expectations)
          </button>
          <button
            onClick={() => setActiveTab('silver')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === 'silver'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            3. Silver Cleansed Record
          </button>
          <button
            onClick={() => setActiveTab('gold')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === 'gold'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            4. Gold Mart Aggregates
          </button>
        </div>

        <div className="p-4">
          {activeTab === 'raw' && (
            <div className="space-y-2">
              <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Payload received from topic <code className="text-indigo-600 dark:text-indigo-400">payments.raw.v1</code>
              </div>
              <pre className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md font-mono text-xs text-slate-800 dark:text-slate-200 overflow-x-auto">
                {JSON.stringify(activeRecord.rawPayload, null, 2)}
              </pre>
            </div>
          )}

          {activeTab === 'contracts' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                  Contract Expectations Run
                </span>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 tabular-nums">
                  {activeRecord.qualityChecks.filter((c) => c.status === 'passed').length}/
                  {activeRecord.qualityChecks.length} Passed
                </span>
              </div>

              <div className="space-y-2">
                {activeRecord.qualityChecks.map((check, idx) => (
                  <div
                    key={idx}
                    className="flex items-start justify-between gap-3 p-2.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono"
                  >
                    <div className="flex items-center gap-2">
                      {check.status === 'passed' && (
                        <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                      )}
                      {check.status === 'warning' && (
                        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                      )}
                      {check.status === 'failed' && (
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                      )}
                      <div>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {check.rule}
                        </span>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          {check.detail}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded ${
                        check.status === 'passed'
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                          : check.status === 'warning'
                          ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
                          : 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400'
                      }`}
                    >
                      {check.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'silver' && (
            <div className="space-y-2">
              <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Iceberg Silver Table Partition: <code className="text-emerald-600 dark:text-emerald-400">{activeRecord.cleansedPayload.iceberg_partition}</code>
              </div>
              <pre className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md font-mono text-xs text-slate-800 dark:text-slate-200 overflow-x-auto">
                {JSON.stringify(activeRecord.cleansedPayload, null, 2)}
              </pre>
            </div>
          )}

          {activeTab === 'gold' && (
            <div className="space-y-2">
              <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Aggregated Dimensional Rollup (5-Minute Window Mart)
              </div>
              <pre className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md font-mono text-xs text-slate-800 dark:text-slate-200 overflow-x-auto">
                {JSON.stringify(activeRecord.goldAggregates, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
